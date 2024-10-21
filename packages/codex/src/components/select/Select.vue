<template>
	<div
		class="cdx-select-vue"
		:class="rootClasses"
		:style="rootStyle"
		:aria-disabled="computedDisabled"
	>
		<div
			:id="computedHandleId"
			ref="handle"
			class="cdx-select-vue__handle"
			v-bind="otherAttrsMinusId"
			tabindex="0"
			role="combobox"
			:aria-controls="menuId"
			:aria-activedescendant="highlightedId"
			:aria-expanded="expanded"
			:aria-describedby="descriptionId"
			@click="onClick"
			@blur="onBlur"
			@keydown="onKeydown"
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
	toRef,
	inject
} from 'vue';
import { Icon, cdxIconExpand } from '@wikimedia/codex-icons';

import CdxIcon from '../icon/Icon.vue';
import CdxMenu from '../menu/Menu.vue';

import useGeneratedId from '../../composables/useGeneratedId';
import useModelWrapper from '../../composables/useModelWrapper';
import useFieldData from '../../composables/useFieldData';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFloatingMenu from '../../composables/useFloatingMenu';

import { MenuItemData, MenuGroupData, MenuConfig, ValidationStatusType } from '../../types';
import { ValidationStatusTypes, FieldDescriptionIdKey } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * An input with a dropdown menu of predefined, selectable items.
 */
export default defineComponent( {
	name: 'CdxSelect',
	components: {
		CdxIcon,
		CdxMenu
	},
	/**
	 * We want the select handle to inherit attributes, not the root element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * Menu items and/or menu group definitions.
		 *
		 * Menu groups and individual menu items will be output in the order they appear here.
		 */
		menuItems: {
			type: Array as PropType<( MenuItemData | MenuGroupData )[]>,
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
		 * @default {}
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

	setup( props, { emit, attrs } ) {
		// Set up basic reactive values and template refs.
		const handle = ref<HTMLDivElement>();
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const descriptionId = inject( FieldDescriptionIdKey, undefined );
		const menuId = useGeneratedId( 'select-menu' );
		const expanded = ref( false );

		// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
		const handleId = ( attrs.id as string|undefined ) || useGeneratedId( 'select-handle' );
		const {
			computedDisabled,
			computedStatus,
			computedInputId: computedHandleId
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' ),
			handleId
		);

		// The value of the component's current selection is tracked in the parent as a v-model
		// binding.
		const modelWrapper = useModelWrapper( toRef( props, 'selected' ), emit, 'update:selected' );

		const selectedMenuItem = computed( () =>
			menu.value?.getComputedMenuItems().find( ( menuItem ) =>
				menuItem.value === props.selected )
		);

		// Set up the label that should display in the handle.
		const currentLabel = computed( () => {
			return selectedMenuItem.value ?
				selectedMenuItem.value.label ?? selectedMenuItem.value.value :
				props.defaultLabel;
		} );

		const startIcon = computed( () => {
			if ( props.defaultIcon && !selectedMenuItem.value ) {
				return props.defaultIcon;
			// The selected item includes an icon
			} else if ( selectedMenuItem.value?.icon ) {
				return selectedMenuItem.value.icon;
			}
			// Explicit return is needed to satisfy vue/return-in-computed-property
			return undefined;
		} );

		const internalClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-select-vue--enabled': !computedDisabled.value,
				'cdx-select-vue--disabled': computedDisabled.value,
				'cdx-select-vue--expanded': expanded.value,
				'cdx-select-vue--value-selected': !!selectedMenuItem.value,
				'cdx-select-vue--no-selections': !selectedMenuItem.value,
				'cdx-select-vue--has-start-icon': !!startIcon.value,
				[ `cdx-select-vue--status-${ computedStatus.value }` ]: true
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		// Normally, we use v-bind to bind otherAttrs to the appropriate element. In this case, we
		// do not want to include the id attribute, since we're using the computed ID via the
		// useComputedId composable.
		// This removes the ID and stores all other attributes in otherAttrsMinusId.
		const otherAttrsMinusId = computed( () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { id, ...everythingElse } = otherAttrs.value;
			return everythingElse;
		} );

		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		function onBlur(): void {
			expanded.value = false;
		}

		function onClick(): void {
			if ( computedDisabled.value ) {
				return;
			}

			expanded.value = !expanded.value;
			handle.value?.focus();
		}

		function onKeydown( e: KeyboardEvent ) {
			if ( computedDisabled.value ) {
				return;
			}
			menu.value?.delegateKeyNavigation( e, { characterNavigation: true } );
		}

		useFloatingMenu( handle, menu );

		return {
			handle,
			menu,
			computedHandleId,
			descriptionId,
			menuId,
			modelWrapper,
			selectedMenuItem,
			highlightedId,
			expanded,
			computedDisabled,
			onBlur,
			currentLabel,
			rootClasses,
			rootStyle,
			otherAttrsMinusId,
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
@import ( reference ) '../../themes/mixins/select.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

// HACK: We can't use the CSS icon mixin for the select handle's arrow icon, because it uses
// mask-image, which applies to the background of the entire element. We can't do that with the
// entire <select> element, and pseudo-elements can't be used for the icon either.
// Instead, we really need background rules. Unfortunately, we can't rely on our color tokens here,
// since they will soon output CSS custom properties, which won't work for the SVG's fill property.
// TODO: Make this work in night mode.
@color-base-hex: #202122;
@color-disabled-hex: #72777d;
@icon-expand-svg-content: extract( @cdx-icon-expand, 1 );

.get-select-icon-background-image( @param-select-icon-color ) {
	@escaped-icon-color: escape( @param-select-icon-color );
	background-image: url( 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20" fill="@{escaped-icon-color}">@{icon-expand-svg-content}</svg>' );
}

// CSS-only and Vue implementations are too divergent to combine, so they are included separately.
// This is the CSS-only version, which is a `<select>` element.
.cdx-select {
	.cdx-select__handle();
	/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
	appearance: none;
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	background-position: center right @spacing-75;
	background-repeat: no-repeat;
	background-size: calc( ~'max( @{size-icon-x-small}, @{min-size-icon-x-small} )' );

	&:disabled {
		.cdx-select__handle--disabled();
		.get-select-icon-background-image( @color-disabled-hex );

		// Support: Chrome, which sets an opacity less than 1 for disabled select elements.
		opacity: @opacity-base;
	}

	&:enabled {
		.cdx-select__handle--enabled();
		.get-select-icon-background-image( @color-base-hex );
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

	&__start-icon.cdx-icon {
		.cdx-mixin-icon( start );
	}

	&__indicator.cdx-icon {
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
		.cdx-select-vue__handle:not( :focus ) {
			background-color: @background-color-error-subtle;
			color: @color-error;
			border-color: @border-color-error;

			.cdx-select-vue__start-icon {
				color: @color-error;
			}

			&:hover {
				background-color: @background-color-error-subtle--hover;
				color: @color-error--hover;
				border-color: @border-color-error--hover;

				.cdx-select-vue__start-icon {
					color: @color-error--hover;
				}
			}
		}
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		// The menu is positioned relative to the dialog backdrop, not the triggering element.
		position: static;
	}
}
</style>
