import { Ref, ComponentPublicInstance, computed, watch } from 'vue';
import { MaybeElement, useFloating, size, hide, autoUpdate } from '@floating-ui/vue';
import CdxMenu from '../components/menu/Menu.vue';

/**
 * Implements the useFloating() composable from FloatingUI for menu components.
 *
 * This composable will:
 * - Ensure the menu is always visually attached to its triggering element
 * - Ensure the menu is always the same width as its triggering element
 *
 * @param referenceElement The ref of the element the menu is visually attached to
 * @param menu The menu ref
 */
export default function useFloatingMenu(
	referenceElement: Ref<MaybeElement<HTMLElement>>,
	menu: Ref<InstanceType<typeof CdxMenu>|undefined>
) : void {
	// typescript-eslint doesn't know that menu.value is a special Vue type (instance of CdxMenu).
	// These rules are disabled throughout the file when accessing properties of menu.value.
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	const menuIsExpanded = () => menu.value?.isExpanded();

	const middleware = [
		size( {
			apply( { rects, elements } ) {
				// Set the width of the menu.
				// Width is needed in Dialogs, when the menu's position is set relative to
				// the dialog, not the triggering element.
				Object.assign( elements.floating.style, {
					width: `${rects.reference.width}px`
				} );
			}
		} ),
		// Hide the menu when it has escaped the reference element's clipping context (e.g. the menu
		// is opened down and you scroll up until the reference element just starts to leave the
		// container).
		hide( {
			strategy: 'escaped'
		} ),
		// Hide the menu when the reference element is fully hidden (e.g. the menu is opened down
		// and you scroll down until the whole reference element is gone).
		hide()
	];

	const { floatingStyles, middlewareData, update } = useFloating(
		referenceElement,
		menu as Ref<ComponentPublicInstance>,
		{ middleware }
	);

	// Compute the value of the `visibility` CSS property for the menu.
	// This allows us to visually hide the menu when it should no longer be visible. We set
	// `visibility: hidden` when...
	// - The menu is closed (not necessary to visually hide the menu, since we handle that with
	//   v-show, but having `display: none` and `visibility: visible` just doesn't make sense)
	// - The hide middleware has set either `escaped` or `referenceHidden` to true (see above)
	const menuVisibility = computed( () => {
		const isHidden = !menuIsExpanded() ||
			middlewareData.value.hide?.escaped || middlewareData.value.hide?.referenceHidden;
		return isHidden ? 'hidden' : 'visible';
	} );

	// When floatingStyles change, set CSS values.
	watch( [ floatingStyles, menuVisibility ], ( [ newStyles, newVisibility ] ) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		Object.assign( menu.value?.$el.style, {
			visibility: newVisibility,
			position: newStyles.position,
			top: `${newStyles.top}px`,
			// `left: 0` is set in the Menu component, which gets transformed to `right: 0` for
			// RTL. For this component, we must unset `right: 0`, because the transform value
			// is relative to the left side of the screen regardless of reading direction.
			right: 'unset',
			// Set `left` value to ensure the menu is translated relative to the left side of
			// the screen, which is what FloatingUI expects when it calculates the translate-x
			// value for both LTR and RTL.
			left: `${newStyles.left}px`,
			transform: newStyles.transform || 'none'
		} );
	} );

	// Run FloatingUI's autoUpdate function when the menu is expanded.
	// autoUpdate returns a cleanup function that enables us to remove event listeners when the
	// menu closes.
	let cleanupAutoUpdate: ( () => void ) | null = null;
	watch( menuIsExpanded, ( newExpanded ) => {
		if ( newExpanded ) {
			cleanupAutoUpdate = autoUpdate(
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				( referenceElement.value && '$el' in referenceElement.value ) ? referenceElement.value.$el : referenceElement,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
				menu.value?.$el,
				update
			);
		} else {
			if ( cleanupAutoUpdate ) {
				cleanupAutoUpdate();
				cleanupAutoUpdate = null;
			}
		}
	} );
}
