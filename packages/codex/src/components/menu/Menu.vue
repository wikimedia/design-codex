<template>
	<ul
		v-show="expanded"
		class="cdx-menu"
		role="listbox"
		aria-multiselectable="false"
	>
		<li
			v-if="showPending && computedMenuItems.length === 0 && $slots.pending"
			class="cdx-menu__pending cdx-menu-item"
		>
			<!--
				@slot Message to indicate pending state.
			-->
			<slot name="pending" />
		</li>

		<li v-if="computedShowNoResultsSlot" class="cdx-menu__no-results cdx-menu-item">
			<!--
				@slot Message to show if there are no menu items to display.
			-->
			<slot name="no-results" />
		</li>

		<cdx-menu-item
			v-for="menuItem in computedMenuItems"
			:key="menuItem.value"
			v-bind="menuItem"
			:selected="menuItem.value === selected"
			:active="menuItem.value === activeMenuItem?.value"
			:highlighted="menuItem.value === highlightedMenuItem?.value"
			:show-thumbnail="showThumbnail"
			:bold-label="boldLabel"
			:hide-description-overflow="hideDescriptionOverflow"
			:search-query="searchQuery"
			@change="handleMenuItemChange( $event, menuItem )"
			@click="$emit( 'menu-item-click', menuItem )"
		>
			<!--
				@slot Display of an individual item in the menu
				@binding {MenuItem} menuItem The current menu item
			-->
			<slot :menuItem="menuItem" />
		</cdx-menu-item>

		<cdx-progress-bar
			v-if="showPending"
			class="cdx-menu__progress-bar"
			:inline="true"
		/>
	</ul>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRef, watch, PropType, onMounted, onUnmounted } from 'vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import CdxProgressBar from '../progress-bar/ProgressBar.vue';
import useGeneratedId from '../../composables/useGeneratedId';
import { MenuItemData, MenuItemDataWithId, MenuState } from '../../types';

/**
 * Dropdown menu of items.
 *
 * Designed for use in components, like Select and Lookup, that display a menu below another element
 * (for example, a text input). This component renders a list of items, manages which item is
 * selected, highlighted, and active, and handles keyboard navigation. It does not display the
 * selected item or manage an input; the parent component needs to do that.
 *
 * The `selected` and `expanded` props must be bound with `v-model`, even if the parent component
 * doesn't use them. Without these `v-model` bindings, the menu won't function correctly.
 *
 * The menu itself is not focusable; for keyboard navigation to work, the parent component
 * needs to provide a focusable element, listen for `keydown` events on that element, and pass
 * those events to the menu by calling the `delegateKeyNavigation` method.
 */
export default defineComponent( {
	name: 'CdxMenu',
	components: {
		CdxMenuItem,
		CdxProgressBar
	},
	props: {
		/** Menu items. See the MenuItemData type. */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			required: true
		},
		/**
		 * Value of the selected menu item, or undefined if no item is selected.
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
		 * Whether the menu is expanded. Must be bound with `v-model:expanded`.
		 */
		expanded: {
			type: Boolean,
			required: true
		},
		/**
		 * Whether to display pending state indicators. Meant to indicate that new menu items are
		 * being fetched or computed.
		 *
		 * When true, the menu will expand if not already expanded, and an inline progress bar will
		 * display. If there are no menu items yet, a message can be displayed in the `pending`
		 * slot, e.g. "Loading results".
		 */
		showPending: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether menu item thumbnails (or a placeholder icon) should be displayed.
		 */
		showThumbnail: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to bold menu item labels.
		 */
		boldLabel: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to hide description text overflow via an ellipsis.
		 */
		hideDescriptionOverflow: {
			type: Boolean,
			default: false
		},
		/**
		 * The search query to be highlighted within the menu items' titles.
		 */
		searchQuery: {
			type: String,
			default: ''
		},
		/**
		 * Whether to show the `no-results` slot content.
		 *
		 * The Menu component automatically shows this slot when there is content in the
		 * `no-results` slot and there are zero menu items. However, some components may need to
		 * customize this behavior, e.g. to show the slot even when there is at least one menu item.
		 * This prop can be used to override the default Menu behavior.
		 *
		 * Possible values:
		 * `null` (default): the `no-results` slot will display only if there are zero menu items.
		 * `true`: the `no-results` slot will display, regardless of number of menu items.
		 * `false`: the `no-results` slot will not display, regardless of number of menu items.
		 */
		showNoResultsSlot: {
			type: Boolean as PropType<boolean|null>,
			default: null
		}
	},
	emits: [
		// Don't remove the spaces in the "string | number | null" type below; removing these
		// spaces causes the documentation to render the type as "union" instead.
		/**
		 * When the selected menu item changes.
		 *
		 * @property {string | number | null} selectedValue The `.value` property of the
		 * selected menu item, or null if no item is selected.
		 */
		'update:selected',
		/**
		 * When the menu opens or closes.
		 *
		 * @property {boolean} newValue The new expanded state (true for open, false for closed)
		 */
		'update:expanded',
		/**
		 * When a menu item is clicked.
		 *
		 * Typically, components with menus will respond to the selected value change, but
		 * occasionally, a component might want to react specifically when a menu item is clicked.
		 *
		 * @property {MenuItemDataWithId} menuItem The menu item that was clicked
		 */
		'menu-item-click',
		/**
		 * When a menu item is highlighted via keyboard navigation.
		 *
		 * @property {MenuItemDataWithId} highlightedMenuItem The menu item
		 * was highlighted
		 */
		'menu-item-keyboard-navigation'
	],
	expose: [
		'clearActive',
		'getHighlightedMenuItem',
		'delegateKeyNavigation'
	],
	setup( props, { emit, slots } ) {
		/**
		 * Computed array of menu items with unique IDs added; other methods and properties should
		 * reference this value instead of the original menuItems prop.
		 */
		const computedMenuItems = computed( (): MenuItemDataWithId[] => {
			return props.menuItems.map( ( menuItem ) => ( {
				...menuItem,
				id: useGeneratedId( 'menu-item' )
			} ) );
		} );

		/**
		 * Whether to show the "no results" slot.
		 */
		const computedShowNoResultsSlot = computed( () => {
			// If slot is empty, don't display anything.
			if ( !slots[ 'no-results' ] ) {
				return false;
			}

			// If the parent component has provided the showNoResultsSlot override prop, return it.
			if ( props.showNoResultsSlot !== null ) {
				return props.showNoResultsSlot;
			}

			// Default behavior: show slot if there are zero menu items.
			return computedMenuItems.value.length === 0;
		} );

		const highlightedMenuItem = ref<MenuItemDataWithId|null>( null );
		const activeMenuItem = ref<MenuItemDataWithId|null>( null );

		function findSelectedMenuItem(): MenuItemDataWithId|undefined {
			return computedMenuItems.value.find(
				( menuItem ) => menuItem.value === props.selected
			);
		}

		/**
		 * Handle various menu item changes.
		 *
		 * @param menuState
		 * @param menuItem
		 */
		function handleMenuItemChange( menuState: MenuState, menuItem?: MenuItemDataWithId ) {
			if ( menuItem && menuItem.disabled ) {
				return;
			}

			switch ( menuState ) {
				case 'selected':
					emit( 'update:selected', menuItem?.value ?? null );
					emit( 'update:expanded', false );
					activeMenuItem.value = null;
					break;
				case 'highlighted':
					highlightedMenuItem.value = menuItem || null;
					break;

				case 'active':
					activeMenuItem.value = menuItem || null;
					break;
			}
		}

		// Key navigation handling.

		/**
		 * Returns the index of the currently highlighted menu item.
		 */
		const highlightedMenuItemIndex = computed( () => {
			if ( highlightedMenuItem.value === null ) {
				return;
			}

			return computedMenuItems.value.findIndex( ( menuItem ) =>
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				menuItem.value === highlightedMenuItem.value!.value
			);
		} );

		/**
		 * Handle changes related to highlighting a new item.
		 *
		 * @param newHighlightedMenuItem
		 */
		function handleHighlight( newHighlightedMenuItem?: MenuItemDataWithId ) {
			if ( !newHighlightedMenuItem ) {
				return;
			}

			// Change menu state.
			handleMenuItemChange( 'highlighted', newHighlightedMenuItem );

			// Emit a key navigation event in case the parent
			// needs to update the input value
			emit( 'menu-item-keyboard-navigation', newHighlightedMenuItem );
		}

		/**
		 * Highlights the previous enabled menu item.
		 */
		function highlightPrev() {
			const findPrevEnabled = ( startIndex: number ) : MenuItemDataWithId|undefined => {
				for ( let index = startIndex - 1; index >= 0; index-- ) {
					if ( !computedMenuItems.value[ index ].disabled ) {
						return computedMenuItems.value[ index ];
					}
				}
			};

			// Start at the currently highlighted index if there is one, otherwise, start past the
			// end of the list so we can begin with the last item on the list.
			const highlightedIndex = highlightedMenuItemIndex.value ??
				computedMenuItems.value.length;
			// Find the previous index, if there is one. Otherwise, start at the end.
			const prev = findPrevEnabled( highlightedIndex ) ||
				findPrevEnabled( computedMenuItems.value.length );

			handleHighlight( prev );
		}

		/**
		 * Highlights the next enabled menu item.
		 */
		function highlightNext() {
			const findNextEnabled = ( startIndex: number ) : MenuItemDataWithId|undefined =>
				computedMenuItems.value.find( ( item, index ) =>
					!item.disabled && index > startIndex );

			// Start at the currently highlighted index if there is one, otherwise, start at -1.
			const highlightedIndex = highlightedMenuItemIndex.value ?? -1;
			// Find the next index, if there is one, otherwise find the first item so we can
			// loop back
			const next = findNextEnabled( highlightedIndex ) || findNextEnabled( -1 );

			handleHighlight( next );
		}

		// Handle keyboard events delegated by the parent component. Wrapped by
		// delegateKeyNavigation() below; in order for their documentation to be displayed, public
		// methods must be declared in the "methods" block, and moving this function there would
		// necessitate moving or exposing a lot of other things, so we wrap it instead.
		function handleKeyNavigation( e: KeyboardEvent, prevent = true ): boolean {
			/**
			 * Open menu and highlight current selection, if there is one.
			 *
			 * If there is not a current selection, nothing should be highlighted when the menu is
			 * opened via keyboard navigation. This way, if a user presses enter to open the menu, a
			 * second enter keypress will close the menu rather than selecting anything.
			 */
			function handleExpandMenu() {
				emit( 'update:expanded', true );
				handleMenuItemChange( 'highlighted', findSelectedMenuItem() );
			}

			function maybePrevent() {
				if ( prevent ) {
					e.preventDefault();
					e.stopPropagation();
				}
			}

			switch ( e.key ) {
				case 'Enter':
				case ' ':
					maybePrevent();

					if ( props.expanded ) {
						// Select the highlighted menu item then close the menu.
						if ( highlightedMenuItem.value ) {
							emit( 'update:selected', highlightedMenuItem.value.value );
						}
						emit( 'update:expanded', false );
					} else {
						handleExpandMenu();
					}
					return true;
				case 'Tab':
					if ( props.expanded ) {
						// Select the highlighted menu item then close the menu.
						if ( highlightedMenuItem.value ) {
							emit( 'update:selected', highlightedMenuItem.value.value );
						}
						emit( 'update:expanded', false );
					}
					return true;
				case 'ArrowUp':
					maybePrevent();

					// After using mouse to expand the menu, nothing is highlighted,
					// which will result in T304640.
					if ( props.expanded ) {
						if ( highlightedMenuItem.value === null ) {
							handleMenuItemChange( 'highlighted', findSelectedMenuItem() );
						}
						highlightPrev();
					} else {
						handleExpandMenu();
					}
					return true;
				case 'ArrowDown':
					maybePrevent();

					if ( props.expanded ) {
						if ( highlightedMenuItem.value === null ) {
							handleMenuItemChange( 'highlighted', findSelectedMenuItem() );
						}
						highlightNext();
					} else {
						handleExpandMenu();
					}
					return true;
				case 'Escape':
					maybePrevent();
					emit( 'update:expanded', false );
					return true;
				default:
					return false;
			}
		}

		/**
		 * Always clear active state on mouseup.
		 */
		function onMouseUp() {
			handleMenuItemChange( 'active' );
		}

		onMounted( () => {
			document.addEventListener( 'mouseup', onMouseUp );
		} );

		onUnmounted( () => {
			document.removeEventListener( 'mouseup', onMouseUp );
		} );

		// Clear the highlight states when the menu is closed.
		watch( toRef( props, 'expanded' ), ( newVal ) => {
			if ( !newVal && highlightedMenuItem.value ) {
				highlightedMenuItem.value = null;
			}
		} );

		return {
			computedMenuItems,
			computedShowNoResultsSlot,
			highlightedMenuItem,
			activeMenuItem,
			handleMenuItemChange,
			handleKeyNavigation
		};
	},
	// Public methods
	// These must be in the methods block, not in the setup function, otherwise their documentation
	// won't be picked up by vue-docgen
	methods: {
		/**
		 * Get the highlighted menu item, if any.
		 *
		 * @public
		 * @return {MenuItemDataWithId|null} The highlighted menu item,
		 *   or null if no item is highlighted.
		 */
		getHighlightedMenuItem(): MenuItemDataWithId|null {
			return this.highlightedMenuItem;
		},

		/**
		 * Ensure no menu item is active. This unsets the active item if there is one.
		 *
		 * @public
		 */
		clearActive(): void {
			this.handleMenuItemChange( 'active' );
		},

		/**
		 * Handles all necessary keyboard navigation.
		 *
		 * The parent component should listen for keydown events on its focusable element,
		 * and pass those events to this method. Events for arrow keys, tab and enter are handled
		 * by this method. If a different key was pressed, this method will return false to indicate
		 * that it didn't handle the event.
		 *
		 * @public
		 * @param event {KeyboardEvent} Keydown event object
		 * @param prevent {boolean} If false, do not call e.preventDefault() or e.stopPropagation()
		 * @return Whether the event was handled
		 */
		delegateKeyNavigation( event: KeyboardEvent, prevent = true ): boolean {
			return this.handleKeyNavigation( event, prevent );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-menu {
	background-color: @background-color-base;
	position: absolute;
	left: 0;
	z-index: 4;
	box-sizing: @box-sizing-base;
	width: @size-full;
	margin: @position-offset-border-width-base 0 0 0;
	border: @border-width-base @border-style-base @border-color-base;
	border-radius: 0 0 @border-radius-base @border-radius-base;
	padding: 0;
	box-shadow: @box-shadow-menu;

	&__progress-bar {
		position: absolute;
		top: 0;
	}
}
</style>
