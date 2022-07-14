import { useRoute } from 'vitepress';
import toKebabCase from '../utils/toKebabCase';

/**
 * Composable for detecting the name of the component currently being demonstrated, extracted
 * from the page route and converted to the form `cdx-*` and kebab case.
 *
 * @return Component name
 */
export default function useCurrentComponentName() : string {
	const route = useRoute();
	return 'cdx-' + toKebabCase( route.data.title );
}
