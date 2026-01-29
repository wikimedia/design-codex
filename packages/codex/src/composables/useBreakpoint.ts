import { onMounted, onUnmounted, reactive } from 'vue';

/**
 * Breakpoint values matching Codex design tokens (min-width-breakpoint-*).
 * Mobile uses max-width: 639px; tablet 640px; desktop 1120px; desktop-wide 1680px.
 */
const BREAKPOINTS = {
	mobileMax: 639,
	tabletMin: 640,
	desktopMin: 1120,
	desktopWideMin: 1680
} as const;

export interface BreakpointMatch {
	mobile: boolean;
	tablet: boolean;
	desktop: boolean;
	'desktop-wide': boolean;
}

/**
 * Composable to detect which breakpoint(s) the current viewport matches.
 * Returns a reactive object that updates when the window is resized.
 *
 * @return Reactive object with boolean flags: mobile, tablet, desktop, 'desktop-wide'
 */
export default function useBreakpoint(): BreakpointMatch {
	const match = reactive<BreakpointMatch>( {
		mobile: false,
		tablet: false,
		desktop: false,
		'desktop-wide': false
	} );

	function checkBreakpoints() {
		if ( typeof window !== 'object' ) {
			return;
		}
		const width = window.innerWidth;
		match.mobile = width <= BREAKPOINTS.mobileMax;
		match.tablet = width >= BREAKPOINTS.tabletMin && width < BREAKPOINTS.desktopMin;
		match.desktop = width >= BREAKPOINTS.desktopMin && width < BREAKPOINTS.desktopWideMin;
		match[ 'desktop-wide' ] = width >= BREAKPOINTS.desktopWideMin;
	}

	onMounted( () => {
		checkBreakpoints();
		window.addEventListener( 'resize', checkBreakpoints );
	} );

	onUnmounted( () => {
		window.removeEventListener( 'resize', checkBreakpoints );
	} );

	return match;
}
