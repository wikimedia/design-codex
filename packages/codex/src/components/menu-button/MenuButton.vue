<template>
	<div
		class="cdx-menu-button"
		:class="rootClasses"
		:style="rootStyle"
	>
		<cdx-button
			:id="buttonId"
			ref="button"
			v-bind="otherAttrs"
			:disabled="computedDisabled"
			:weight="weight"
			:action="action"
			aria-haspopup="menu"
			:aria-controls="menuId"
			:aria-expanded="expanded"
			@click="onClick"
			@blur="onBlur"
			@keydown="onKeydown"
		>
			<!-- @slot MenuButton content -->
			<slot />
		</cdx-button>
		<div class="cdx-menu-button__menu-wrapper">
			<cdx-menu
				:id="menuId"
				ref="menu"
				v-model:selected="modelWrapper"
				v-model:expanded="expanded"
				class="cdx-menu-button__menu"
				:menu-items="menuItems"
				v-bind="menuConfig"
				role="menu"
				:aria-labelledby="buttonId"
				:footer="footer"
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
	</div>
</template>

<script lang="ts">
import {
	PropType,
	Ref,
	ComponentPublicInstance,
	defineComponent,
	ref,
	toRef,
	useId
} from 'vue';

import CdxButton from '../button/Button.vue';
import CdxMenu from '../menu/Menu.vue';
import useFieldData from '../../composables/useFieldData';
import useFloatingMenu from '../../composables/useFloatingMenu';
import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import {
	MenuButtonItemData,
	MenuGroupData,
	MenuConfig,
	MenuItemData,
	MenuItemValue,
	ButtonAction,
	ButtonWeight
} from '../../types';

export default defineComponent( {
	name: 'CdxMenuButton',
	components: {
		CdxButton,
		CdxMenu
	},
	inheritAttrs: false,
	props: {
		/**
		 * Value of the current selection.
		 *
		 * This prop should be initialized to `null` (for single-select) or an empty array (for
		 * multi-select) rather than using a falsy value.
		 *
		 * Must be bound with `v-model:selected`.
		 */
		selected: {
			// eslint-disable-next-line max-len
			type: [ String, Number, Array, null ] as PropType<MenuItemValue | MenuItemValue[] | null>,
			required: true
		},

		/**
		 * Menu items and/or menu group definitions.
		 *
		 * Menu groups and individual menu items will be output in the order they appear here.
		 */
		menuItems: {
			type: Array as PropType<( MenuButtonItemData|MenuGroupData )[]>,
			required: true
		},

		/**
		 * Configuration for various menu features. All properties default to false.
		 *
		 * See the MenuConfig type.
		 *
		 * @default {}
		 */
		menuConfig: {
			type: Object as PropType<MenuConfig>,
			default: () => ( {} as MenuConfig )
		},

		/**
		 * The kind of action that will be taken on click.
		 *
		 * @values 'default', 'progressive', 'destructive'
		 */
		action: {
			type: String as PropType<ButtonAction>,
			default: 'default',
		},

		/**
		 * Visual prominence of Button.
		 *
		 * @values 'normal', 'primary', 'quiet'
		 */
		weight: {
			type: String as PropType<ButtonWeight>,
			default: 'quiet',
		},

		/**
		 * Whether the dropdown is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},

		/**
		 * Interactive footer item.
		 *
		 * This is a special menu item which is pinned to the bottom of the menu. When scrolling is
		 * enabled within the menu, the footer item will always be visible at the bottom of the
		 * menu. When scrolling is not enabled, the footer item will simply appear as the last menu
		 * item.
		 *
		 * The footer item is selectable, like other menu items.
		 */
		footer: {
			type: Object as PropType<MenuItemData>,
			default: null
		}
	},

	emits: [
		/**
		 * When the selected value changes.
		 *
		 * @property {string | number} selected The new selected value
		 */
		'update:selected'
	],

	setup( props, { emit, attrs } ) {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const button = ref<InstanceType<typeof CdxButton>>();
		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const expanded = ref( false );
		const buttonId = useId();
		const menuId = useId();
		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

		// Get helpers from useSplitAttributes() composable.
		const { rootClasses, rootStyle, otherAttrs } = useSplitAttributes( attrs );

		// Track whether a keyboard action was just handled to prevent click event
		let keyboardActionHandled = false;

		function onKeydown( e: KeyboardEvent ) {
			if (
				!menu.value ||
				computedDisabled.value ||
				props.menuItems.length === 0 ||
				e.key === ' '
			) {
				return;
			}

			// Handle Enter key
			if ( e.key === 'Enter' ) {
				// Check if a menu item is highlighted
				const highlightedItem = menu.value.getHighlightedMenuItem();
				const highlightedViaKeyboard = menu.value.getHighlightedViaKeyboard();

				if ( expanded.value && highlightedItem && highlightedViaKeyboard ) {
					// When a menu item is highlighted, delegate to menu to select it
					menu.value.delegateKeyNavigation( e );
				} else {
					// When no menu item is highlighted, toggle the menu
					e.preventDefault();
					expanded.value = !expanded.value;
				}

				// Prevent the click event from firing
				keyboardActionHandled = true;
				return;
			}

			// Delegate other keys to menu for navigation
			menu.value.delegateKeyNavigation( e );
		}

		function onClick() {
			// Ignore click events when keyboard events were already handled.
			// This prevents the menu from toggling again (immediately closing
			// the menu) on keyup.
			if ( keyboardActionHandled ) {
				keyboardActionHandled = false;
				return;
			}
			expanded.value = !expanded.value;
		}

		function onBlur() {
			expanded.value = false;
		}

		useFloatingMenu( button as Ref<ComponentPublicInstance>, menu, {
			useAvailableWidth: true,
			placement: 'bottom-start',
			offset: 4
		} );

		return {
			computedDisabled,
			expanded,
			menu,
			menuId,
			modelWrapper,
			onKeydown,
			onClick,
			onBlur,
			button,
			buttonId,
			rootClasses,
			rootStyle,
			otherAttrs
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-menu-button {
	&__menu-wrapper {
		position: relative;
	}

	&__menu {
		min-width: @size-800;
		max-width: @size-1600;
	}

	// Overrides when used within a scrollable container in another component (e.g. Dialog)
	.cdx-scrollable-container & {
		&__menu-wrapper {
			// The menu is positioned relative to a positioned ancestor of the scrollable container
			// (e.g. the Dialog's backdrop), not the triggering element.
			position: static;
		}
	}
}
</style>
