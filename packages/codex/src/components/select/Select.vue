<template>
	<div
		class="cdx-select"
		:class="rootClasses"
		:aria-disabled="disabled"
	>
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
			<cdx-icon
				v-if="startIcon"
				:icon="startIcon"
				class="cdx-select__start-icon"
			/>
			<cdx-icon
				:icon="cdxIconExpand"
				class="cdx-select__indicator"
			/>
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
import { Icon, cdxIconExpand } from '@wikimedia/codex-icons';

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
		 * Must be bound with `v-model:selected`.
		 *
		 * The property should be initialized to `null` rather than using a falsy value.
		 */
		selected: {
			type: [ String, Number, null ] as PropType<string|number|null>,
			required: true
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
		},

		/**
		 * An icon at the start of the select element
		 * displayed when no selection has been made.
		 */
		defaultIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		}
	},

	emits: [
		/**
		 * When the selection value changes.
		 *
		 * @property {string | number | null} modelValue The new model value
		 */
		'update:selected'
	],

	setup( props, { emit } ) {
		// Set up basic reactive values and template refs.
		const handle = ref<HTMLDivElement>();
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const handleId = useGeneratedId( 'select-handle' );
		const menuId = useGeneratedId( 'select-menu' );
		const expanded = ref( false );

		// The value of the component's current selection is tracked in the parent as a v-model
		// binding.
		const modelWrapper = useModelWrapper( toRef( props, 'selected' ), emit, 'update:selected' );

		const selectedMenuItem = computed( () =>
			props.menuItems.find( ( menuItem ) => menuItem.value === props.selected )
		);

		// Set up the label that should display in the handle.
		const currentLabel = computed( () => {
			return selectedMenuItem.value ?
				selectedMenuItem.value.label || selectedMenuItem.value.value :
				props.defaultLabel;
		} );

		const startIcon = computed( () => {
			if ( props.defaultIcon && !selectedMenuItem.value ) {
				return props.defaultIcon;
			// The selected item includes an icon
			} else if ( selectedMenuItem.value && selectedMenuItem.value.icon ) {
				return selectedMenuItem.value.icon;
			}
			// Explicit return is needed to satisfy vue/return-in-computed-property
			return undefined;
		} );

		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-select--enabled': !props.disabled,
				'cdx-select--disabled': props.disabled,
				'cdx-select--expanded': expanded.value,
				'cdx-select--value-selected': !!selectedMenuItem.value,
				'cdx-select--no-selections': !selectedMenuItem.value,
				'cdx-select--has-start-icon': !!startIcon.value
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
			onKeydown,
			startIcon,
			cdxIconExpand
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import './../../themes/mixins/icon-alignment.less';
@import './../../themes/mixins/element-with-menu-expanded.less';

@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@min-width-select: 280px;
@line-height-component: unit( ( 20 / @font-size-browser / @font-size-base ), em );

.cdx-select {
	display: inline-block;
	position: relative;
	min-width: @min-width-select;

	&__handle {
		position: relative;
		box-sizing: @box-sizing-base;
		min-height: @size-base;
		width: @size-full;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-radius: @border-radius-base;
		padding-top: @padding-vertical-base;
		padding-bottom: @padding-vertical-base;
		padding-left: @padding-horizontal-base;
		.cdx-mixin-icon-padding( end, @padding-horizontal-input-text );
		line-height: @line-height-component;
	}

	&__start-icon {
		.cdx-mixin-icon( start );
	}

	&--has-start-icon {
		.cdx-select__handle {
			.cdx-mixin-icon-padding( start );
		}
	}

	&__indicator {
		color: @color-base;
		.cdx-mixin-icon( end, @size-indicator, @padding-horizontal-input-text );
	}

	&--enabled {
		.cdx-select__handle {
			background-color: @background-color-framed;
			color: @color-base;
			border-color: @border-color-base;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-base;
			.element-with-menu-expanded();

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

		/* Expanded Menu only happens when enabled. */
		&.cdx-select--expanded {
			.cdx-select__handle {
				background-color: @background-color-framed--hover;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-select__indicator {
					color: @color-base;
				}
			}
		}
	}

	/* stylelint-disable no-descending-specificity */
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
		}

		.cdx-select__indicator,
		.cdx-select__start-icon {
			color: @color-base--disabled;
		}
	}
	/* stylelint-enable no-descending-specificity */
}

</style>
