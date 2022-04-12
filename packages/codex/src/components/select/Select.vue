<template>
	<div class="cdx-select" :class="rootClasses">
		<div
			ref="handle"
			class="cdx-select__handle"
			tabindex="0"
			role="combobox"
			aria-autocomplete="list"
			:aria-owns="menuId"
			:aria-labelledby="handleId"
			:aria-activedescendant="highlightedId"
			aria-haspopup="listbox"
			:aria-expanded="expanded"
			:aria-disabled="disabled"
			@click="onClick"
			@blur="onBlur"
			@keydown="onKeydown"
		>
			<span
				:id="handleId"
				role="textbox"
				aria-readonly="true"
			>
				<!--
					@slot Display of the current selection or default label
					@binding {MenuItemData|undefined} selectedMenuItem The currently selected menu
					item
					@binding {string} defaultLabel The default label, provided via a prop
				-->
				<slot
					name="label"
					:selectedMenuItem="selectedMenuItem"
					:defaultLabel="defaultLabel"
				>
					{{ currentLabel }}
				</slot>
			</span>
			<cdx-icon :icon="cdxIconExpand" class="cdx-select__indicator" />
		</div>

		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="modelWrapper"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			v-bind="menuConfig"
		>
			<template #default="{ menuItem }">
				<!--
					@slot Display of an individual item in the menu
					@binding {MenuItemData} menuItem The current menu item
				-->
				<slot name="menu-item" :menuItem="menuItem" />
			</template>
		</cdx-menu>
	</div>
</template>

<script lang="ts">
import {
	PropType,
	defineComponent,
	computed,
	ref,
	toRef
} from 'vue';
import { cdxIconExpand } from '@wikimedia/codex-icons';

import CdxIcon from '../icon/Icon.vue';
import CdxMenu from '../menu/Menu.vue';
import useGeneratedId from '../../composables/useGeneratedId';
import useModelWrapper from '../../composables/useModelWrapper';
import { MenuItemData, MenuConfig } from '../../types';

/**
 * A dropdown menu similar to the HTML `<select>` element.
 *
 * Menu items are provided as an array of MenuItemData types, and `v-model` is used
 * to bind the current selection's value.
 */
export default defineComponent( {
	name: 'CdxSelect',
	components: {
		CdxIcon,
		CdxMenu
	},

	props: {
		/**
		 * Menu items. See the MenuItemData type.
		 */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			required: true
		},

		/**
		 * Value of the current selection.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ String, Number, null ] as PropType<string|number|null>,
			default: null
		},
		/**
		 * Label to display when no selection has been made.
		 */
		defaultLabel: {
			type: String,
			default: ''
		},

		/**
		 * Whether the dropdown is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},

		/**
		 * Configuration for various menu features. All properties default to false.
		 *
		 * See the MenuConfig type.
		 */
		menuConfig: {
			type: Object as PropType<MenuConfig>,
			default: () => {
				return {} as MenuConfig;
			}
		}
	},

	emits: [
		/**
		 * When the selection value changes.
		 *
		 * @property {string | number} modelValue The new model value
		 */
		'update:modelValue'
	],

	setup( props, context ) {
		// Set up basic reactive values and template refs.
		const handle = ref<HTMLDivElement>();
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const handleId = useGeneratedId( 'select-handle' );
		const menuId = useGeneratedId( 'select-menu' );
		const expanded = ref( false );

		// The value of the component's current selection is tracked in the parent as a v-model
		// binding.
		const modelWrapper = useModelWrapper( toRef( props, 'modelValue' ), context.emit );

		const selectedMenuItem = computed( () =>
			props.menuItems.find( ( menuItem ) => menuItem.value === props.modelValue )
		);

		// Set up the label that should display in the handle.
		const currentLabel = computed( () => {
			return selectedMenuItem.value ?
				selectedMenuItem.value.label || selectedMenuItem.value.value :
				props.defaultLabel;
		} );

		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-select--disabled': props.disabled,
				'cdx-select--expanded': expanded.value,
				'cdx-select--value-selected': modelWrapper.value !== null,
				'cdx-select--no-selections': modelWrapper.value === null
			};
		} );

		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		function onBlur(): void {
			expanded.value = false;
		}

		function onClick(): void {
			if ( props.disabled ) {
				return;
			}

			expanded.value = !expanded.value;
			handle.value?.focus();
		}

		function onKeydown( e: KeyboardEvent ) {
			if ( props.disabled ) {
				return;
			}
			menu.value?.delegateKeyNavigation( e );
		}

		return {
			handle,
			handleId,
			menu,
			menuId,
			modelWrapper,
			selectedMenuItem,
			highlightedId,
			expanded,
			onBlur,
			currentLabel,
			rootClasses,
			onClick,
			cdxIconExpand,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import './../../themes/mixins/menu-icon.less';

@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@min-width-select: 280px;
@line-height-component: unit( ( 20 / @font-size-browser / @font-size-base ), em );

.cdx-select {
	display: inline-block;
	position: relative;
	min-width: @min-width-select;

	&__handle {
		background-color: @background-color-framed;
		color: @color-base;
		position: relative;
		box-sizing: @box-sizing-base;
		min-height: @size-base;
		width: @size-full;
		border: @border-base;
		border-radius: @border-radius-base;
		// Add extra padding-right to make space for the handle indicator
		// Use 2 * horizontal-base because we need padding on both sides of the indicator
		padding: @padding-vertical-base
			calc( 2 * @padding-horizontal-base ~'+' @size-indicator )
			@padding-vertical-base
			@padding-horizontal-base;
		line-height: @line-height-component;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-base;

		&--has-icon {
			padding-left: ( @padding-horizontal-base * 2 ) + @size-icon;
		}

		&:hover {
			background-color: @background-color-framed--hover;
			color: @color-base--hover;
			border-color: @border-color-base--hover;
			cursor: @cursor-base--hover;

			.cdx-select__indicator {
				color: @color-base--hover;
			}
		}

		&:focus {
			border-color: @color-primary--focus;
			box-shadow: @box-shadow-primary--focus;
			outline: 0;
		}

		&:active {
			color: @color-base--active;
			border-color: @border-color-base--active;
		}
	}

	// stylelint-disable-next-line no-descending-specificity
	&__indicator {
		color: @color-base;
		.cdx-mixin-menu-icon( right, @size-indicator );
	}

	&--expanded {
		.cdx-select__handle {
			background-color: @background-color-framed--hover;

			&:hover .cdx-select__indicator {
				color: @color-base;
			}
		}
	}

	&--disabled {
		.cdx-select__handle {
			background-color: @background-color-base--disabled;
			color: @color-base--disabled;
			border-color: @border-color-base--disabled;
			// Don't implement coined effect on text-shadow from OOUI.
			// This has never gone through design review and was a hack to increase
			// color contrast.
			// text-shadow: @text-shadow-base--disabled;
			cursor: @cursor-base--disabled;

			&:hover .cdx-select__indicator {
				color: @color-base--disabled;
			}
		}

		// stylelint-disable-next-line no-descending-specificity
		.cdx-select__indicator {
			color: @color-base--disabled;
		}
	}
}
</style>
