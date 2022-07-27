import { Slot, VNode } from 'vue';
import { flattenSlotContents } from '../utils/slotContents';

/**
 * Extract the "interesting" contents from the nested VNode structure returned by a slot function.
 *
 * This function removes comments (including v-if placeholders) and unwraps fragments and other
 * things causing a nested structure. It returns a flat array of strings (representing loose text)
 * or VNodes (representing components or HTML tags).
 *
 * This function should be used in code that programmatically analyzes the contents of a slot, to
 * make it resilient against extra VNodes added by comments, or extra levels of wrapping added when
 * the caller uses v-for or <slot> tags to generate the contents of a slot.
 *
 * @param slot Slot contents, obtained with `slots.foo?.()`. For convenience, Slot objects
 *  are also accepted, so that passing `slots.foo` works too.
 * @return Flat array of text (strings) and components/HTML tags (VNodes)
 */
export default function useSlotContents( slot: Slot | VNode[] | undefined ): ( VNode | string )[] {
	const slotContents = typeof slot === 'function' ? slot() : slot;
	return slotContents ? flattenSlotContents( slotContents ) : [];
}
