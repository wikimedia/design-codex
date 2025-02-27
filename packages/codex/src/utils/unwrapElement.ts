// Helper function inspired on the function with the same name in @floating-ui/vue (sadly it's
// not exported by @floating-ui/vue)

import { MaybeElement } from '@floating-ui/vue';

/**
 * Unwraps the component instance (if needed) and returns the element.
 *
 * @param element
 *
 * @return {element}
 */
export function unwrapElement<T extends Element>( element: MaybeElement<T> ): T | null | undefined {
	return element && '$el' in element ? element.$el as T : element;
}
