import { Ref, ComponentPublicInstance, ref } from 'vue';
import useComputedDirection from './useComputedDirection';
import { ButtonGroupItem } from '../types';

/**
 * Get handling for arrow key navigation for button groups.
 *
 * Pass in the `buttons` prop to get a series of vars and functions needed to support arrow key
 * navigation of button groups in LTR and RTL. Within the button group component, do the following:
 *   1. Assign the `rootElement` ref to the root div.
 *   2. Set each button's ref to `( ref ) => assignTemplateRef( ref, index )`.
 *   3. Set the following event handlers for each button:
 *     a. `@focus="onFocus( index )"
 *     b. `@blur="onBlur"
 *     c. `@keydown="onKeydown"
 *
 * @param buttonsProp
 * @return refs and functions
 */
export default function useButtonGroupKeyboardNav(
	buttonsProp: Ref<ButtonGroupItem[]>
) : {
	rootElement: Ref<HTMLDivElement | undefined>,
	assignTemplateRef: ( templateRef: ComponentPublicInstance | Element | null,
		index: number ) => void,
	onFocus: ( index: number ) => void,
	onBlur: () => void,
	onKeydown: ( e: KeyboardEvent ) => void,
} {
	const rootElement = ref<HTMLDivElement>();
	const focusedButtonIndex = ref<number>();
	const buttonRefs = ref( new Map<number, ComponentPublicInstance>() );
	const currentDirection = useComputedDirection( rootElement );

	// Get an array of button template refs.
	function assignTemplateRef(
		templateRef: ComponentPublicInstance | Element | null,
		index: number
	) {
		const button = templateRef as ComponentPublicInstance | null;
		if ( button ) {
			buttonRefs.value.set( index, button );
		}
	}

	function onFocus( index: number ) {
		focusedButtonIndex.value = index;
	}

	function onBlur() {
		focusedButtonIndex.value = undefined;
	}

	// Focus on the next/previous non-disabled button.
	function focusNonDisabled( index: number, increment: -1 | 1 ) {
		const newIndex = index + increment;
		const targetButton = buttonsProp.value[ newIndex ];

		if ( targetButton ) {
			if ( targetButton.disabled ) {
				focusNonDisabled( newIndex, increment );
			} else {
				const buttonElement =
					buttonRefs.value.get( newIndex )?.$el as HTMLButtonElement | undefined;
				buttonElement?.focus();
			}
		}
	}

	function next() {
		// If no button is focused, start from the beginning. (Note that this will probably never
		// happen, since tabbing into the button group focuses a button, but let's play it safe.)
		focusNonDisabled( focusedButtonIndex.value ?? -1, 1 );
	}

	function prev() {
		// If no button is focused, start from the end (same comment from above applies here).
		focusNonDisabled( focusedButtonIndex.value ?? buttonsProp.value.length, -1 );
	}

	function moveRight() {
		if ( currentDirection.value === 'rtl' ) {
			prev();
		} else {
			next();
		}
	}

	function moveLeft() {
		if ( currentDirection.value === 'rtl' ) {
			next();
		} else {
			prev();
		}
	}

	function onKeydown( e: KeyboardEvent ) {
		switch ( e.key ) {
			case 'ArrowRight':
				e.preventDefault();
				moveRight();
				break;
			case 'ArrowLeft':
				e.preventDefault();
				moveLeft();
				break;
			case 'ArrowDown':
				e.preventDefault();
				next();
				break;
			case 'ArrowUp':
				e.preventDefault();
				prev();
				break;
		}
	}

	return {
		rootElement,
		assignTemplateRef,
		onFocus,
		onBlur,
		onKeydown
	};
}
