import { ref, Ref, onMounted, onUnmounted } from 'vue';

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

	let observer: IntersectionObserver;

	onMounted( () => {
		if ( templateRef.value ) {
			observer = new window.IntersectionObserver(
				( entries: IntersectionObserverEntry[] ) => {
					const entry = entries[ 0 ];
					if ( entry ) {
						intersectionRef.value = entry.isIntersecting;
					}
				},
				observerOptions
			);

			observer.observe( templateRef.value );
		}
	} );

	onUnmounted( () => {
		if ( observer ) {
			observer.disconnect();
		}
	} );

	return intersectionRef;
}
