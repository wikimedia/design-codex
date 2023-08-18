import { VNode, SetupContext, Slot } from 'vue';
import useSlotContents from './useSlotContents';
import useWarnOnce from './useWarnOnce';

/**
 * Warn the developer if a label has not been provided.
 *
 * This covers 3 ways the developer could add a label:
 * - Via slot contents, e.g. the default slot of the Checkbox component
 * - Via an `aria-label` attribute
 * - Via an `aria-labelledby` attribute
 *
 * If none of these have been provided, a warning is thrown. It is possible the developer could use
 * the id of the input as the value of a `for` attribute of a label, but we cannot detect this.
 * Thus, we throw a warning instead of an error.
 *
 * Note that this only runs once when the setup function runs, not when slots or attributes change.
 *
 * @param slot The slot where label text is added
 * @param attrs Attributes from context
 * @param componentName Name of the component, to be used in the warning message
 */
export default function useLabelChecker(
	slot: Slot | VNode[] | undefined,
	attrs: SetupContext[ 'attrs' ],
	componentName: string
) {
	useWarnOnce(
		() => useSlotContents( slot ).length === 0 &&
			!attrs?.[ 'aria-label' ] && !attrs?.[ 'aria-labelledby' ],
		`${componentName}: Inputs must have an associated label. Provide one of the following:
 - A label via the appropriate slot
 - An \`aria-label\` attribute set to the label text
 - An \`aria-labelledby\` attribute set to the ID of the label element`
	);
}
