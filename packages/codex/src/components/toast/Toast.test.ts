import { Icon, cdxIconArticle } from '@wikimedia/codex-icons';
import { defineComponent, ref } from 'vue';

import CdxToast from './Toast.vue';
import CdxToastDisplay from './ToastDisplay.vue';
import { StatusType } from '../../types';
import { StatusTypes } from '../../constants';
import { mount, type VueWrapper } from '@vue/test-utils';
import { contentRefsById, toastStore } from './toast.store';

/** Props so Toast renders display mode (standalone + renderInPlace for tests). */
const standaloneDisplayProps = { standalone: true, renderInPlace: true };

/**
 * In JSDOM, CSS transitions do not run, so Vue's Transition never fires after-leave and
 * the toast never emits user-dismissed/auto-dismissed. Simulate the transition end so
 * tests can assert on the emitted events without waiting for real time.
 *
 * @param wrapper - Mounted component wrapper that contains the toast
 */
function simulateToastLeaveEnd( wrapper: VueWrapper ): void {
	const display = wrapper.findComponent( CdxToastDisplay );
	if ( display.exists() ) {
		display.vm.onAfterLeave();
	}
}

describe( 'Toast', () => {
	afterEach( () => {
		jest.useRealTimers();
		toastStore.toasts.splice( 0 );
		contentRefsById.clear();
		document.body.innerHTML = '';
	} );

	describe( 'snapshots', () => {
		type Case = [
			msg: string,
			props: {
				type?: StatusType,
				actionButton?: string,
				preventUserDismiss?: boolean,
				icon?: Icon,
				autoDismiss?: boolean
			},
			slot: string
		];

		const cases: Case[] = [
			[ 'Default props', {}, '<p>Toast content</p>' ],
			...StatusTypes.map( ( type ) : Case => [
				`${ type } toast`,
				{ type },
				'<p>Toast content</p>'
			] ),
			[ 'With action button', { actionButton: 'Undo' }, '<p>Toast content</p>' ],
			[ 'Dismissable', {}, '<p>Toast content</p>' ],
			[ 'Not dismissable', { preventUserDismiss: true }, '<p>Toast content</p>' ],
			[ 'Custom icon', { icon: cdxIconArticle }, '<p>Toast content</p>' ],
			[ 'Auto-dismiss disabled', { autoDismiss: false }, '<p>Toast content</p>' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
			const wrapper = mount( CdxToast, {
				props: { ...props, ...standaloneDisplayProps },
				slots: { default: slot },
				attachTo: document.body
			} );
			// Snapshot the toast DOM: wrapper.element is the Teleport placeholder (comment),
			// so we snapshot the actual .cdx-toast element rendered in place.
			expect( wrapper.find( '.cdx-toast' ).element ).toMatchSnapshot();
			wrapper.unmount();
		} );
	} );

	describe( 'standalone mode', () => {
		it( 're-emits user-dismissed when dismiss button is clicked', async () => {
			const wrapper = mount( CdxToast, {
				props: { ...standaloneDisplayProps },
				attachTo: document.body
			} );
			await wrapper.find( '.cdx-message__dismiss-button' ).trigger( 'click' );
			simulateToastLeaveEnd( wrapper );
			expect( wrapper.emitted()[ 'user-dismissed' ] ).toBeTruthy();
			wrapper.unmount();
		} );
	} );

	describe( 'placement (standalone)', () => {
		it( 'teleports to target element when target prop is set', async () => {
			const StandaloneWithTarget = defineComponent( {
				name: 'StandaloneWithTarget',
				template: `
					<div>
						<div id="toast-target"></div>
						<cdx-toast
							v-if="show"
							standalone
							target="#toast-target"
							type="notice"
						>
							Standalone toast
						</cdx-toast>
						<button class="show-btn" @click="show = true">Show</button>
					</div>
				`,
				components: { CdxToast },
				setup() {
					const show = ref( false );
					return { show };
				}
			} );
			const wrapper = mount( StandaloneWithTarget, { attachTo: document.body } );
			await wrapper.find( '.show-btn' ).trigger( 'click' );

			const target = document.getElementById( 'toast-target' );
			const toastInTarget = target?.querySelector( '.cdx-toast' );
			expect( target ).toBeTruthy();
			expect( toastInTarget ).toBeTruthy();
			expect( toastInTarget?.textContent ).toContain( 'Standalone toast' );
			wrapper.unmount();
		} );

		it( 'renders in place when renderInPlace is true', () => {
			const wrapper = mount( CdxToast, {
				props: standaloneDisplayProps,
				attachTo: document.body
			} );
			const toastInWrapper = wrapper.find( '.cdx-toast' );
			expect( toastInWrapper.exists() ).toBe( true );
			wrapper.unmount();
		} );
	} );
} );
