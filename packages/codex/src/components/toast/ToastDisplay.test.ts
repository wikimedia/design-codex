import CdxToastDisplay from './ToastDisplay.vue';
import { isUserTouchingToastRef } from './toast.store';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';

/**
 * Mount ToastDisplay in place so we don't need a teleport target.
 *
 * @param props - Props to pass to the component
 * @param slots - Default slot content
 * @return VueWrapper
 */
function mountDisplay( props = {}, slots = { default: 'Toast content' } ) {
	return mount( CdxToastDisplay, {
		props: { renderInPlace: true, ...props },
		slots,
		attachTo: document.body
	} );
}

describe( 'ToastDisplay', () => {
	afterEach( () => {
		document.body.innerHTML = '';
	} );

	describe( 'rendering', () => {
		it( 'renders slot content and applies type class', () => {
			const wrapper = mountDisplay( { type: 'success' } );
			expect( wrapper.find( '.cdx-toast' ).exists() ).toBe( true );
			expect( wrapper.find( '.cdx-toast--success' ).exists() ).toBe( true );
			expect( wrapper.text() ).toContain( 'Toast content' );
			wrapper.unmount();
		} );

		it( 'shows dismiss button by default', () => {
			const wrapper = mountDisplay();
			expect( wrapper.find( '.cdx-message__dismiss-button' ).exists() ).toBe( true );
			wrapper.unmount();
		} );

		it( 'hides dismiss button when preventUserDismiss is true', () => {
			const wrapper = mountDisplay( { preventUserDismiss: true } );
			expect( wrapper.find( '.cdx-message__dismiss-button' ).exists() ).toBe( false );
			wrapper.unmount();
		} );

		it( 'shows action button when actionButtonLabel prop is set', () => {
			const wrapper = mountDisplay( { actionButtonLabel: 'Undo' } );
			const btn = wrapper.find( '.cdx-message__action-button' );
			expect( btn.exists() ).toBe( true );
			expect( btn.text() ).toContain( 'Undo' );
			wrapper.unmount();
		} );

		it( 'uses target prop for teleport when provided', () => {
			const targetEl = document.createElement( 'div' );
			targetEl.id = 'toast-target';
			document.body.appendChild( targetEl );

			const wrapper = mount( CdxToastDisplay, {
				props: { target: '#toast-target', renderInPlace: false },
				slots: { default: 'Teleported' },
				attachTo: document.body
			} );
			expect( targetEl.querySelector( '.cdx-toast' )?.textContent ).toContain( 'Teleported' );
			document.body.removeChild( targetEl );
			wrapper.unmount();
		} );

		it( 'does not auto-dismiss when autoDismiss is false', () => {
			vi.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: false } );
			vi.advanceTimersByTime( 10000 );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			vi.useRealTimers();
			wrapper.unmount();
		} );
	} );

	describe( 'user dismissal', () => {
		it( 'emits user-dismissed after leave when dismiss button is clicked', async () => {
			const wrapper = mountDisplay();
			await wrapper.find( '.cdx-message__dismiss-button' ).trigger( 'click' );
			expect( wrapper.emitted( 'user-dismissed' ) ).toBeFalsy();
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
			wrapper.unmount();
		} );

		it( 'emits user-dismissed after leave when ESC is pressed', async () => {
			const wrapper = mountDisplay();
			await wrapper.find( '.cdx-toast' ).trigger( 'keydown.esc' );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
			wrapper.unmount();
		} );

		it( 'does not emit twice when already dismissed', () => {
			const wrapper = mountDisplay();
			wrapper.vm.onDismiss( 'user-dismissed' );
			wrapper.vm.onDismiss( 'user-dismissed' );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
			wrapper.unmount();
		} );

		it( 'sets leaveActiveClass to user variant for user-dismissed', () => {
			const wrapper = mountDisplay();
			wrapper.vm.onDismiss( 'user-dismissed' );
			expect( wrapper.vm.leaveActiveClass ).toBe( 'cdx-toast-leave-active-user' );
			wrapper.unmount();
		} );

		it( 'sets leaveActiveClass to system variant for auto-dismissed', () => {
			vi.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: 100 } );
			vi.advanceTimersByTime( 150 );
			expect( wrapper.vm.leaveActiveClass ).toBe( 'cdx-toast-leave-active-system' );
			vi.useRealTimers();
			wrapper.unmount();
		} );

		it( 'does not emit when leave transition ends with no pending dismiss', () => {
			const wrapper = mountDisplay();
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'user-dismissed' ) ).toBeFalsy();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			wrapper.unmount();
		} );
	} );

	describe( 'auto dismissal', () => {
		it( 'emits auto-dismissed after timeout once leave transition finishes', () => {
			vi.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: 100 } );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			vi.advanceTimersByTime( 150 );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			vi.useRealTimers();
			wrapper.unmount();
		} );

		it( 'uses default 4000ms when autoDismiss is true', () => {
			vi.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: true } );
			vi.advanceTimersByTime( 3500 );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			vi.advanceTimersByTime( 500 );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			vi.useRealTimers();
			wrapper.unmount();
		} );
	} );

	describe( 'action button', () => {
		it( 'emits action-button-click when action button is clicked', async () => {
			const wrapper = mountDisplay( { actionButtonLabel: 'Undo' } );
			await wrapper.find( '.cdx-message__action-button' ).trigger( 'click' );
			expect( wrapper.emitted( 'action-button-click' ) ).toHaveLength( 1 );
			wrapper.unmount();
		} );
	} );

	describe( 'hover pause', () => {
		it( 'pauses auto-dismiss on mouseenter and resumes on mouseleave', async () => {
			vi.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: 200 } );
			await wrapper.find( '.cdx-toast' ).trigger( 'mouseenter' );
			vi.advanceTimersByTime( 300 );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			await wrapper.find( '.cdx-toast' ).trigger( 'mouseleave' );
			vi.advanceTimersByTime( 250 );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			vi.useRealTimers();
			wrapper.unmount();
		} );

		it( 'mouseleave does nothing when toast has no auto-dismiss timer', async () => {
			const wrapper = mountDisplay( { autoDismiss: false } );
			await wrapper.find( '.cdx-toast' ).trigger( 'mouseleave' );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			wrapper.unmount();
		} );
	} );

	describe( 'touch pause and watcher', () => {
		it( 'does not auto-dismiss while user is touching and restarts timer when touch ends', async () => {
			vi.useFakeTimers();
			isUserTouchingToastRef.value = false;
			const wrapper = mountDisplay( { autoDismiss: 200 } );
			await nextTick();
			isUserTouchingToastRef.value = true;
			vi.advanceTimersByTime( 300 );
			await nextTick();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			isUserTouchingToastRef.value = false;
			await nextTick();
			vi.advanceTimersByTime( 250 );
			await nextTick();
			wrapper.vm.onAfterLeave();
			await nextTick();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			vi.useRealTimers();
			isUserTouchingToastRef.value = false;
			wrapper.unmount();
		} );
	} );

	describe( 'focus', () => {
		it( 'focuses the toast element when mounted', async () => {
			const wrapper = mountDisplay();
			await nextTick();
			expect( document.activeElement ).toBe( wrapper.find( '.cdx-toast' ).element );
			wrapper.unmount();
		} );
	} );

	describe( 'swipe-to-dismiss', () => {
		/**
		 * Dispatch a touch event on the element. JSDOM may not have TouchEvent;
		 * use a plain Event with touches attached so the handler can read clientX.
		 *
		 * @param el
		 * @param type
		 * @param clientX
		 * @param clientY
		 * @return {void}
		 */
		function dispatchTouchEvent(
			el: HTMLElement,
			type: string,
			clientX: number,
			clientY = 0
		): void {
			const ev = new Event( type, { bubbles: true } );
			( ev as unknown as { touches: { clientX: number; clientY: number }[] } ).touches = [
				{ clientX, clientY }
			];
			el.dispatchEvent( ev );
		}

		it( 'emits user-dismissed when swipe exceeds threshold', () => {
			const wrapper = mountDisplay();
			const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
			Object.defineProperty( el, 'offsetWidth', { value: 300, configurable: true } );
			dispatchTouchEvent( el, 'touchstart', 100 );
			dispatchTouchEvent( el, 'touchmove', 250 );
			dispatchTouchEvent( el, 'touchend', 250 );
			el.dispatchEvent( new Event( 'transitionend', { bubbles: true } ) );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
			wrapper.unmount();
		} );

		it( 'snaps back when swipe is below threshold', () => {
			const wrapper = mountDisplay();
			const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
			Object.defineProperty( el, 'offsetWidth', { value: 300, configurable: true } );
			dispatchTouchEvent( el, 'touchstart', 100 );
			dispatchTouchEvent( el, 'touchmove', 120 );
			dispatchTouchEvent( el, 'touchend', 120 );
			expect( wrapper.emitted( 'user-dismissed' ) ).toBeFalsy();
			el.dispatchEvent( new Event( 'transitionend', { bubbles: true } ) );
			wrapper.unmount();
		} );

		it( 'touchcancel snaps back and clears touch state', () => {
			const wrapper = mountDisplay();
			const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
			Object.defineProperty( el, 'offsetWidth', { value: 300, configurable: true } );
			dispatchTouchEvent( el, 'touchstart', 100 );
			dispatchTouchEvent( el, 'touchcancel', 100 );
			expect( wrapper.emitted( 'user-dismissed' ) ).toBeFalsy();
			wrapper.unmount();
		} );

		it( 'ignores touches once the swipe has committed the dismissal', () => {
			vi.useFakeTimers();
			try {
				const wrapper = mountDisplay();
				const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
				Object.defineProperty( el, 'offsetWidth', { value: 300, configurable: true } );

				// Gesture 1 passes the threshold, committing the dismissal.
				dispatchTouchEvent( el, 'touchstart', 100 );
				dispatchTouchEvent( el, 'touchmove', 250 );
				dispatchTouchEvent( el, 'touchend', 250 );
				const committedTransform = el.style.transform;
				expect( committedTransform ).not.toBe( '' );
				expect( wrapper.vm.dismissed ).toBe( false );
				expect( vi.getTimerCount() ).toBe( 1 );

				// Gesture 2 lands while the slide-out is running and is released below the
				// threshold. It must not drag the toast back or cancel the dismissal.
				dispatchTouchEvent( el, 'touchstart', 100 );
				dispatchTouchEvent( el, 'touchmove', 120 );
				dispatchTouchEvent( el, 'touchend', 120 );

				expect( wrapper.vm.dismissed ).toBe( false );
				expect( vi.getTimerCount() ).toBe( 1 );
				expect( el.style.transform ).toBe( committedTransform );
				expect( el.style.opacity ).toBe( '0' );

				// The committed dismissal still completes once the transition ends.
				el.dispatchEvent( new Event( 'transitionend', { bubbles: true } ) );
				expect( wrapper.vm.dismissed ).toBe( true );
				expect( vi.getTimerCount() ).toBe( 0 );

				wrapper.vm.onAfterLeave();
				expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
				wrapper.unmount();
			} finally {
				vi.useRealTimers();
			}
		} );

		it( 'ignores touches while the dismissed toast is leaving', () => {
			vi.useFakeTimers();
			try {
				const wrapper = mountDisplay();
				const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
				Object.defineProperty( el, 'offsetWidth', { value: 300, configurable: true } );

				dispatchTouchEvent( el, 'touchstart', 100 );
				dispatchTouchEvent( el, 'touchmove', 250 );
				dispatchTouchEvent( el, 'touchend', 250 );
				const committedTransform = el.style.transform;

				// The transition ends and the dismissal completes, but Vue keeps the element
				// in the DOM while the leave transition runs.
				el.dispatchEvent( new Event( 'transitionend', { bubbles: true } ) );
				expect( wrapper.vm.dismissed ).toBe( true );
				expect( vi.getTimerCount() ).toBe( 0 );

				// A touch in that window must not drag the dismissed toast back into view.
				dispatchTouchEvent( el, 'touchstart', 100 );
				dispatchTouchEvent( el, 'touchmove', 120 );
				dispatchTouchEvent( el, 'touchend', 120 );

				expect( el.style.transform ).toBe( committedTransform );
				expect( el.style.opacity ).toBe( '0' );

				wrapper.vm.onAfterLeave();
				expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
				wrapper.unmount();
			} finally {
				vi.useRealTimers();
			}
		} );

		// JSDOM does not expand the `transition` shorthand, so the component sets the
		// slide-out transition as longhands; these tests read the applied duration from them.
		describe( 'when the transition is suppressed', () => {
			/**
			 * Swipe the toast far enough to dismiss it.
			 *
			 * @param el
			 * @return {void}
			 */
			function swipeToDismiss( el: HTMLElement ): void {
				Object.defineProperty( el, 'offsetWidth', { value: 300, configurable: true } );
				dispatchTouchEvent( el, 'touchstart', 100 );
				dispatchTouchEvent( el, 'touchmove', 250 );
				dispatchTouchEvent( el, 'touchend', 250 );
			}

			beforeEach( () => {
				vi.useFakeTimers();
			} );

			afterEach( () => {
				vi.useRealTimers();
			} );

			it( 'completes the dismissal once the fallback delay passes', async () => {
				const wrapper = mountDisplay();
				const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
				swipeToDismiss( el );

				// Read the duration the component actually applied.
				const appliedDuration = el.style.transitionDuration;
				const durationValue = parseFloat( appliedDuration );
				const slideOutMs = appliedDuration.endsWith( 'ms' ) ?
					durationValue :
					durationValue * 1000;
				expect( slideOutMs ).toBeGreaterThan( 0 );

				expect( wrapper.vm.dismissed ).toBe( false );

				vi.advanceTimersByTime( slideOutMs - 1 );
				expect( wrapper.vm.dismissed ).toBe( false );

				// No transitionend here, so only the fallback can dismiss it. The fallback has
				// a 100 ms grace past the slide-out: still pending at slide-out + 99 ms.
				vi.advanceTimersByTime( 100 );
				expect( wrapper.vm.dismissed ).toBe( false );

				vi.advanceTimersByTime( 1 );
				await nextTick();

				expect( wrapper.vm.dismissed ).toBe( true );
				expect( vi.getTimerCount() ).toBe( 0 );

				// Vue's leave transition does not run under JSDOM, so complete it the way
				// the surrounding tests do and assert the event the container listens for.
				wrapper.vm.onAfterLeave();
				expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
				wrapper.unmount();
			} );

			it( 'cancels the fallback once transitionend fires', async () => {
				const wrapper = mountDisplay();
				const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
				swipeToDismiss( el );

				expect( vi.getTimerCount() ).toBeGreaterThan( 0 );

				el.dispatchEvent( new Event( 'transitionend', { bubbles: true } ) );

				expect( vi.getTimerCount() ).toBe( 0 );
				await nextTick();
				expect( wrapper.vm.dismissed ).toBe( true );
				wrapper.unmount();
			} );

			it( 'cancels the fallback when the component unmounts', () => {
				const wrapper = mountDisplay();
				const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
				swipeToDismiss( el );

				expect( vi.getTimerCount() ).toBeGreaterThan( 0 );

				wrapper.unmount();

				// The swipe cleanup cleared the fallback, so it can no longer fire.
				expect( vi.getTimerCount() ).toBe( 0 );
			} );

			it( 'dismisses immediately when the computed duration is 0', () => {
				const style = document.createElement( 'style' );
				style.textContent = '* { transition-duration: 0s !important; }';
				document.head.appendChild( style );

				try {
					const wrapper = mountDisplay();
					const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
					swipeToDismiss( el );

					// The suppressed transition never fires, so the dismissal is not deferred.
					expect( wrapper.vm.dismissed ).toBe( true );
					expect( vi.getTimerCount() ).toBe( 0 );

					wrapper.vm.onAfterLeave();
					expect( wrapper.emitted( 'user-dismissed' ) ).toHaveLength( 1 );
					wrapper.unmount();
				} finally {
					style.remove();
				}
			} );

			it( 'waits for the fallback when only one listed duration is 0', () => {
				const style = document.createElement( 'style' );
				style.textContent = '.cdx-toast { transition-duration: 0s, 0.25s !important; }';
				document.head.appendChild( style );

				try {
					const wrapper = mountDisplay();
					const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
					swipeToDismiss( el );

					// One transition still runs, so its event (or the fallback) is still the
					// completion path; the fast path must not treat this as suppressed.
					expect( wrapper.vm.dismissed ).toBe( false );
					expect( vi.getTimerCount() ).toBe( 1 );
					wrapper.unmount();
				} finally {
					style.remove();
				}
			} );

			it( 'ignores a transitionend bubbling from slotted content', () => {
				const wrapper = mountDisplay( {}, {
					default: '<button class="cdx-test-slot-button">Action</button>'
				} );
				const el = wrapper.find( '.cdx-toast' ).element as HTMLElement;
				// The slot's button renders inside the toast, so its event bubbles to the
				// toast's listener, which is not its own transition.
				const child = wrapper.find( '.cdx-test-slot-button' ).element;
				swipeToDismiss( el );

				expect( wrapper.vm.dismissed ).toBe( false );

				child.dispatchEvent( new Event( 'transitionend', { bubbles: true } ) );

				expect( wrapper.vm.dismissed ).toBe( false );
				expect( vi.getTimerCount() ).toBe( 1 );

				// The toast's own transition ending still completes the dismissal.
				el.dispatchEvent( new Event( 'transitionend', { bubbles: true } ) );
				expect( wrapper.vm.dismissed ).toBe( true );
				wrapper.unmount();
			} );
		} );
	} );
} );
