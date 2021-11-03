import { ref, onMounted, Ref } from 'vue';
import { HTMLDirection } from '../types';

/**
 * Composable for detecting the directionality of the context surrounding a component.
 * For example, if the component is wrapped in <div dir="rtl">...</div>, this composable
 * detects that and returns 'rtl'.
 *
 * The value returned by this composable will initially be null, and will then update to the
 * detected language code later, when the component mounts. This is because detecting the language
 * is not possible until the component has been mounted. Code using this composable should
 * anticipate this, and check whether the value is null.
 *
 * @param root Template ref for the root element of the component
 * @return The detected direction, or null if the component hasn't been mounted yet.
 */
export default function useComputedDirection(
	root: Ref<HTMLElement | undefined>
) : Ref<HTMLDirection | null> {
	const computedDir = ref<HTMLDirection | null>( null );
	onMounted( () => {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const dir = window.getComputedStyle( root.value! ).direction;
		computedDir.value = dir === 'ltr' || dir === 'rtl' ? dir : null;
	} );
	return computedDir;
}
