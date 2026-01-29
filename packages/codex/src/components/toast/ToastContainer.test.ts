import { contentRefsById, isToastContainerInitialized, toastStore } from './toast.store';
import { defineComponent, ref } from 'vue';

import CdxToast from './Toast.vue';
import CdxToastContainer from './ToastContainer.vue';
import CdxToastDisplay from './ToastDisplay.vue';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import useToast from './useToast';

/**
 * Simulate transition end so container handlers (onUserDismissed etc.) run.
 *
 * @param wrapper - Mounted component wrapper that contains the toast
 */
function simulateToastLeaveEnd( wrapper: ReturnType<typeof mount> ): void {
	const display = wrapper.findComponent( CdxToastDisplay );
	if ( display.exists() ) {
		display.vm.onAfterLeave();
	}
}

/**
 * App component: container + button that shows a programmatic toast with the given options.
 * Use in tests that need to trigger useToast().show() with specific options.
 */
const ProgrammaticToastApp = defineComponent( {
	name: 'ProgrammaticToastApp',
	props: {
		showOptions: {
			type: Object,
			required: true
		}
	},
	template: `
		<div>
			<cdx-toast-container />
			<button class="show-btn" @click="show">Show</button>
		</div>
	`,
	components: { CdxToastContainer },
	setup( props ) {
		const toast = useToast();
		function show() {
			toast.show( props.showOptions );
		}
		return { show };
	}
} );

describe( 'ToastContainer', () => {
	afterEach( () => {
		isToastContainerInitialized.value = false;
		toastStore.toasts.splice( 0 );
		contentRefsById.clear();
		document.body.innerHTML = '';
	} );

	describe( 'rendering', () => {
		it( 'renders declarative toast inside container stack', async () => {
			const DeclarativeToast = defineComponent( {
				name: 'DeclarativeToast',
				template: `
					<div>
						<cdx-toast-container />
						<cdx-toast
							v-if="show"
							type="success"
							:auto-dismiss="false"
						>
							Article published
						</cdx-toast>
						<button class="show-btn" @click="show = true">Show</button>
					</div>
				`,
				components: { CdxToastContainer, CdxToast },
				setup() {
					const show = ref( false );
					return { show };
				}
			} );
			const wrapper = mount( DeclarativeToast, { attachTo: document.body } );
			await wrapper.find( '.show-btn' ).trigger( 'click' );
			const stack = document.body.querySelector( '.cdx-toast-container__stack' );
			const toast = stack?.querySelector( '.cdx-toast' );
			expect( stack ).toBeTruthy();
			expect( toast ).toBeTruthy();
			expect( toast?.textContent ).toContain( 'Article published' );
			wrapper.unmount();
		} );

		it( 'removes declarative toast when wrapper is unmounted (e.g. action button hides it)', async () => {
			const DeclarativeWithAction = defineComponent( {
				name: 'DeclarativeWithAction',
				template: `
					<div>
						<cdx-toast-container />
						<cdx-toast
							v-if="show"
							type="notice"
							action-button="Undo"
							:auto-dismiss="false"
							:prevent-user-dismiss="true"
							@action-button-click="handleUndo"
						>
							Changes saved
						</cdx-toast>
					</div>
				`,
				components: { CdxToastContainer, CdxToast },
				setup() {
					const show = ref( true );
					function handleUndo() {
						show.value = false;
					}
					return { show, handleUndo };
				}
			} );

			const wrapper = mount( DeclarativeWithAction, { attachTo: document.body } );
			await nextTick();
			// Toast is initially visible in the container stack.
			let stack = document.body.querySelector( '.cdx-toast-container__stack' );
			expect( stack?.querySelector( '.cdx-toast' ) ).toBeTruthy();

			// Clicking the action button hides the <cdx-toast> wrapper; on unmount the
			// Toast should be dismissed from the container as well.
			const actionBtn = document.body.querySelector<HTMLElement>( '.cdx-message__action-button' );
			actionBtn?.click();
			await nextTick();

			stack = document.body.querySelector( '.cdx-toast-container__stack' );
			expect( stack?.querySelector( '.cdx-toast' ) ).toBeFalsy();

			wrapper.unmount();
		} );

		it( 'teleports to target when target prop is set', async () => {
			const targetEl = document.createElement( 'div' );
			targetEl.id = 'container-target';
			document.body.appendChild( targetEl );

			const wrapper = mount( CdxToastContainer, {
				props: { target: '#container-target' },
				attachTo: document.body
			} );
			await nextTick();
			expect( targetEl.querySelector( '.cdx-toast-container__stack' ) ).toBeTruthy();
			document.body.removeChild( targetEl );
			wrapper.unmount();
		} );
	} );

	describe( 'programmatic toasts (useToast)', () => {
		it( 'calls onUserDismissed when user dismisses', async () => {
			const onUserDismissed = jest.fn();
			const wrapper = mount( ProgrammaticToastApp, {
				props: {
					showOptions: {
						message: 'Dismiss me',
						onUserDismissed
					}
				},
				attachTo: document.body
			} );
			await wrapper.find( '.show-btn' ).trigger( 'click' );
			const dismissBtn = document.body.querySelector<HTMLElement>( '.cdx-message__dismiss-button' );
			dismissBtn?.click();
			simulateToastLeaveEnd( wrapper );
			expect( onUserDismissed ).toHaveBeenCalled();
			wrapper.unmount();
		} );

		it( 'calls onAutoDismissed when toast auto-dismisses', async () => {
			jest.useFakeTimers();
			const onAutoDismissed = jest.fn();
			const wrapper = mount( ProgrammaticToastApp, {
				props: {
					showOptions: {
						message: 'Auto dismiss',
						autoDismiss: 100,
						onAutoDismissed
					}
				},
				attachTo: document.body
			} );
			await wrapper.find( '.show-btn' ).trigger( 'click' );
			jest.advanceTimersByTime( 150 );
			simulateToastLeaveEnd( wrapper );
			expect( onAutoDismissed ).toHaveBeenCalled();
			jest.useRealTimers();
			wrapper.unmount();
		} );

		it( 'calls actionButton onClick when action is clicked', async () => {
			const onAction = jest.fn();
			const wrapper = mount( ProgrammaticToastApp, {
				props: {
					showOptions: {
						message: 'With action',
						actionButton: { label: 'Undo', onClick: onAction }
					}
				},
				attachTo: document.body
			} );
			await wrapper.find( '.show-btn' ).trigger( 'click' );
			const actionBtn = document.body.querySelector<HTMLElement>( '.cdx-message__action-button' );
			actionBtn?.click();
			expect( onAction ).toHaveBeenCalled();
			wrapper.unmount();
		} );
	} );

	describe( 'lifecycle', () => {
		it( 'resets isToastContainerInitialized on unmount', () => {
			const wrapper = mount( CdxToastContainer, { attachTo: document.body } );
			expect( isToastContainerInitialized.value ).toBe( true );
			wrapper.unmount();
			expect( isToastContainerInitialized.value ).toBe( false );
		} );

		it( 'warns when multiple containers are mounted and second does not render', async () => {
			const warnSpy = jest.spyOn( console, 'warn' ).mockImplementation( () => undefined );
			const TwoContainers = defineComponent( {
				name: 'TwoContainers',
				template: `
					<div>
						<cdx-toast-container />
						<cdx-toast-container />
					</div>
				`,
				components: { CdxToastContainer }
			} );
			const wrapper = mount( TwoContainers, { attachTo: document.body } );
			await nextTick();
			expect( warnSpy ).toHaveBeenCalledWith(
				expect.stringContaining( 'Only one ToastContainer' )
			);
			const containers = wrapper.findAllComponents( CdxToastContainer );
			expect( containers ).toHaveLength( 2 );
			const stacks = document.body.querySelectorAll( '.cdx-toast-container__stack' );
			expect( stacks.length ).toBe( 1 );
			warnSpy.mockRestore();
			wrapper.unmount();
		} );
	} );
} );
