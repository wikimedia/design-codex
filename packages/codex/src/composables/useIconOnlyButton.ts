import { computed, ComputedRef, SetupContext, Slot } from 'vue';
import useSlotContents from './useSlotContents';
import useWarnOnce from './useWarnOnce';
import { isComponentVNode, isTagVNode } from '../utils/slotContents';

/**
 * Determine whether a button is an icon-only button.
 *
 * This returns a computed property that is true if the only contents of the button's default slot
 * are a single CdxIcon component or `<svg>` element, and false otherwise.
 *
 * If the button is icon-only but does not have either the aria-label or aria-hidden attribute set,
 * this function will emit a warning.
 *
 * @param slot Slot object (e.g. `slots.default`)
 * @param attrs Attributes passed to the button
 * @param componentName Name of the component
 * @return Whether the button contents are only an icon
 */
export default function useIconOnlyButton(
	slot: Slot | undefined,
	attrs: SetupContext['attrs'],
	componentName: string
): ComputedRef<boolean> {
	const isIconOnly = computed( () => {
		const slotContents = useSlotContents( slot );
		if ( slotContents.length !== 1 ) {
			return false;
		}
		const soleNode = slotContents[ 0 ];
		if (
			typeof soleNode === 'object' && (
				isComponentVNode( soleNode, 'CdxIcon' ) ||
				isTagVNode( soleNode, 'svg' )
			)
		) {
			return true;
		}
		return false;
	} );

	// Emit a warning if this button is an icon-only button without the aria-label or
	// aria-hidden attribute set, but do this only once per button
	useWarnOnce(
		() => isIconOnly.value && !attrs[ 'aria-label' ] && !attrs[ 'aria-hidden' ],
		`${componentName}: Icon-only buttons require one of the following attributes: aria-label or aria-hidden. ` +
			'See documentation at https://doc.wikimedia.org/codex/latest/components/demos/button.html#icon-only-button'
	);

	return isIconOnly;
}
