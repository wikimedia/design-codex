<template>
	<ul
		v-show="expanded"
		class="cdx-menu"
		role="listbox"
		aria-multiselectable="false"
	>
		<cdx-option
			v-for="option in computedOptions"
			:key="option.value"
			v-bind="option"
			:selected="option.value === selected"
			:active="option.value === activeOption?.value"
			:highlighted="option.value === highlightedOption?.value"
			@change="handleOptionChange( $event, option )"
		>
			<!--
				@slot Display of an individual option in the menu
				@binding {MenuOption} option The current option
			-->
			<slot :option="option" />
		</cdx-option>

		<li v-if="$slots.footer" class="cdx-option">
			<!--
				@slot Optional content to display at the end of the options list
			-->
			<slot name="footer" />
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRef, watch, PropType } from 'vue';
import CdxOption from '../option/Option.vue';
import useGeneratedId from '../../composables/useGeneratedId';
import { MenuOption, MenuOptionWithId, MenuState } from '../../types';

/**
 * Dropdown menu of options.
 *
 * Designed for use in components, like Select and Lookup, that display a menu below another element
 * (for example, a text input). This component renders a list of items, manages which option is
 * selected, highlighted, and active, and handles keyboard navigation. It does not display the
 * selected option or manage an input; the parent component needs to do that.
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
		CdxOption
	},
	props: {
		/** Menu options. See the MenuOption type. */
		options: {
			type: Array as PropType<MenuOption[]>,
			required: true
		},
		/**
		 * Value of the selected option, or null if no option is selected.
		 *
		 * Must be bound with `v-model:selected`.
		 */
		selected: {
			type: [ String, Number, null ] as PropType<string | number | null>,
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
		 * Whether to automatically select the highlighted option when the highlight is moved
		 * with the arrow keys.
		 */
		selectHighlighted: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		// Don't remove the spaces in the "string | number | null" type below; removing these spaces
		// causes the documentation to render the type as "union" instead.
		/**
		 * When the selected option changes.
		 *
		 * @property {string|number|null} selectedValue The `.value` property of the selected
		 *   option, or null if no option is selected.
		 */
		'update:selected',
		/**
		 * When the menu opens or closes.
		 *
		 * @property {boolean} newValue The new expanded state (true for open, false for closed)
		 */
		'update:expanded'
	],
	expose: [
		'clearActive',
		'getHighlightedOption',
		'delegateKeyNavigation'
	],
	setup( props, { emit } ) {
		/**
		 * Computed array of menu options with unique IDs added; other methods and properties should
		 * reference this value instead of the original options prop.
		 */
		const computedOptions = computed( (): MenuOptionWithId[] => {
			const generateOptionId = () => useGeneratedId( 'option' ).value;
			return props.options.map( ( option ) => ( {
				...option,
				id: generateOptionId()
			} ) );
		} );

		const highlightedOption = ref<MenuOptionWithId|null>( null );
		const activeOption = ref<MenuOptionWithId|null>( null );

		function findSelectedOption(): MenuOptionWithId|undefined {
			return computedOptions.value.find(
				( option ) => option.value === props.selected
			);
		}

		/**
		 * Handle various option changes.
		 *
		 * @param menuState
		 * @param option
		 */
		function handleOptionChange( menuState: MenuState, option?: MenuOptionWithId ) {
			if ( option && option.disabled ) {
				return;
			}

			switch ( menuState ) {
				case 'selected':
					emit( 'update:selected', option?.value || null );
					emit( 'update:expanded', false );
					activeOption.value = null;
					break;

				case 'highlighted':
					highlightedOption.value = option || null;
					break;

				case 'active':
					activeOption.value = option || null;
					break;
			}
		}

		// Key navigation handling.

		/**
		 * Returns the index of the currently highlighted option.
		 */
		const highlightedOptionIndex = computed( () => {
			if ( highlightedOption.value === null ) {
				return;
			}

			return computedOptions.value.findIndex( ( option ) =>
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				option.value === highlightedOption.value!.value
			);
		} );

		/**
		 * Handle changes related to highlighting a new item.
		 *
		 * @param newHighlightedOption
		 */
		function handleHighlight( newHighlightedOption?: MenuOptionWithId ) {
			if ( !newHighlightedOption ) {
				return;
			}

			// Change menu state.
			handleOptionChange( 'highlighted', newHighlightedOption );

			if ( props.selectHighlighted ) {
				emit( 'update:selected', newHighlightedOption.value );
			}
		}

		/**
		 * Highlights the previous enabled option.
		 */
		function highlightPrev() {
			const findPrevEnabled = ( startIndex: number ) : MenuOptionWithId|undefined => {
				let found;
				for ( let index = startIndex - 1; index >= 0; index-- ) {
					if ( !computedOptions.value[ index ].disabled ) {
						found = computedOptions.value[ index ];
						break;
					}
				}
				return found;
			};

			// Start at the currently highlighted index if there is one, otherwise, start past the
			// end of the list so we can begin with the last item on the list.
			const highlightedIndex = highlightedOptionIndex.value ?? computedOptions.value.length;
			// Find the previous index, if there is one. Otherwise, start at the end.
			const prev = findPrevEnabled( highlightedIndex ) ||
				findPrevEnabled( computedOptions.value.length );

			handleHighlight( prev );
		}

		/**
		 * Highlights the next enabled option.
		 */
		function highlightNext() {
			const findNextEnabled = ( startIndex: number ) : MenuOptionWithId|undefined =>
				computedOptions.value.find( ( item, index ) =>
					!item.disabled && index > startIndex );

			// Start at the currently highlighted index if there is one, otherwise, start at -1.
			const highlightedIndex = highlightedOptionIndex.value ?? -1;
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
				handleOptionChange( 'highlighted', findSelectedOption() );
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
						// Select the highlighted option then close the menu.
						if ( highlightedOption.value ) {
							emit( 'update:selected', highlightedOption.value.value );
						}
						emit( 'update:expanded', false );
					} else {
						handleExpandMenu();
					}
					return true;
				case 'Tab':
					if ( props.expanded ) {
						// Select the highlighted option then close the menu.
						if ( highlightedOption.value ) {
							emit( 'update:selected', highlightedOption.value.value );
						}
						emit( 'update:expanded', false );
					}
					return true;
				case 'ArrowUp':
					maybePrevent();

					if ( props.expanded ) {
						highlightPrev();
					} else {
						handleExpandMenu();
					}
					return true;
				case 'ArrowDown':
					maybePrevent();

					if ( props.expanded ) {
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

		// Clear the highlight states when the menu is closed.
		watch( toRef( props, 'expanded' ), ( newVal ) => {
			if ( !newVal && highlightedOption.value ) {
				highlightedOption.value = null;
			}
		} );

		return {
			computedOptions,
			highlightedOption,
			activeOption,
			handleOptionChange,
			handleKeyNavigation
		};
	},
	// Public methods
	// These must be in the methods block, not in the setup function, otherwise their documentation
	// won't be picked up by vue-docgen
	methods: {
		/**
		 * Get the highlighted option, if any.
		 *
		 * @public
		 * @return {MenuOptionWithId|null} The highlighted option,
		 *   or null if no option is highlighted.
		 */
		getHighlightedOption(): MenuOptionWithId|null {
			return this.highlightedOption;
		},

		/**
		 * Ensure no option is active. This unsets the active option if there is one.
		 *
		 * @public
		 */
		clearActive(): void {
			this.handleOptionChange( 'active' );
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
	margin: @margin-top-options-menu 0 0 0;
	border: @border-base;
	border-radius: 0 0 @border-radius-base @border-radius-base;
	padding: 0;
	box-shadow: @box-shadow-menu;
}
</style>
