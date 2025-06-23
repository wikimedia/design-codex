import { ref, Ref, onMounted, onUnmounted, watch } from 'vue';
import { BoxDimensions } from '../types';

/**
 * Sets up a basic ResizeObserver which attaches to the provided template ref
 * when the component is mounted. Returns a ref whose value is an object
 * containing current "width" and "height" properties.
 *
 * @param templateRef
 * @return ref with "width" and "height" properties
 */
export default function useResizeObserver(
	templateRef: Ref<Element|undefined>
) : Ref<BoxDimensions> {
	// Set up the empty dimensions ref
	const currentDimensions = ref<BoxDimensions>(
		{ width: undefined, height: undefined }
	);

	// Exit early if we are not running in a browser,
	// or if ResizeObserver is not supported
	if (
		typeof window !== 'object' ||
		!( 'ResizeObserver' in window ) ||
		!( 'ResizeObserverEntry' in window )
	) {
		return currentDimensions;
	}

	// Set up the ResizeObserver
	const observer = new window.ResizeObserver(
		( entries: ResizeObserverEntry[] ) => {
			const entry = entries?.[ 0 ];

			/**
			 * When writing direction is horizontal, inlineSize corresponds to
			 * width and blockSize corresponds to height. In vertical-direction
			 * layouts, these are reversed. For now this composable only
			 * supports horizontal directionality.
			 */
			if ( entry ) {
				currentDimensions.value = {
					width: entry.borderBoxSize?.[ 0 ].inlineSize,
					height: entry.borderBoxSize?.[ 0 ].blockSize
				};
			}
		}
	);

	let mounted = false;

	onMounted( () => {
		mounted = true;
		if ( templateRef.value ) {
			observer.observe( templateRef.value );
		}
	} );

	onUnmounted( () => {
		mounted = false;
		observer.disconnect();
	} );

	// If the templateRef changes to point to a different element, disconnect the observer from the
	// old element and observe the new one instead
	watch( templateRef, ( newElement ) => {
		// Don't try to observe the element before the component has been mounted; doing that leads
		// to strange bugs.
		if ( !mounted ) {
			return;
		}
		observer.disconnect();

		// Reset the current width and height value and observe the new element
		currentDimensions.value = {
			width: undefined,
			height: undefined
		};

		if ( newElement ) {
			observer.observe( newElement );
		}
	} );

	return currentDimensions;
}
