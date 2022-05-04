import { ref, Ref, onMounted, onUnmounted, watch } from 'vue';

/**
 * Sets up a basic IntersectionObserver which attaches to the provided
 * template ref when the component is mounted. Returns a boolean ref which
 * will update to match the current intersection status of the targeted
 * element. If IntersectionObserver is not available, the returned ref
 * will always be false.
 *
 * @param templateRef
 * @param observerOptions
 * @return boolean ref
 */
export default function useIntersectionObserver(
	templateRef: Ref<Element|undefined>,
	observerOptions: IntersectionObserverInit
): Ref<boolean> {
	const intersectionRef = ref( false );

	// Exit early if not running in a browser
	if ( typeof window !== 'object' ) {
		return intersectionRef;
	}

	// Exit early if any of the necessary features are not supported by the
	// user's browser.
	if ( !(
		'IntersectionObserver' in window &&
		'IntersectionObserverEntry' in window &&
		'intersectionRatio' in window.IntersectionObserverEntry.prototype
	) ) {
		return intersectionRef;
	}

	const observer = new window.IntersectionObserver(
		( entries: IntersectionObserverEntry[] ) => {
			const entry = entries[ 0 ];
			if ( entry ) {
				intersectionRef.value = entry.isIntersecting;
			}
		},
		observerOptions
	);

	onMounted( () => {
		if ( templateRef.value ) {
			observer.observe( templateRef.value );
		}
	} );

	onUnmounted( () => {
		observer.disconnect();
	} );

	// If the templateRef changes to point to a different element, disconnect the observer from the
	// old element and observe the new one instead
	watch( templateRef, ( newElement ) => {
		observer.disconnect();
		// Reset the ref back to false, just like when we initialized it. If newElement is set, the
		// observe callback will run and set the ref to true if newElement is visible.
		intersectionRef.value = false;
		if ( newElement ) {
			observer.observe( newElement );
		}
	} );

	return intersectionRef;
}
