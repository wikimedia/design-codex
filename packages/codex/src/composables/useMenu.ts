import {
	WritableComputedRef,
	ComputedRef,
	Ref,
	computed,
	ref,
	provide,
	watch
} from 'vue';
import useGeneratedId from './useGeneratedId';
import { MenuStateKey, MenuOptionsKey } from '../constants';
import { MenuState, MenuOption, MenuOptionWithId } from '../types';

// Custom options that can be provided to useMenu when called
interface UseMenuConfig {
	/**
	 * If true, the highlighted option will automatically be selected when the highlight is
	 * moved via keyboard navigation.
	 */
	updateSelectionOnHighlight?: boolean
}

/**
 * Sets up the caller to have an accessible, functional menu of options.
 *
 * This composable provides to the caller:
 * - computedOptions: the provided array of MenuOptions with generated IDs added
 * - state: an object of menu states (selected, highlighted, highlightedViaKeyboard, and active) and
 *   the current option in that state, if any
 * - expanded: whether the menu is visible
 * - onBlur: a simple blur handler to close the menu
 * - handleOptionChange: change handler for Option components
 * - handleKeyNavigation: comprehensive handling of keyboard navigation of the menu
 *
 * For sample usage, see the Select component.
 *
 * This composable also provides various data and methods to child components of the caller and is
 * specifically meant to be used with the Option component.
 *
 * @param options
 * @param modelWrapper
 * @param config
 * @return menu helpers
 */
export default function useMenu(
	options: Ref<MenuOption[]>,
	modelWrapper: WritableComputedRef<string|number|null>,
	config?: UseMenuConfig
): {
	computedOptions: ComputedRef<MenuOptionWithId[]>,
	state: Record<MenuState, Readonly<Ref<MenuOptionWithId|null>>>,
	expanded: Ref<boolean>,
	onBlur: () => void,
	handleOptionChange: ( menuState: MenuState, option?: MenuOptionWithId ) => void,
	handleKeyNavigation: ( e: KeyboardEvent ) => void
} {
	/**
	 * Computed array of menu options with unique IDs added; other methods and properties should
	 * reference this value instead of the original options prop.
	 */
	const computedOptions = computed( (): MenuOptionWithId[] => {
		const generateOptionId = () => useGeneratedId( 'option' ).value;
		return options.value.map( ( option ) => ( {
			...option,
			id: generateOptionId()
		} ) );
	} );

	/**
	 * Component selection state, from which various computed properties are
	 * derived.
	 */
	const state = {
		selected: computed( (): MenuOptionWithId|null =>
			computedOptions.value.find(
				( option ) => option.value === modelWrapper.value
			) || null
		),
		highlighted: ref<MenuOptionWithId|null>( null ),
		active: ref<MenuOptionWithId|null>( null )
	};

	/**
	 * Whether the menu is expanded.
	 */
	const expanded = ref( false );

	/**
	 * Close menu on blur.
	 */
	function onBlur() {
		expanded.value = false;
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
				modelWrapper.value = option?.value || null;
				expanded.value = false;
				state.active.value = null;
				break;

			case 'highlighted':
				state.highlighted.value = option || null;
				break;

			case 'active':
				state.active.value = option || null;
				break;

			default:
				break;
		}
	}

	// Provide the appropriate data and to all children.
	provide( MenuStateKey, state );
	provide( MenuOptionsKey, computedOptions );

	// Key navigation handling.

	/**
	 * Returns the index of the currently highlighted option.
	 */
	const highlightedOptionIndex = computed( () => {
		const highlightedOption = state.highlighted.value;
		if ( highlightedOption === null ) {
			return;
		}

		return computedOptions.value.findIndex( ( option ) =>
			highlightedOption.id === option.id
		);
	} );

	/**
	 * Handle changes related to highlighting a new item.
	 *
	 * @param highlightedOption
	 */
	function handleHighlight( highlightedOption?: MenuOptionWithId ) {
		if ( !highlightedOption ) {
			return;
		}

		// Change menu state.
		handleOptionChange( 'highlighted', highlightedOption );

		if ( config?.updateSelectionOnHighlight ) {
			modelWrapper.value = highlightedOption.value;
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

		// Start at the currently highlighted index if there is one, otherwise, start past the end
		// of the list so we can begin with the last item on the list.
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
			computedOptions.value.find( ( item, index ) => !item.disabled && index > startIndex );

		// Start at the currently highlighted index if there is one, otherwise, start at -1.
		const highlightedIndex = highlightedOptionIndex.value ?? -1;
		// Find the next index, if there is one, otherwise find the first item so we can loop back.
		const next = findNextEnabled( highlightedIndex ) || findNextEnabled( -1 );

		handleHighlight( next );
	}

	/**
	 * Handles all necessary keyboard navigation.
	 *
	 * Keydown events for space, enter, up, down, and tab should call a method
	 * in the caller component that first checks if the component is disabled,
	 * plus any other necessary checks. If they pass, the event should be
	 * passed to this function.
	 *
	 * Preventing the default action and stopping propagation is handled here so
	 * it doesn't have to be handled in each caller component.
	 *
	 * @param e
	 */
	function handleKeyNavigation( e: KeyboardEvent ) {
		/**
		 * Open menu and highlight current selection, if there is one.
		 *
		 * If there is not a current selection, nothing should be highlighted when the menu is
		 * opened via keyboard navigation. This way, if a user presses enter to open the menu, a
		 * second enter keypress will close the menu rather than selecting anything.
		 */
		function handleExpandMenu() {
			expanded.value = true;
			if ( state.selected.value ) {
				handleOptionChange( 'highlighted', state.selected.value );
			}
		}

		switch ( e.key ) {
			case 'Enter':
			case ' ':
				e.preventDefault();
				e.stopPropagation();

				if ( expanded.value ) {
					// Select the highlighted option then close the menu.
					if ( state.highlighted.value ) {
						modelWrapper.value = state.highlighted.value.value;
					}
					expanded.value = false;
				} else {
					handleExpandMenu();
				}
				break;
			case 'Tab':
				if ( expanded.value ) {
					// Select the highlighted option then close the menu.
					if ( state.highlighted.value ) {
						modelWrapper.value = state.highlighted.value.value;
					}
					expanded.value = false;
				}
				break;
			case 'ArrowUp':
				e.preventDefault();
				e.stopPropagation();

				if ( expanded.value ) {
					highlightPrev();
				} else {
					handleExpandMenu();
				}
				break;
			case 'ArrowDown':
				e.preventDefault();
				e.stopPropagation();

				if ( expanded.value ) {
					highlightNext();
				} else {
					handleExpandMenu();
				}
				break;
			case 'Escape':
				e.preventDefault();
				e.stopPropagation();
				expanded.value = false;
				break;
			default:
				break;
		}
	}

	// Clear the highlight states when the menu is closed.
	watch( expanded, ( newVal ) => {
		if ( !newVal && state.highlighted.value ) {
			state.highlighted.value = null;
		}
	} );

	return {
		computedOptions,
		state,
		expanded,
		onBlur,
		handleOptionChange,
		handleKeyNavigation
	};
}
