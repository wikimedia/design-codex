import { ref, onMounted, Ref } from 'vue';

/**
 * Composable for detecting the language of the context surrounding a component.
 * For example, if the component is wrapped in <div lang="ar">...</div>, this composable
 * detects that and returns 'ar'.
 *
 * The value returned by this composable will initially be null, and will then
 * update to the detected language later, when the component mounts. This is
 * because detecting the language is not possible until the component has been
 * mounted. Code using this composable should anticipate this, and check whether
 * the value is null.
 *
 * @param root Template ref for the root element of the component
 * @return The detected language code, or null if the component hasn't been mounted yet.
 */
export default function useComputedLanguage(
	root: Ref<HTMLElement | undefined>
) : Ref<string | null> {
	const computedLang = ref<string | null>( '' );
	onMounted( () => {
		// There's no CSS property for language, so we can't use getComputedStyle().
		// Instead, traverse up the tree until we find an ancestor with the 'lang' attribute set
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		let ancestor : HTMLElement | null = root.value!;
		while ( ancestor && ancestor.lang === '' ) {
			ancestor = ancestor.parentElement;
		}
		computedLang.value = ancestor ? ancestor.lang : null;
	} );
	return computedLang;
}
