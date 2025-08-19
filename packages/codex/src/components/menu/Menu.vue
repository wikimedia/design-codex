<!-- eslint-disable max-len -->
<template>
	<teleport :to="computedTarget" :disabled="teleportDisabled">
		<div
			v-show="expanded"
			ref="rootElement"
			class="cdx-menu"
			:class="rootClasses"
			:style="rootStyle"
		>
			<ul
				ref="menuListbox"
				class="cdx-menu__listbox"
				role="listbox"
				tabindex="-1"
				:style="listBoxStyle"
				:aria-live="showPending ? 'polite' : undefined"
				:aria-relevant="showPending ? ariaRelevant : undefined"
				:aria-multiselectable="isMultiselect ? true : undefined"
				v-bind="otherAttrs"
				@mousedown.prevent
			>
				<li
					v-if="showPending && computedMenuItems.length === 0 && $slots.pending"
					class="cdx-menu__pending cdx-menu-item"
				>
					<!-- @slot Message to indicate pending state. -->
					<slot name="pending" />
				</li>

				<li
					v-if="computedShowNoResultsSlot"
					class="cdx-menu__no-results cdx-menu-item"
					role="option"
				>
					<!-- @slot Message to show if there are no menu items to display. -->
					<slot name="no-results" />
				</li>

				<template v-for="( menuEntry, index ) in computedMenuEntries" :key="index">
					<li
						v-if="isMenuGroupData( menuEntry )"
						class="cdx-menu__group-wrapper"
						:class="getGroupWrapperClasses( menuEntry )"
					>
						<ul
							class="cdx-menu__group"
							role="group"
							:aria-labelledby="menuEntry.id + '-label'"
							:aria-describedby="menuEntry.id + '-description'"
						>
							<span class="cdx-menu__group__meta">
								<cdx-icon
									v-if="menuEntry.icon"
									class="cdx-menu__group__icon"
									:icon="menuEntry.icon"
								/>
								<span class="cdx-menu__group__meta__text">
									<span
										:id="menuEntry.id + '-label'"
										class="cdx-menu__group__label"
									>
										{{ menuEntry.label }}
									</span>
									<span
										v-if="menuEntry.description"
										:id="menuEntry.id + '-description'"
										class="cdx-menu__group__description"
									>
										{{ menuEntry.description }}
									</span>
								</span>
							</span>
							<cdx-menu-item
								v-for="( menuItemInGroup ) in menuEntry.items"
								:key="menuItemInGroup.value"
								:ref="( ref ) => assignTemplateRef( ref, getMenuItemIndex( menuItemInGroup ) )"
								class="cdx-menu__group__item"
								v-bind="getMenuItemBindings( menuItemInGroup )"
								v-on="getMenuItemHandlers( menuItemInGroup )"
							>
								<!--
									@slot Display of an individual item in the menu
									@binding {MenuItem} menuItem The current menu item
									@binding {boolean} active Whether the current item is visually active
								-->
								<slot v-bind="getSlotBindings( menuItemInGroup )" />
							</cdx-menu-item>
						</ul>
					</li>
					<cdx-menu-item
						v-else
						:ref="( ref ) => assignTemplateRef( ref, getMenuItemIndex( menuEntry ) )"
						v-bind="getMenuItemBindings( menuEntry )"
						v-on="getMenuItemHandlers( menuEntry )"
					>
						<slot v-bind="getSlotBindings( menuEntry )" />
					</cdx-menu-item>
				</template>

				<cdx-progress-bar
					v-if="showPending"
					class="cdx-menu__progress-bar"
					:inline="true"
				/>
			</ul>
		</div>
	</teleport>
</template>
<!-- eslint-enable max-len -->

<script lang="ts">
import { defineComponent, computed, ref, toRef, watch, PropType, onMounted, onUnmounted, nextTick, useId, ComponentPublicInstance, HTMLAttributes, inject, unref, MaybeRef } from 'vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxProgressBar from '../progress-bar/ProgressBar.vue';
import { MenuItemData, MenuItemDataWithId, MenuState, MenuItemValue, MenuGroupData, MenuGroupDataWithIds, TeleportTarget } from '../../types';
import useIntersectionObserver from '../../composables/useIntersectionObserver';
import useSplitAttributes from '../../composables/useSplitAttributes';

/**
 * Type guard for the `selected` prop to determine whether it's an array, signaling that the Menu is
 * in multiselect mode.
 *
 * A computed property returning a boolean value is not enough to tell TypeScript that
 * props.selected is an array, but this type guard satisfies it.
 *
 * @param selected
 * @return Whether this Menu is in multiselect mode.
 */
function selectedIsArray( selected: MenuItemValue | MenuItemValue[] | null ) {
	return selected !== null && Array.isArray( selected );
}

/**
 * Type guard for each item within a menu groups definition.
 *
 * @param menuEntry
 * @return Whether this is a menu group or a single menu item.
 */
function isMenuGroupData( menuEntry: MenuItemData | MenuGroupData ): menuEntry is MenuGroupData {
	return 'items' in menuEntry;
}

/**
 * A contextual list of selectable options, often triggered by a control or an input.
 */
export default defineComponent( {
	name: 'CdxMenu',
	components: {
		CdxMenuItem,
		CdxIcon,
		CdxProgressBar
	},
	/**
	 * Attributes, besides class and style, will be passed to the <ul> element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * Menu items and menu group definitions.
		 *
		 * Menu groups and individual menu items will be output in the order they appear here.
		 */
		menuItems: {
			type: Array as PropType<( MenuItemData|MenuGroupData )[]>,
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
		 * Value(s) of the selected menu item(s). A single value for single-select, or an array of
		 * values for multi-select.
		 *
		 * Must be bound with `v-model:selected`.
		 *
		 * The property should be initialized to `null` (for single-select) or an empty array (for
		 * multi-select) rather than using a falsy value.
		 */
		selected: {
			// eslint-disable-next-line max-len
			type: [ String, Number, Array, null ] as PropType<MenuItemValue | MenuItemValue[] | null>,
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
		},
		/**
		 * Whether to disable the use of teleport and render the Menu in its
		 * original location in the document.
		 *
		 * Teleport is disabled by default for Menus, but it will be enabled if `'CdxTeleportMenus'`
		 * is provided and set to true. Setting this prop prevents the Menu from being teleported
		 * regardless of the value of `'CdxTeleportMenus'`.
		 */
		renderInPlace: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		// Don't remove the spaces in the "string | number | null" type below; removing these
		// spaces causes the documentation to render the type as "union" instead.
		// Keep property descriptions on a single line or they will get cut off.
		/**
		 * When the selected menu item changes.
		 *
		 * Property will be a single value or `null` in single-select mode, or an array of values or
		 * an empty array in multiselect mode.
		 *
		 * @property {MenuItemValue | MenuItemValue[] | null} selectedValue selected value or values
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
	// expose is temporarily disabled to work around a Vue / vue-tsc bug, see
	// https://github.com/vuejs/language-tools/issues/5069
	/*
	expose: [
		'isExpanded',
		'getRootElement',
		'clearActive',
		'getHighlightedMenuItem',
		'getHighlightedViaKeyboard',
		'getComputedMenuItems',
		'delegateKeyNavigation'
	],
	*/
	setup( props, { emit, slots, attrs } ) {
		// Generate a unique ID prefix for each Menu instance,
		// along with a counter we will increment as items are added
		const menuInstanceId = useId();
		let idCounter = 0;

		// Set up a Map object to store and retrieve generated IDs for
		// menu items
		const menuItemIds = new Map<string|number, string>();

		// Generate a new ID using menu prefix and counter
		function generateId(): string {
			idCounter += 1;
			return `${ menuInstanceId }-${ idCounter }`;
		}

		// Assign ids to menu items that don't have them yet
		function assignIds( items: ( MenuItemData | MenuGroupData )[] ): void {
			items.forEach( ( item ) => {
				if ( isMenuGroupData( item ) ) {
					const groupKey = `group-${ item.label }`;
					if ( !menuItemIds.has( groupKey ) ) {
						menuItemIds.set( groupKey, generateId() );
					}
					item.items.forEach( ( subItem ) => {
						if ( !menuItemIds.has( subItem.value ) ) {
							menuItemIds.set( subItem.value, generateId() );
						}
					} );
				} else if ( !menuItemIds.has( item.value ) ) {
					menuItemIds.set( item.value, generateId() );
				}
			} );
		}

		/**
		 * Clean up stale IDs when menu items change
		 */
		watch( toRef( props, 'menuItems' ), ( newItems ) => {
			// Helper to get all item values from a menu items array, including those in groups
			// eslint-disable-next-line max-len
			function getAllItemValues( items: ( MenuItemData | MenuGroupData )[] ): Set<string | number> {
				const values = new Set<string | number>();

				items.forEach( ( item ) => {
					if ( isMenuGroupData( item ) ) {
						values.add( `group-${ item.label }` );
						item.items.forEach( ( subItem ) => values.add( subItem.value ) );
					} else {
						values.add( item.value );
					}
				} );
				return values;
			}

			// Create a Set (entries guaranteed unique) for all entries of the updated
			// menuItems prop
			const newItemSet = getAllItemValues( newItems );

			// Go through the Map of IDs we generated in setup(), and remove any entries
			// that do not correspond to the Set we just created
			menuItemIds.forEach( ( _, key ) => {
				if ( !newItemSet.has( key ) ) {
					menuItemIds.delete( key );
				}
			} );
		}, { deep: true } );

		/**
		 * Computed array of menu items and groups with a unique ID added to
		 * each menu item. This is used to output menu items and groups in the
		 * template.
		 */
		const computedMenuEntries = computed( (): (
			MenuItemDataWithId | MenuGroupDataWithIds
		)[] => {
			// Ensure that all menu items get assigned IDs whenever this property is computed
			assignIds( props.menuItems );
			if ( props.footer ) {
				assignIds( [ props.footer ] );
			}

			const menuItemsWithFooter = props.footer && props.menuItems ?
				[ ...props.menuItems, props.footer ] :
				props.menuItems;

			function getMenuItemWithId( menuItem: MenuItemData ) : MenuItemDataWithId {
				const id = menuItemIds.get( menuItem.value );
				if ( !id ) {
					throw new Error( `No ID found for menu item with value ${ menuItem.value }` );
				}
				return { ...menuItem, id };
			}

			return menuItemsWithFooter.map( ( menuEntry ) => {
				if ( isMenuGroupData( menuEntry ) ) {
					const groupId = menuItemIds.get( `group-${ menuEntry.label }` );
					if ( !groupId ) {
						throw new Error( `No ID found for menu item with value group-${ menuEntry.label }` );
					}
					return {
						...menuEntry,
						id: groupId,
						items: menuEntry.items.map( ( subItem ) => getMenuItemWithId( subItem ) )
					};
				} else {
					return getMenuItemWithId( menuEntry );
				}
			} );
		} );

		/**
		 * Computed array of all individual menu items, not organized by group. Other methods and
		 * properties should reference this instead of the original menuItems prop.
		 */
		const computedMenuItems = computed( () => {
			const items: MenuItemDataWithId[] = [];
			computedMenuEntries.value.forEach( ( menuEntry ) => {
				if ( isMenuGroupData( menuEntry ) ) {
					items.push( ...menuEntry.items );
				} else {
					items.push( menuEntry );
				}
			} );
			return items;
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

		// Determine whether to teleport the Menu.
		const providedTeleport = inject<MaybeRef<boolean>>( 'CdxTeleportMenus', false );
		const teleportDisabled = computed(
			() => !unref( providedTeleport ) || props.renderInPlace
		);
		// Determine where to teleport the Menu to.
		const providedTarget = inject<TeleportTarget>( 'CdxTeleportTarget', undefined );
		const computedTarget = computed( () => unref( providedTarget ) ?? 'body' );

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

		function findFirstSelectedMenuItem(): MenuItemDataWithId|null {
			// Return the single selected menu item or, in multiselect mode, the first one.
			return computedMenuItems.value.find(
				( menuItem ) => selectedIsArray( props.selected ) ?
					props.selected.includes( menuItem.value ) :
					menuItem.value === props.selected
			) ?? null;
		}

		// Note that this computed ref is useful if you just need to know whether the Menu is in
		// multiselect mode or not (e.g. to show a special icon in the MenuItem component if
		// selected). This can't be used to prove to TypeScript that props.selected is an array.
		const isMultiselect = computed( () => selectedIsArray( props.selected ) );

		/**
		 * Get whether a menu item is selected.
		 *
		 * @param value value of the menu item
		 * @return
		 */
		function isItemSelected( value: string | number ): boolean {
			return selectedIsArray( props.selected ) ?
				props.selected.includes( value ) :
				value === props.selected;
		}

		/**
		 * Emit an `update:selected` event after an item is selected or de-selected.
		 *
		 * @param value value of the newly selected (or de-selected) menu item
		 */
		function updateSelected( value: string | number ) {
			if ( selectedIsArray( props.selected ) ) {
				// If this value is not currently selected, add it. If it is selected, remove it.
				const newSelected = !props.selected.includes( value ) ?
					props.selected.concat( value ) :
					props.selected.filter( ( item ) => item !== value );
				emit( 'update:selected', newSelected );
			} else {
				emit( 'update:selected', value );
			}
		}

		/**
		 * Handle various menu item changes.
		 *
		 * @param menuState
		 * @param menuItem
		 */
		function handleMenuItemChange( menuState: MenuState, menuItem: MenuItemDataWithId|null ) {
			if ( menuItem?.disabled ) {
				return;
			}

			switch ( menuState ) {
				case 'selected':
					if ( menuItem ) {
						updateSelected( menuItem.value );
					}
					if ( !isMultiselect.value ) {
						emit( 'update:expanded', false );
					}
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

			return computedMenuItems.value.findIndex(
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				( menuItem ) => menuItem.value === highlightedMenuItem.value!.value
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
			const findNextEnabled = (
				startIndex: number
			) : MenuItemDataWithId|undefined => computedMenuItems.value.find(
				( item, index ) => !item.disabled && index > startIndex
			);

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

				const matchingItem = itemsToMatch.find( ( item ) => !item.disabled &&
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
						// Select the highlighted menu item....
						if ( highlightedMenuItem.value && highlightedViaKeyboard.value ) {
							updateSelected( highlightedMenuItem.value.value );
						}
						// Then close the menu, unless this is multiselect mode.
						if ( !isMultiselect.value ) {
							emit( 'update:expanded', false );
						}
					} else {
						emit( 'update:expanded', true );
					}
					return true;
				case 'Tab':
					if ( props.expanded ) {
						// Select the highlighted menu item in single-select menus.
						// Then close the menu.
						if ( highlightedMenuItem.value &&
							highlightedViaKeyboard.value &&
							!isMultiselect.value
						) {
							updateSelected( highlightedMenuItem.value.value );
							emit( 'update:expanded', false );
						}
					}
					return true;
				case 'ArrowUp':
					maybePrevent();

					// After using mouse to expand the menu, nothing is highlighted,
					// which will result in T304640.
					if ( props.expanded ) {
						if ( highlightedMenuItem.value === null ) {
							handleMenuItemChange( 'highlightedViaKeyboard', findFirstSelectedMenuItem() );
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
							handleMenuItemChange( 'highlightedViaKeyboard', findFirstSelectedMenuItem() );
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
							handleMenuItemChange( 'highlightedViaKeyboard', findFirstSelectedMenuItem() );
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
							handleMenuItemChange( 'highlightedViaKeyboard', findFirstSelectedMenuItem() );
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

		const rootElement = ref<HTMLElement>();
		const menuListbox = ref<HTMLElement>();

		/**
		 * If the menu is scrollable, scroll the highlighted item into view,
		 * or scroll to the first item if no item is highlighted.
		 */
		function maybeScrollIntoView(): void {
			// Whether the Menu listbox (<ul>) is scrollable; and account for
			// situations when the Menu is resized (examples include: setting `visibleItemLimit`,
			// and when the height of the visible content area without scroll aka `clientHeight`
			// is less than the `scrollHeight`).
			const isListboxScrollable = menuListbox.value &&
				menuListbox.value.scrollHeight > menuListbox.value.clientHeight;

			// Ensure the menu is scrollable.
			if (
				highlightedMenuItemIndex.value === undefined ||
				!isListboxScrollable
			) {
				return;
			}

			const scrollIndex = highlightedMenuItemIndex.value >= 0 ?
				highlightedMenuItemIndex.value :
				0;

			// Defer scrolling until after the DOM has rerendered
			// This avoids bugs when floating-ui is about to reposition the menu (T382505)
			requestAnimationFrame( () => {
				menuItemElements[ scrollIndex ].scrollIntoView( {
					behavior: 'smooth',
					block: 'nearest'
				} );
			} );
		}

		const maxMenuHeight = ref<number | null>( null );
		const footerHeight = ref<number | null>( null );

		/**
		 * Update the footer height and menu max-height calculations, then scroll the highlighted
		 * item into view if there is one. This function is called when the menu is opened or
		 * when the menu items change.
		 */
		async function resizeMenu(): Promise<void> {
			await nextTick();
			updateFooterHeight();
			updateMaxMenuHeight();
			await nextTick();
			maybeScrollIntoView();
		}

		/**
		 * Measure the height of the footer item, and store it in the footerHeight ref.
		 */
		function updateFooterHeight(): void {
			if ( props.footer ) {
				const footerElement = menuItemElements[ menuItemElements.length - 1 ];
				footerHeight.value = footerElement.scrollHeight;
			} else {
				footerHeight.value = null;
			}
		}

		/**
		 * Compute what the max-height of the menu should be based on the visibleItemLimit prop,
		 * and store that value in the maxMenuHeight ref.
		 */
		function updateMaxMenuHeight(): void {
			if ( !props.visibleItemLimit || menuItemElements.length <= props.visibleItemLimit ) {
				maxMenuHeight.value = null;
				return;
			}

			const firstMenuItemTop = menuItemElements[ 0 ].getBoundingClientRect().top;
			const firstHiddenMenuItemTop = menuItemElements[ props.visibleItemLimit ]
				.getBoundingClientRect().top;

			// add 2 pixels to account for the menu's border
			maxMenuHeight.value = ( firstHiddenMenuItemTop - firstMenuItemTop ) + 2;
		}

		// Menu groups.

		/**
		 * Get classes for the menu group wrapper element.
		 *
		 * @param group
		 * @return {Object} Class name keys with boolean values
		 */
		function getGroupWrapperClasses( group: MenuGroupData ) {
			return {
				'cdx-menu__group-wrapper--hide-label': !!group.hideLabel
			};
		}

		/**
		 * Get the index of a menu item within the list of menu items (without menu groups).
		 *
		 * @param menuItem
		 * @return {number} Index of the grouped menu item within the list of all menu items
		 */
		function getMenuItemIndex( menuItem: MenuItemDataWithId ) {
			return computedMenuItems.value.indexOf( menuItem );
		}

		/**
		 * Get template bindings for a menu item (bound with v-bind).
		 *
		 * Used to provide any relevant props and attributes to the MenuItem component.
		 *
		 * @param menuItem
		 * @return {Object} Prop and attribute bindings for a menu item
		 */
		function getMenuItemBindings( menuItem: MenuItemDataWithId ) {
			return {
				selected: isItemSelected( menuItem.value ),
				active: menuItem.value === activeMenuItem.value?.value,
				highlighted: menuItem.value === highlightedMenuItem.value?.value,
				showThumbnail: props.showThumbnail,
				boldLabel: props.boldLabel,
				hideDescriptionOverflow: props.hideDescriptionOverflow,
				searchQuery: props.searchQuery,
				multiselect: isMultiselect.value,
				...menuItem
			};
		}

		/**
		 * Get event handlers for a menu item (bound with v-on).
		 *
		 * Used to provide event handlers to the MenuItem component.
		 *
		 * @param menuItem
		 * @return {Object} Event handlers for a menu item
		 */
		function getMenuItemHandlers( menuItem: MenuItemDataWithId ) {
			return {
				change: (
					menuState: MenuState,
					setState: boolean
				) => handleMenuItemChange( menuState, setState ? menuItem : null ),
				click: () => emit( 'menu-item-click', menuItem )
			};
		}

		/**
		 * Get template bindings for the default slot (bound with v-bind).
		 *
		 * Used to provide the current menu item's data and its active status to the slot content.
		 *
		 * @param menuItem
		 * @return {Object} Bindings for the default slot (menu item content)
		 */
		function getSlotBindings( menuItem: MenuItemDataWithId ) {
			return {
				menuItem,
				active: menuItem.value === activeMenuItem.value?.value &&
					menuItem.value === highlightedMenuItem.value?.value
			};
		}

		onMounted( () => {
			document.addEventListener( 'mouseup', onMouseUp );
		} );

		onUnmounted( () => {
			document.removeEventListener( 'mouseup', onMouseUp );
		} );

		watch( toRef( props, 'expanded' ), async ( newVal ) => {
			if ( newVal ) {
				// The menu was opened. Highlight the selected item, unless another item was already
				// highlighted.
				const selectedMenuItem = findFirstSelectedMenuItem();
				if ( selectedMenuItem && !highlightedMenuItem.value ) {
					handleMenuItemChange( 'highlighted', selectedMenuItem );
				}

				await resizeMenu();
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
				await resizeMenu();
			}
		}, { deep: true } );

		const listBoxStyle = computed( () => ( {
			'max-height': maxMenuHeight.value ? `${ maxMenuHeight.value }px` : undefined,
			'margin-bottom': footerHeight.value ? `${ footerHeight.value }px` : undefined
		} ) );

		const internalClasses = computed( () => ( {
			'cdx-menu--has-footer': !!props.footer
		} ) );

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
			computedMenuEntries,
			computedMenuItems,
			computedShowNoResultsSlot,
			highlightedMenuItem,
			highlightedViaKeyboard,
			teleportDisabled,
			computedTarget,
			handleMenuItemChange,
			handleKeyNavigation,
			ariaRelevant,
			isMultiselect,
			rootElement,
			menuListbox,
			getGroupWrapperClasses,
			getMenuItemIndex,
			getMenuItemBindings,
			getMenuItemHandlers,
			getSlotBindings,
			isMenuGroupData
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
		// eslint-disable-next-line vue/no-unused-properties
		isExpanded(): boolean {
			return this.expanded;
		},

		/**
		 * Get the root element of the menu. The normal `.$el` property doesn't work due to the use
		 * of teleport; it returns a `<!-- teleport start -->` comment instead. This method returns
		 * the real, teleported root element.
		 *
		 * @return {HTMLElement|undefined}
		 */
		// eslint-disable-next-line vue/no-unused-properties
		getRootElement(): HTMLElement|undefined {
			return this.rootElement;
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
		 * Get the computed menu items with IDs (without menu groups).
		 *
		 * @public
		 * @return {MenuItemDataWithId[]} List of current menu items without menu groups.
		 */
		getComputedMenuItems(): MenuItemDataWithId[] {
			return this.computedMenuItems;
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
@import ( reference ) '../../themes/mixins/common.less';

.cdx-menu {
	background-color: @background-color-base;
	// Use flexbox to restrict the height of the listbox to the height of the menu.
	// Without this, the listbox spills out of the menu.
	display: flex;
	flex-direction: column;
	position: absolute;
	left: 0;
	z-index: @z-index-dropdown;
	box-sizing: @box-sizing-base;
	width: @size-full;
	border: @border-base;
	border-radius: @border-radius-base;
	box-shadow: @box-shadow-medium;
	font-size: @font-size-medium;
	line-height: @line-height-small;

	&__progress-bar.cdx-progress-bar {
		position: absolute;
		top: 0;
	}

	&__listbox,
	&__group {
		margin: 0;
		padding: 0;
	}

	&__listbox {
		overflow-y: auto;
	}

	&__group {
		display: flex;
		flex-direction: column;

		&__meta {
			display: flex;
			gap: @spacing-50;
			padding: @spacing-50 @spacing-75 @spacing-35;

			&__text {
				display: flex;
				flex-direction: column;
				font-size: @font-size-medium;
				line-height: @line-height-small;
			}
		}

		&__icon {
			// Setting the height of the icon to the line-height of the accompanying text
			// to ensure centering of the icon to text
			height: @line-height-small;
		}

		&__label {
			font-weight: @font-weight-bold;
		}

		&__description {
			color: @color-subtle;
			font-size: @font-size-small;
			line-height: @line-height-small;
		}
	}

	&__group-wrapper {
		&--hide-label .cdx-menu__group__meta {
			.screen-reader-text();
		}
	}

	// Add a divider between (1) a group and a menu item, (2) a menu item and a group, (3) anything
	// and a group with a hidden label, (4) a group with a hidden label and another group.
	// The only things without dividers between them are two individual menu items and two groups
	// that both have labels.
	&__group-wrapper + .cdx-menu-item,
	.cdx-menu-item + &__group-wrapper,
	&__group-wrapper--hide-label,
	&__group-wrapper--hide-label + &__group-wrapper {
		border-top: @border-width-base @border-style-base @border-color-muted;
	}

	&--has-footer {
		.cdx-menu__listbox > .cdx-menu-item:last-of-type {
			position: absolute;
			bottom: 0;
			box-sizing: @box-sizing-base;
			width: @size-full;

			&:not( :first-of-type ) {
				border-top: @border-subtle;
			}
		}
	}
}
</style>
