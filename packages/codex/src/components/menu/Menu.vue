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
			:style="listBoxStyle"
			:aria-live="showPending ? 'polite' : undefined"
			:aria-relevant="showPending ? ariaRelevant : undefined"
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
					handleMenuItemChange( menuState, setState ? menuItem : null )"
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
import { defineComponent, computed, ref, toRef, watch, PropType, onMounted, onUnmounted, nextTick, ComponentPublicInstance, HTMLAttributes } from 'vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import CdxProgressBar from '../progress-bar/ProgressBar.vue';
import useGeneratedId from '../../composables/useGeneratedId';
import { MenuItemData, MenuItemDataWithId, MenuState } from '../../types';
import useIntersectionObserver from '../../composables/useIntersectionObserver';
import useSplitAttributes from '../../composables/useSplitAttributes';

/**
 * A contextual list of selectable options, often triggered by a control or an input.
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
		'isExpanded',
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

		// TODO: `additions removals` should be valid use for `aria-relevant`, but a Vue bug is
		// preventing using it right now. See https://github.com/vuejs/core/issues/9030
		const ariaRelevant = 'additions removals' as HTMLAttributes[ 'aria-relevant' ];

		// When the user types printable characters, buffer those here, so that we can highlight
		// the first item matching the string the user typed. Clear the buffer if the user
		// doesn't type for 1.5 seconds.
		let keyBuffer = '';
		let keyBufferTimeout: ReturnType<typeof setTimeout>|null = null;

		/**
		 * Clear the key buffer. Also cancels the timer that will clear the buffer later.
		 */
		function clearKeyBuffer() {
			keyBuffer = '';
			if ( keyBufferTimeout !== null ) {
				clearTimeout( keyBufferTimeout );
				keyBufferTimeout = null;
			}
		}

		/**
		 * Set a timer to clear the key buffer after 1.5 seconds. If the timer is already running,
		 * this cancels and resets it.
		 */
		function resetKeyBufferTimeout() {
			if ( keyBufferTimeout !== null ) {
				clearTimeout( keyBufferTimeout );
			}
			keyBufferTimeout = setTimeout( clearKeyBuffer, 1500 );
		}

		function findSelectedMenuItem(): MenuItemDataWithId|null {
			return computedMenuItems.value.find(
				( menuItem ) => menuItem.value === props.selected
			) ?? null;
		}

		/**
		 * Handle various menu item changes.
		 *
		 * @param menuState
		 * @param menuItem
		 */
		function handleMenuItemChange( menuState: MenuState, menuItem: MenuItemDataWithId|null ) {
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
					highlightedMenuItem.value = menuItem ?? null;
					highlightedViaKeyboard.value = false;
					break;

				case 'highlightedViaKeyboard':
					highlightedMenuItem.value = menuItem ?? null;
					highlightedViaKeyboard.value = true;
					break;

				case 'active':
					activeMenuItem.value = menuItem ?? null;
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
			highlightedIndex = highlightedIndex ?? computedMenuItems.value.length;
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
			const next = findNextEnabled( highlightedIndex ) ?? findNextEnabled( -1 );

			handleHighlightViaKeyboard( next );
		}

		/**
		 * Handle printable characters. This includes:
		 * - Highlighting an item by typing the first character (or first few characters) of the
		 *   item's visible label.
		 * - Moving the highlight through items whose visible labels start with a character by
		 *   repeatedly typing that character.
		 * - Allowing the user to delete some or all of the characters they have typed with the
		 *   Backspace and Clear keys.
		 *
		 * If the key that was pressed was a printable character (without the Ctrl, Alt or Meta key
		 * pressed) or Backspace or Clear, this function handles it as described above and returns
		 * true. Otherwise, this function returns false.
		 *
		 * @param e Key event
		 * @return Whether the key event was handled by this function
		 */
		function handleCharacterNavigation( e: KeyboardEvent ): boolean {
			if ( e.key === 'Clear' ) {
				clearKeyBuffer();
				return true;
			}

			if ( e.key === 'Backspace' ) {
				keyBuffer = keyBuffer.slice( 0, -1 );
				resetKeyBufferTimeout();
				return true;
			}

			if ( e.key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey ) {
				// Open the menu in response to the user typing
				if ( !props.expanded ) {
					emit( 'update:expanded', true );
				}
				// When space key is pressed and the keyBuffer is empty, return false in order to
				// handle the key event navigation that opens/closes the menu.
				if ( e.key === ' ' && keyBuffer.length < 1 ) {
					return false;
				}

				keyBuffer += e.key.toLowerCase();

				const isRepeatedCharacter = keyBuffer.length > 1 &&
					keyBuffer.split( '' ).every( ( char ) => char === keyBuffer[ 0 ] );

				let itemsToMatch = computedMenuItems.value;
				let stringToMatch = keyBuffer;
				if ( isRepeatedCharacter && highlightedMenuItemIndex.value !== undefined ) {
					// Repeated character: find the next matching item after the currently
					// highlighted one, or loop back to the first matching item if there isn't a
					// next one. Do this by rotating itemsToMatch to start right after the
					// currently highlighted one.
					itemsToMatch = itemsToMatch.slice( highlightedMenuItemIndex.value + 1 )
						.concat( itemsToMatch.slice( 0, highlightedMenuItemIndex.value ) );
					stringToMatch = keyBuffer[ 0 ];
				}

				const matchingItem = itemsToMatch.find( ( item ) =>
					!item.disabled &&
					String( item.label ?? item.value ).toLowerCase().startsWith( stringToMatch )
				);
				if ( matchingItem ) {
					handleMenuItemChange( 'highlightedViaKeyboard', matchingItem );
					maybeScrollIntoView();
				}

				// Clear the key buffer if the user doesn't type for 1.5 seconds, and restart the
				// 1.5-second timer if it's already running
				resetKeyBufferTimeout();

				return true;
			}

			return false;
		}

		// Handle keyboard events delegated by the parent component. Wrapped by
		// delegateKeyNavigation() below; in order for their documentation to be displayed, public
		// methods must be declared in the "methods" block, and moving this function there would
		// necessitate moving or exposing a lot of other things, so we wrap it instead.
		function handleKeyNavigation(
			e: KeyboardEvent,
			{ prevent = true, characterNavigation = false } = {}
		): boolean {
			// If character navigation is enabled, try that first. If handleCharacterNavigation()
			// returns true, it has handled this key event and we don't need to do anything else.
			if ( characterNavigation ) {
				if ( handleCharacterNavigation( e ) ) {
					e.preventDefault();
					return true;
				}
				// If it wasn't a character navigation event, clear the key buffer.
				// We don't want something like A [Up arrow] B to be interpreted as "AB"
				clearKeyBuffer();
			}

			// The rest of this function deals with navigation keys (like arrows and Enter)

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
						emit( 'update:expanded', true );
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
						emit( 'update:expanded', true );
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
						emit( 'update:expanded', true );
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
						emit( 'update:expanded', true );
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
						emit( 'update:expanded', true );
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
			handleMenuItemChange( 'active', null );
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
			if ( newVal ) {
				// The menu was opened
				// Highlight the selected item, unless another item was already highlighted
				const selectedMenuItem = findSelectedMenuItem();
				if ( selectedMenuItem && !highlightedMenuItem.value ) {
					handleMenuItemChange( 'highlighted', selectedMenuItem );
				}

				await nextTick();
				resizeMenu();
				await nextTick();
				maybeScrollIntoView();
			} else {
				// The menu was closed
				// Clear the highlight states
				handleMenuItemChange( 'highlighted', null );
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
			handleKeyNavigation,
			ariaRelevant
		};
	},
	// Public methods
	// These must be in the methods block, not in the setup function, otherwise their documentation
	// won't be picked up by vue-docgen
	methods: {
		/**
		 * Returns whether the menu is expanded.
		 *
		 * @return {boolean}
		 */
		isExpanded(): boolean {
			return this.expanded;
		},

		/**
		 * Get the highlighted menu item, if any.
		 *
		 * The parent component should set `aria-activedescendant` to the `.id` property of the
		 * object returned by this method. If this method returns null, `aria-activedescendant`
		 * should not be set.
		 *
		 * @public
		 * @return {MenuItemDataWithId|null} The highlighted menu item,
		 *   or null if no item is highlighted or if the menu is closed.
		 */
		getHighlightedMenuItem(): MenuItemDataWithId|null {
			return this.expanded ? this.highlightedMenuItem : null;
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
			this.handleMenuItemChange( 'active', null );
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
		 * @param options
		 * @param options.prevent {boolean} If false, do not call e.preventDefault() or
		 *   e.stopPropagation()
		 * @param options.characterNavigation {boolean}
		 * @return Whether the event was handled
		 */
		delegateKeyNavigation(
			event: KeyboardEvent,
			{ prevent = true, characterNavigation = false } = {}
		): boolean {
			return this.handleKeyNavigation( event, { prevent, characterNavigation } );
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
