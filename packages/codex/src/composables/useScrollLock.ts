import { watch, onBeforeUnmount, type Ref } from 'vue';

import { getScrollbarWidth } from '../utils/scrollbarHelpers';

/**
 * @return True when the UA looks like iOS / iPadOS touch Safari.
 */
function shouldUseFixedBodyScrollLock(): boolean {
	if ( typeof navigator === 'undefined' ) {
		return false;
	}
	const ua = navigator.userAgent;
	return /iP(ad|hone|od)/.test( ua ) ||
		( navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 );
}

/**
 * Document scroll root. `document.scrollingElement` is absent on very old WebKit (e.g. iOS 8).
 *
 * @return Element that holds the main document scroll
 */
function getScrollRoot(): HTMLElement {
	if ( 'scrollingElement' in document && document.scrollingElement instanceof HTMLElement ) {
		return document.scrollingElement;
	}
	return document.documentElement;
}

/**
 * Lock document scroll behind overlays: `body` overflow, optional scrollbar compensation,
 * and on iOS-style WebKit a fixed-body freeze with scroll position restore on unlock.
 *
 * @param isActive - When true, scroll is locked
 */
export default function useScrollLock( isActive: Ref<boolean> ) {
	let savedScrollX = 0;
	let savedScrollY = 0;
	let appliedFixedScrollLock = false;

	function lockBodyScroll() {
		const body = document.body;
		const scrollRoot = getScrollRoot();

		if ( shouldUseFixedBodyScrollLock() ) {
			savedScrollX = scrollRoot.scrollLeft;
			savedScrollY = scrollRoot.scrollTop;
			appliedFixedScrollLock = true;
			body.style.position = 'fixed';
			body.style.top = `-${ savedScrollY }px`;
			body.style.left = '0';
			body.style.right = '0';
			body.style.width = '100%';
		} else {
			appliedFixedScrollLock = false;
		}

		const scrollbarWidth = getScrollbarWidth();

		if ( scrollbarWidth > 0 ) {
			body.style.paddingRight = `${ scrollbarWidth }px`;
		}

		body.style.overflow = 'hidden';
	}

	function unlockBodyScroll() {
		const body = document.body;
		const scrollRoot = getScrollRoot();

		body.style.removeProperty( 'overflow' );
		body.style.removeProperty( 'padding-right' );

		if ( appliedFixedScrollLock ) {
			const restoreX = savedScrollX;
			const restoreY = savedScrollY;
			appliedFixedScrollLock = false;

			body.style.removeProperty( 'position' );
			body.style.removeProperty( 'top' );
			body.style.removeProperty( 'left' );
			body.style.removeProperty( 'right' );
			body.style.removeProperty( 'width' );

			window.requestAnimationFrame( () => {
				scrollRoot.scrollLeft = restoreX;
				scrollRoot.scrollTop = restoreY;
			} );
		}
	}

	watch( isActive, ( active ) => {
		if ( active ) {
			lockBodyScroll();
		} else {
			unlockBodyScroll();
		}
	}, { immediate: true } );

	onBeforeUnmount( () => {
		if ( isActive.value ) {
			unlockBodyScroll();
		}
	} );
}
