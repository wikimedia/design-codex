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

		it( 'shows action button when actionButton prop is set', () => {
			const wrapper = mountDisplay( { actionButton: 'Undo' } );
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
			jest.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: false } );
			jest.advanceTimersByTime( 10000 );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			jest.useRealTimers();
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
			jest.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: 100 } );
			jest.advanceTimersByTime( 150 );
			expect( wrapper.vm.leaveActiveClass ).toBe( 'cdx-toast-leave-active-system' );
			jest.useRealTimers();
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
			jest.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: 100 } );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			jest.advanceTimersByTime( 150 );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			jest.useRealTimers();
			wrapper.unmount();
		} );

		it( 'uses default 4000ms when autoDismiss is true', () => {
			jest.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: true } );
			jest.advanceTimersByTime( 3500 );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			jest.advanceTimersByTime( 500 );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			jest.useRealTimers();
			wrapper.unmount();
		} );
	} );

	describe( 'action button', () => {
		it( 'emits action-button-click when action button is clicked', async () => {
			const wrapper = mountDisplay( { actionButton: 'Undo' } );
			await wrapper.find( '.cdx-message__action-button' ).trigger( 'click' );
			expect( wrapper.emitted( 'action-button-click' ) ).toHaveLength( 1 );
			wrapper.unmount();
		} );
	} );

	describe( 'hover pause', () => {
		it( 'pauses auto-dismiss on mouseenter and resumes on mouseleave', async () => {
			jest.useFakeTimers();
			const wrapper = mountDisplay( { autoDismiss: 200 } );
			await wrapper.find( '.cdx-toast' ).trigger( 'mouseenter' );
			jest.advanceTimersByTime( 300 );
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			await wrapper.find( '.cdx-toast' ).trigger( 'mouseleave' );
			jest.advanceTimersByTime( 250 );
			wrapper.vm.onAfterLeave();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			jest.useRealTimers();
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
			jest.useFakeTimers();
			isUserTouchingToastRef.value = false;
			const wrapper = mountDisplay( { autoDismiss: 200 } );
			await nextTick();
			isUserTouchingToastRef.value = true;
			jest.advanceTimersByTime( 300 );
			await nextTick();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toBeFalsy();
			isUserTouchingToastRef.value = false;
			await nextTick();
			jest.advanceTimersByTime( 250 );
			await nextTick();
			wrapper.vm.onAfterLeave();
			await nextTick();
			expect( wrapper.emitted( 'auto-dismissed' ) ).toHaveLength( 1 );
			jest.useRealTimers();
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
	} );
} );
