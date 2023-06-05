<template>
	<div
		class="cdx-select-vue"
		:class="rootClasses"
		:aria-disabled="disabled"
	>
		<div
			ref="handle"
			class="cdx-select-vue__handle"
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
					@binding {MenuItemData|undefined} selected-menu-item The currently selected menu
					item
					@binding {string} default-label The default label, provided via a prop
				-->
				<slot
					name="label"
					:selected-menu-item="selectedMenuItem"
					:default-label="defaultLabel"
				>
					{{ currentLabel }}
				</slot>
			</span>
			<cdx-icon
				v-if="startIcon"
				:icon="startIcon"
				class="cdx-select-vue__start-icon"
			/>
			<cdx-icon
				:icon="cdxIconExpand"
				class="cdx-select-vue__indicator"
			/>
		</div>

		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="modelWrapper"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			v-bind="menuConfig"
			@load-more="$emit( 'load-more' )"
		>
			<template #default="{ menuItem }">
				<!--
					@slot Display of an individual item in the menu
					@binding {MenuItemData} menu-item The current menu item
				-->
				<slot name="menu-item" :menu-item="menuItem" />
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
import useResizeObserver from '../../composables/useResizeObserver';

import { MenuItemData, MenuConfig, ValidationStatusType } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * An input with a dropdown menu of predefined selectable items.
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
		},

		/**
		 * `status` attribute of the input.
		 *
		 * @values 'default', 'error'
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		}
	},

	emits: [
		/**
		 * When the selection value changes.
		 *
		 * @property {string | number | null} modelValue The new model value
		 */
		'update:selected',
		/**
		 * When the user scrolls towards the bottom of the menu.
		 *
		 * If it is possible to add or load more menu items, then now would be a good moment
		 * so that the user can experience infinite scrolling.
		 */
		'load-more'
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

		const currentDimensions = useResizeObserver( handle );
		const currentWidthInPx = computed( () => `${currentDimensions.value.width ?? 0}px` );

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
				'cdx-select-vue--enabled': !props.disabled,
				'cdx-select-vue--disabled': props.disabled,
				'cdx-select-vue--expanded': expanded.value,
				'cdx-select-vue--value-selected': !!selectedMenuItem.value,
				'cdx-select-vue--no-selections': !selectedMenuItem.value,
				'cdx-select-vue--has-start-icon': !!startIcon.value,
				[ `cdx-select-vue--status-${props.status}` ]: true
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
			currentWidthInPx,
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
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/icon-alignment.less';
@import ( reference ) '../../themes/mixins/element-with-menu-expanded.less';
@import ( reference ) '../../themes/mixins/select.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

// CSS-only and Vue implementations are too divergent to combine, so they are included separately.
// This is the CSS-only version, which is a `<select>` element.
.cdx-select {
	.cdx-select__handle();
	.cdx-mixin-css-icon-background( @size-icon-x-small, center right @spacing-75 );
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	appearance: none;

	&:disabled {
		.cdx-select__handle--disabled();
		.cdx-mixin-css-icon-background-image( @cdx-icon-expand, @color-disabled );

		// Support: Chrome, which sets an opacity less than 1 for disabled select elements.
		opacity: @opacity-base;
	}

	&:enabled {
		.cdx-select__handle--enabled();
		.cdx-mixin-css-icon-background-image( @cdx-icon-expand );
	}
}

// This is the Vue implementation.
.cdx-select-vue {
	display: inline-block;
	position: relative;

	&__handle {
		.cdx-select__handle();
		position: relative;
		width: @size-full;
	}

	&--has-start-icon .cdx-select-vue__handle {
		.cdx-mixin-icon-wrapper-padding( start );
	}

	&__start-icon {
		.cdx-mixin-icon( start );
	}

	&__indicator {
		color: @color-base;
		.cdx-mixin-icon(
			end,
			@min-size-icon-x-small,
			@size-icon-x-small,
			@spacing-75
		);
	}

	&--enabled {
		.cdx-select-vue__handle {
			.cdx-select__handle--enabled();
			.cdx-mixin-element-with-menu-expanded();

			&:hover {
				.cdx-select-vue__indicator {
					color: @color-base--hover;
				}
			}
		}

		/* Expanded Menu only happens when enabled. */
		&.cdx-select-vue--expanded {
			.cdx-select-vue__handle {
				background-color: @background-color-base;

				/* stylelint-disable-next-line max-nesting-depth */
				.cdx-select-vue__indicator {
					color: @color-base;
				}
			}
		}
	}

	/* stylelint-disable no-descending-specificity */
	&--disabled {
		.cdx-select-vue__handle {
			.cdx-select__handle--disabled();
			// Don't implement coined effect on text-shadow from OOUI.
			// This has never gone through design review and was a hack to increase
			// color contrast.
			// text-shadow: @text-shadow-base--disabled;
			cursor: @cursor-base--disabled;
		}

		.cdx-select-vue__indicator,
		.cdx-select-vue__start-icon {
			color: @color-disabled;
		}
	}
	/* stylelint-enable no-descending-specificity */

	&--status-error&--enabled {
		.cdx-select-vue__handle {
			border-color: @border-color-destructive;

			&:focus {
				border-color: @border-color-progressive--focus;
			}
		}
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		position: static;

		.cdx-menu {
			left: auto;
			/* stylelint-disable-next-line value-keyword-case */
			width: v-bind( currentWidthInPx );
		}
	}
}
</style>
