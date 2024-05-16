import { Ref, ComponentPublicInstance, computed, watch } from 'vue';
import { MaybeElement, useFloating, size, flip, hide, autoUpdate, offset } from '@floating-ui/vue';
import { FloatingMenuOptions } from '../types';
import CdxMenu from '../components/menu/Menu.vue';

// Helper function inspired on the function with the same name in @floating-ui/vue (sadly it's
// not exported by @floating-ui/vue)
function unwrapElement<T extends Element>( element: MaybeElement<T> ): T | null | undefined {
	return element && '$el' in element ? element.$el as T : element;
}

// The amount of free space to leave between the bottom of the menu and the bottom of the viewport,
// in pixels.
// TODO: Use the spacing-100 token here once tokens are available in JS (T324688)
const clipPadding = 16;

// The minimum height below which we won't shrink the menu when clipping, in pixels.
// TODO: Use a token here once tokens are available in JS (T324688), perhaps the size-800 token
// (size tokens are in ems, so that would require a slightly different approach)
const minClipHeight = 128;

/**
 * Implements the useFloating() composable from FloatingUI for menu components.
 *
 * This composable will:
 * - Ensure the menu is always visually attached to its triggering element
 * - Ensure the menu is always the same width as its triggering element
 * - Ensure the menu is positioned below the triggering element when there is enough space,
 *   and it positioned above the triggering element otherwise.
 * - Ensure the menu does not extend past the edge of the viewport
 * - Ensure the menu is hidden if the triggering element is scrolled out of view
 * - Ensure the menu and the reference element don't have rounded corners where they touch.
 *     - If you want the menu and the reference element to have rounded corners on the sides
 *       where they don't touch, you must set a `border-radius` on *all* corners. This composable
 *       will then override the `border-radius` to 0 for the corners that should not be rounded.
 *
 * @param referenceElement The ref of the element the menu is visually attached to
 * @param menu The menu ref
 * @param opt (optional) of type {FloatingMenuOptions} to pass any overrides or similar
 */
export default function useFloatingMenu(
	referenceElement: Ref<MaybeElement<HTMLElement>>,
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	menu: Ref<InstanceType<typeof CdxMenu>|undefined>,
	opt?: FloatingMenuOptions
) : void {
	// typescript-eslint doesn't know that menu.value is a special Vue type (instance of CdxMenu).
	// These rules are disabled throughout the file when accessing properties of menu.value.
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	const menuIsExpanded = () => menu.value?.isExpanded();

	const middleware = [
		offset( opt?.offset ),
		size( {
			// Don't size the menu to take up exactly all of the available height, because that
			// makes it look like it's cut off. Instead, leave 16px of free space between the bottom
			// of the menu and the bottom edge of the viewport / scrollable container.
			padding: clipPadding,
			apply( { rects, elements, availableHeight, availableWidth } ) {
				Object.assign( elements.floating.style, {
					// Optionally use all available width
					// Else, set the width of the menu to match the width of the triggering element.
					// This is needed in Dialogs, when the menu's position is set relative to
					// the dialog, not the triggering element.
					width: `${ opt?.useAvailableWidth ? availableWidth : rects.reference.width }px`,
					// Set the max-height to the available height, to prevent the menu from
					// extending past the edge of the viewport or scrollable container. But don't
					// allow the menu to be shrunk to less than 128px; this is necessary to make
					// the flip() call below work.
					maxHeight: `${ Math.max( minClipHeight, availableHeight ) }px`
				} );
			}
		} ),
		// If there is not enough space to put the menu below the triggering element, put it above
		// it instead. Because of the maxHeight logic above, this happens when there is less than
		// 128px available below the triggering element.
		flip( {
			// Apply the same padding here as in size(), otherwise the gap between the bottom of
			// the menu and the bottom edge of the viewport is allowed to shrink to zero before the
			// menu flips.
			padding: clipPadding,
			fallbackStrategy: 'initialPlacement'
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

	const { floatingStyles, placement, middlewareData, update } = useFloating(
		referenceElement,
		menu as Ref<ComponentPublicInstance>,
		{ placement: opt?.placement ?? 'bottom', middleware }
	);

	// Compute the value of the `visibility` CSS property for the menu.
	// This allows us to visually hide the menu when it should no longer be visible. We set
	// `visibility: hidden` when...
	// - The menu is closed (not necessary to visually hide the menu, since we handle that with
	//   v-show, but having `display: none` and `visibility: visible` just doesn't make sense)
	// - The hide middleware has set either `escaped` or `referenceHidden` to true (see above)
	const menuVisibility = computed( () => {
		const isHidden = !menuIsExpanded() ||
			!!middlewareData.value.hide?.escaped || middlewareData.value.hide?.referenceHidden;
		return isHidden ? 'hidden' : 'visible';
	} );

	// When floatingStyles change, set CSS values.
	watch(
		[ floatingStyles, menuVisibility, placement ],
		( [ newStyles, newVisibility, newPlacement ] ) => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			Object.assign( menu.value?.$el.style ?? {}, {
				visibility: newVisibility,
				position: newStyles.position,
				top: `${ newStyles.top }px`,
				// `left: 0` is set in the Menu component, which gets transformed to `right: 0` for
				// RTL. For this component, we must unset `right: 0`, because the transform value
				// is relative to the left side of the screen regardless of reading direction.
				right: 'unset',
				// Set `left` value to ensure the menu is translated relative to the left side of
				// the screen, which is what FloatingUI expects when it calculates the translate-x
				// value for both LTR and RTL.
				left: `${ newStyles.left }px`,
				// If menuWidth is specified, transform shifts negative, for now ignore that
				transform: newStyles.transform ?? 'none',
				// Zero out border-radius on the corners of the menu where it touches the reference
				// element. Which corners these are depends on whether the menu is flipped
				borderTopLeftRadius: newPlacement === 'bottom' && newVisibility === 'visible' ? '0' : '',
				borderTopRightRadius: newPlacement === 'bottom' && newVisibility === 'visible' ? '0' : '',
				borderBottomLeftRadius: newPlacement === 'top' && newVisibility === 'visible' ? '0' : '',
				borderBottomRightRadius: newPlacement === 'top' && newVisibility === 'visible' ? '0' : ''
			} satisfies Partial<CSSStyleDeclaration> );

			Object.assign( unwrapElement( referenceElement.value )?.style ?? {}, {
				// Zero out border-radius on the corners of the reference element where it touches
				// the menu. Which corners these are depends on whether the menu is flipped
				borderTopLeftRadius: newPlacement === 'top' && newVisibility === 'visible' ? '0' : '',
				borderTopRightRadius: newPlacement === 'top' && newVisibility === 'visible' ? '0' : '',
				borderBottomLeftRadius: newPlacement === 'bottom' && newVisibility === 'visible' ? '0' : '',
				borderBottomRightRadius: newPlacement === 'bottom' && newVisibility === 'visible' ? '0' : ''
			} satisfies Partial<CSSStyleDeclaration> );
		}
	);

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
