/**
 * Calculate the width of the browser's vertical scrollbar.
 *
 * Using window.innerWidth can be thrown off by horizontal overflow on the page,
 * so measure using a temporary element instead.
 *
 * @return {number} Scrollbar width in pixels
 */
export function getScrollbarWidth(): number {
	const root = document.documentElement;

	// If there's no vertical overflow, no scrollbar is visible.
	if ( root.scrollHeight <= root.clientHeight ) {
		return 0;
	}

	const measurement = document.createElement( 'div' );
	measurement.style.position = 'absolute';
	measurement.style.top = '-9999px';
	measurement.style.width = '100px';
	measurement.style.height = '100px';
	measurement.style.overflow = 'scroll';

	document.body.appendChild( measurement );
	const scrollbarWidth = measurement.offsetWidth - measurement.clientWidth;
	document.body.removeChild( measurement );

	return scrollbarWidth;
}
