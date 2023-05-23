<template>
	<div
		v-show="expanded"
		class="cdx-menu"
		:class="rootClasses"
		:style="rootStyle"
	>
		<ul
			class="cdx-menu__listbox"
			role="listbox"
			aria-multiselectable="false"
			:style="listBoxStyle"
			v-bind="otherAttrs"
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
				v-for="( menuItem, index ) in computedMenuItems"
				:key="menuItem.value"
				:ref="( ref ) => assignTemplateRef( ref, index )"
				v-bind="menuItem"
				:selected="menuItem.value === selected"
				:active="menuItem.value === activeMenuItem?.value"
				:highlighted="menuItem.value === highlightedMenuItem?.value"
				:show-thumbnail="showThumbnail"
				:bold-label="boldLabel"
				:hide-description-overflow="hideDescriptionOverflow"
				:search-query="searchQuery"
				@change="( menuState, setState ) =>
					handleMenuItemChange( menuState, setState && menuItem )"
				@click="$emit( 'menu-item-click', menuItem )"
			>
				<!--
					@slot Display of an individual item in the menu
					@binding {MenuItem} menuItem The current menu item
					@binding {boolean} active Whether the current item is visually active
				-->
				<slot
					:menu-item="menuItem"
					:active="menuItem.value === activeMenuItem?.value &&
						menuItem.value === highlightedMenuItem?.value"
				/>
			</cdx-menu-item>

			<cdx-progress-bar
				v-if="showPending"
				class="cdx-menu__progress-bar"
				:inline="true"
			/>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRef, watch, PropType, onMounted, onUnmounted, nextTick, ComponentPublicInstance } from 'vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import CdxProgressBar from '../progress-bar/ProgressBar.vue';
import useGeneratedId from '../../composables/useGeneratedId';
import { MenuItemData, MenuItemDataWithId, MenuState } from '../../types';
import useIntersectionObserver from '../../composables/useIntersectionObserver';
import useSplitAttributes from '../../composables/useSplitAttributes';

/**
 * A contextual list of selectable options, often triggered by a control or an input.
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
	/**
	 * Attributes, besides class and style, will be passed to the <ul> element.
	 */
	inheritAttrs: false,
	props: {
		/** Menu items. See the MenuItemData type. */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			required: true
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
		 * Limit the number of menu items to display before scrolling.
		 *
		 * Setting this prop to anything falsy will show all menu items.
		 *
		 * By default, all menu items are shown.
		 */
		visibleItemLimit: {
			type: Number as PropType<number|null>,
			default: null
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
		'menu-item-keyboard-navigation',
		/**
		 * When the user scrolls towards the bottom of the menu.
		 *
		 * If it is possible to add or load more menu items, then now would be a good moment
		 * so that the user can experience infinite scrolling.
		 */
		'load-more'
	],
	expose: [
		'clearActive',
		'getHighlightedMenuItem',
		'getHighlightedViaKeyboard',
		'delegateKeyNavigation'
	],
	setup( props, { emit, slots, attrs } ) {
		/**
		 * Computed array of menu items with unique IDs added; other methods and properties should
		 * reference this value instead of the original menuItems prop.
		 */
		const computedMenuItems = computed( (): MenuItemDataWithId[] => {
			const menuItemsWithFooter = props.footer && props.menuItems ?
				[ ...props.menuItems, props.footer ] :
				props.menuItems;
			return menuItemsWithFooter.map( ( menuItem ) => ( {
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
		const highlightedViaKeyboard = ref( false );
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
					highlightedViaKeyboard.value = false;
					break;

				case 'highlightedViaKeyboard':
					highlightedMenuItem.value = menuItem || null;
					highlightedViaKeyboard.value = true;
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
		function handleHighlightViaKeyboard( newHighlightedMenuItem?: MenuItemDataWithId ) {
			if ( !newHighlightedMenuItem ) {
				return;
			}

			// Change menu state.
			handleMenuItemChange( 'highlightedViaKeyboard', newHighlightedMenuItem );

			// Emit a key navigation event in case the parent
			// needs to update the input value
			emit( 'menu-item-keyboard-navigation', newHighlightedMenuItem );
		}

		/**
		 * Highlights the previous enabled menu item from the item index provided,
		 * or highlights the last enabled item if called without arguments
		 *
		 * @param highlightedIndex
		 */
		function highlightPrev( highlightedIndex?: number ) {
			const findPrevEnabled = ( startIndex: number ) : MenuItemDataWithId|undefined => {
				for ( let index = startIndex - 1; index >= 0; index-- ) {
					if ( !computedMenuItems.value[ index ].disabled ) {
						return computedMenuItems.value[ index ];
					}
				}
			};

			// Start at the currently highlighted index if there is one, otherwise, start past the
			// end of the list so we can begin with the last item on the list.
			highlightedIndex = highlightedIndex || computedMenuItems.value.length;
			// Find the previous index, if there is one. Otherwise, start at the end.
			const prev = findPrevEnabled( highlightedIndex ) ??
				findPrevEnabled( computedMenuItems.value.length );

			handleHighlightViaKeyboard( prev );
		}

		/**
		 * Highlights the next enabled menu item from the item index provided,
		 * or highlights the first enabled item if called without arguments
		 *
		 * @param highlightedIndex
		 */
		function highlightNext( highlightedIndex?: number ) {
			const findNextEnabled = ( startIndex: number ) : MenuItemDataWithId|undefined =>
				computedMenuItems.value.find( ( item, index ) =>
					!item.disabled && index > startIndex );

			// Start at the currently highlighted index if there is one, otherwise, start at -1.
			highlightedIndex = highlightedIndex ?? -1;
			// Find the next index, if there is one, otherwise find the first item so we can
			// loop back
			const next = findNextEnabled( highlightedIndex ) || findNextEnabled( -1 );

			handleHighlightViaKeyboard( next );
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
						if ( highlightedMenuItem.value && highlightedViaKeyboard.value ) {
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
						if ( highlightedMenuItem.value && highlightedViaKeyboard.value ) {
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
							handleMenuItemChange( 'highlightedViaKeyboard', findSelectedMenuItem() );
						}
						highlightPrev( highlightedMenuItemIndex.value );
					} else {
						handleExpandMenu();
					}
					maybeScrollIntoView();
					return true;
				case 'ArrowDown':
					maybePrevent();

					if ( props.expanded ) {
						if ( highlightedMenuItem.value === null ) {
							handleMenuItemChange( 'highlightedViaKeyboard', findSelectedMenuItem() );
						}
						highlightNext( highlightedMenuItemIndex.value );
					} else {
						handleExpandMenu();
					}
					maybeScrollIntoView();

					return true;
				case 'Home':
					maybePrevent();

					if ( props.expanded ) {
						if ( highlightedMenuItem.value === null ) {
							handleMenuItemChange( 'highlightedViaKeyboard', findSelectedMenuItem() );
						}
						highlightNext();
					} else {
						handleExpandMenu();
					}
					maybeScrollIntoView();

					return true;
				case 'End':
					maybePrevent();

					if ( props.expanded ) {
						if ( highlightedMenuItem.value === null ) {
							handleMenuItemChange( 'highlightedViaKeyboard', findSelectedMenuItem() );
						}
						highlightPrev();
					} else {
						handleExpandMenu();
					}
					maybeScrollIntoView();

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

		const menuItemElements: Element[] = [];
		const loadMoreTriggerElement = ref<Element|undefined>( undefined );
		const isTriggerVisible = useIntersectionObserver(
			loadMoreTriggerElement,
			{ threshold: 0.8 }
		);

		watch( isTriggerVisible, ( value ) => {
			if ( value ) {
				emit( 'load-more' );
			}
		} );

		/**
		 * Assign an element to the its index in the array of MenuItem refs.
		 * Also keeps track of the element that is the trigger for loading more items.
		 *
		 * @param templateRef
		 * @param index
		 */
		function assignTemplateRef(
			templateRef: ComponentPublicInstance | Element | null,
			index: number
		) {
			if ( templateRef ) {
				menuItemElements[ index ] =
					( templateRef as ComponentPublicInstance ).$el as Element;
				const visibleItemLimit = props.visibleItemLimit;
				if ( !visibleItemLimit || props.menuItems.length < visibleItemLimit ) {
					return;
				}

				/**
				 * Pick a sensible "load more"-threshold that is between at least 2
				 * and at most the visibleItemLimit. It interpolates between these
				 * values based on the number of menu items.
				 */
				const loadMoreThreshold = Math.min(
					visibleItemLimit,
					Math.max( 2, Math.floor( 0.2 * props.menuItems.length ) )
				);
				if ( index === props.menuItems.length - loadMoreThreshold ) {
					loadMoreTriggerElement.value =
						( templateRef as ComponentPublicInstance ).$el as Element;
				}
			}
		}

		function maybeScrollIntoView(): void {
			if (
				!props.visibleItemLimit ||
				props.visibleItemLimit > props.menuItems.length ||
				highlightedMenuItemIndex.value === undefined
			) {
				return;
			}

			const scrollIndex = highlightedMenuItemIndex.value >= 0 ?
				highlightedMenuItemIndex.value :
				0;
			menuItemElements[ scrollIndex ].scrollIntoView( {
				behavior: 'smooth',
				block: 'nearest'
			} );
		}

		const maxMenuHeight = ref<number | null>( null );
		const footerHeight = ref<number | null>( null );

		function resizeMenu(): void {
			footerHeight.value = null;
			if ( !props.visibleItemLimit || menuItemElements.length <= props.visibleItemLimit ) {
				maxMenuHeight.value = null;
				return;
			}

			const firstMenuItemElement = menuItemElements[ 0 ];
			const firstHiddenMenuItemElement = menuItemElements[ props.visibleItemLimit ];

			maxMenuHeight.value = calculateMenuHeight(
				firstMenuItemElement,
				firstHiddenMenuItemElement
			);
			if ( props.footer ) {
				const footerElement = menuItemElements[ menuItemElements.length - 1 ];
				footerHeight.value = footerElement.scrollHeight;
			}
		}

		function calculateMenuHeight(
			firstMenuItemElement: Element,
			firstHiddenMenuItemElement: Element
		) {
			const firstItemTop = firstMenuItemElement.getBoundingClientRect().top;
			const hiddenItemTop = firstHiddenMenuItemElement.getBoundingClientRect().top;

			// add 2 pixels to account for the menu's border
			return ( hiddenItemTop - firstItemTop ) + 2;
		}

		onMounted( () => {
			document.addEventListener( 'mouseup', onMouseUp );
		} );

		onUnmounted( () => {
			document.removeEventListener( 'mouseup', onMouseUp );
		} );

		watch( toRef( props, 'expanded' ), async ( newVal ) => {
			const selectedMenuItem = findSelectedMenuItem();

			// Clear the highlight states when the menu is closed.
			if ( !newVal && highlightedMenuItem.value && selectedMenuItem === undefined ) {
				handleMenuItemChange( 'highlighted' );
			}

			// When the menu is opened, highlight the selected item first.
			if ( newVal && selectedMenuItem !== undefined ) {
				handleMenuItemChange( 'highlighted', selectedMenuItem );
			}

			if ( newVal ) {
				await nextTick();
				resizeMenu();
				await nextTick();
				maybeScrollIntoView();
			}
		} );

		watch( toRef( props, 'menuItems' ), async ( newPropMenuItems ) => {
			if ( newPropMenuItems.length < menuItemElements.length ) {
				menuItemElements.length = newPropMenuItems.length;
			}

			if ( props.expanded ) {
				await nextTick();
				resizeMenu();
				await nextTick();
				maybeScrollIntoView();
			}
		}, { deep: true } );

		const listBoxStyle = computed( () => {
			return {
				'max-height': maxMenuHeight.value ? `${maxMenuHeight.value}px` : undefined,
				'overflow-y': maxMenuHeight.value ? 'scroll' as const : undefined,
				'margin-bottom': footerHeight.value ? `${footerHeight.value}px` : undefined
			};
		} );

		const internalClasses = computed( () => {
			return {
				'cdx-menu--has-footer': !!props.footer,
				'cdx-menu--has-sticky-footer': !!props.footer && !!maxMenuHeight.value
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		return {
			listBoxStyle,
			rootClasses,
			rootStyle,
			otherAttrs,
			assignTemplateRef,
			computedMenuItems,
			computedShowNoResultsSlot,
			highlightedMenuItem,
			highlightedViaKeyboard,
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
		 * Get whether the last highlighted item was highlighted via the keyboard.
		 *
		 * @public
		 * @return {boolean} Whether the last highlighted menu item was highlighted via keyboard.
		 */
		getHighlightedViaKeyboard(): boolean {
			return this.highlightedViaKeyboard;
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
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-menu {
	background-color: @background-color-base;
	position: absolute;
	left: 0;
	z-index: @z-index-dropdown;
	box-sizing: @box-sizing-base;
	width: @size-full;
	border: @border-base;
	border-radius: 0 0 @border-radius-base @border-radius-base;
	box-shadow: @box-shadow-drop-medium;

	&__progress-bar {
		position: absolute;
		top: 0;
	}

	&__listbox {
		margin: 0;
		padding: 0;
	}

	&--has-sticky-footer {
		.cdx-menu-item:last-of-type {
			position: absolute;
			bottom: 0;
			width: @size-full;
		}
	}

	&--has-footer {
		.cdx-menu-item:last-of-type:not( :first-of-type ) {
			border-top: @border-subtle;
		}
	}
}
</style>
