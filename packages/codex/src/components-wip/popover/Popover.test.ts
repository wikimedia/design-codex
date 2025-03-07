import { ref } from 'vue';
import { mount, config, shallowMount } from '@vue/test-utils';
import CdxPopover from './Popover.vue';
import CdxToggleButton from '../../components/toggle-button/ToggleButton.vue';
import { cdxIconInfoFilled, Icon } from '@wikimedia/codex-icons';
import { ModalAction, PrimaryModalAction } from '../../types';
import { Placement } from '@floating-ui/vue';

// Mock `useFloating` from FloatingUI. If we use the real composable, Jest will crash in an
// infinite loop of repositioning.
// TODO: Consider moving this to a jest setup file to provide a global mock.
jest.mock( '@floating-ui/vue', () => ( {
	__esModule: true,
	useFloating: jest.fn( () => ( {
		floatingStyles: {
			position: 'absolute',
			left: '0px',
			top: '0px'
		},
		middlewareData: {},
		placement: {},
		x: ref(),
		y: ref()
	} ) )
} ) );

describe( 'Popover', () => {
	// Ignore all "teleport" behavior for the purpose of testing Popover.
	// Refer to https://test-utils.vuejs.org/guide/advanced/teleport.html
	config.global.stubs = {
		teleport: true
	};

	const toggleButton = shallowMount( CdxToggleButton, {
		props: { modelValue: false },
		attachTo: 'body'
	} );

	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				title?: string,
				icon?: Icon,
				useCloseButton?: boolean,
				closeButtonLabel?: string,
				primaryAction?: PrimaryModalAction,
				defaultAction?: ModalAction,
				stackedActions?: boolean,
				target?: string,
				renderInPlace?: boolean,
				placement?: Placement
			},
			slots?: {
				header?: string,
				footer?: string
			}
		];
		const cases: Case[] = [
			[ 'Basic usage', {} ],
			[ 'With title', { title: 'Popover title' } ],
			[ 'With icon', { icon: cdxIconInfoFilled } ],
			[ 'With close button', { useCloseButton: true } ],
			[ 'With custom close button label', { useCloseButton: true, closeButtonLabel: 'Dismiss' } ],
			[ 'With primary action', { primaryAction: { label: 'Save', actionType: 'progressive' } } ],
			[ 'With default action', { defaultAction: { label: 'Cancel' } } ],
			[ 'With stacked actions', {
				primaryAction: { label: 'Save', actionType: 'progressive' },
				defaultAction: { label: 'Cancel' },
				stackedActions: true
			} ],
			[ 'With header and footer slots', {}, { header: 'Custom header text', footer: 'Custom footer text' } ]
		];

		test.each( cases )( 'Case %# %s', ( _, props, slots = {} ) => {
			const wrapper = mount( CdxPopover, {
				props: {
					anchor: toggleButton.vm.$el,
					renderInPlace: true, open: true,
					...props
				},
				slots: {
					default: 'Popover body content',
					...( slots.header === undefined ? {} : { header: slots.header } ),
					...( slots.footer === undefined ? {} : { footer: slots.footer } )
				}
			} );

			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when the Popover is closed', () => {
		describe( 'and the triggering element is a clickable element e.g. toggle button', () => {
			it( 'displays a Popover when the trigger element is clicked', async () => {
				const wrapper = mount( CdxPopover, {
					props: { anchor: toggleButton.vm.$el, renderInPlace: true },
					slots: { default: 'Popover Content' },
					attachTo: 'body'
				} );

				expect( wrapper.exists() ).toBe( true );

				//  Popover is initially closed.
				// Using `isVisible()` on `v-if` conditionally rendered element always returns true.
				expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( false );

				// Simulate button click to open the Popover.
				await toggleButton.trigger( 'click' );

				// Assert that the Popover is visible.
				await wrapper.setProps( { open: true } );
				expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( true );
			} );
		} );
	} );

	describe( 'when the Popover is open', () => {
		it( 'closes the Popover when Escape key is pressed', async () => {
			const wrapper = mount( CdxPopover, {
				props: { anchor: toggleButton.vm.$el, renderInPlace: true, open: true },
				slots: { default: 'Popover Content' },
				attachTo: 'body'
			} );

			// Ensure Popover is open.
			expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( true );

			// Simulate Escape key press.
			document.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'Escape' } ) );

			// Assert that the Popover is not visible.
			await wrapper.setProps( { open: false } );
			expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( false );
			expect( wrapper.emitted()[ 'update:open' ][ 0 ] ).toEqual( [ false ] );
		} );

		it( 'keeps the Popover open when a non-Escape key is pressed', () => {
			const wrapper = mount( CdxPopover, {
				props: { anchor: toggleButton.vm.$el, renderInPlace: true, open: true },
				slots: { default: 'Popover Content' },
				attachTo: 'body'
			} );

			// Ensure Popover is open.
			expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( true );

			// Simulate pressing a non-Escape key.
			document.dispatchEvent( new KeyboardEvent( 'keydown', { key: 'ArrowDown' } ) );

			// Assert that the Popover is still open.
			expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( true );
		} );
	} );

	describe( 'when the popover has a close button', () => {
		it( 'closes the popover', async () => {
			const wrapper = mount( CdxPopover, {
				props: {
					anchor: toggleButton.vm.$el,
					renderInPlace: true,
					open: true,
					useCloseButton: true
				},
				slots: { default: 'Popover Content' },
				attachTo: 'body'
			} );

			const closeButton = wrapper.find( '.cdx-popover__header__close-button' );

			// Simulate clicking the close button to close the Popover.
			await closeButton.trigger( 'click' );
			await wrapper.setProps( { open: false } );

			// Assert that an event was emitted and the Popover is not visible.
			expect( wrapper.emitted()[ 'update:open' ][ 0 ] ).toEqual( [ false ] );
			expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( false );
		} );
	} );

	describe( 'when click or mousedown outside the popover', () => {
		it( 'closes the popover', async () => {
			const wrapper = mount( CdxPopover, {
				props: { anchor: toggleButton.vm.$el, renderInPlace: true, open: true },
				slots: { default: 'Popover Content' },
				attachTo: 'body'
			} );

			// Ensure the popover is open.
			expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( true );

			// Simulate clicking outside the popover.
			await wrapper.trigger( 'mousedown' );
			await wrapper.setProps( { open: false } );

			// Assert that the Popover is not visible.
			expect( wrapper.emitted()[ 'update:open' ][ 0 ] ).toEqual( [ false ] );
			expect( wrapper.find( '.cdx-popover' ).exists() ).toBe( false );
		} );
	} );

	describe( 'when action buttons are present', () => {
		it( 'emits an event when action button is triggered', async () => {
			const wrapper = mount( CdxPopover, {
				props: {
					anchor: toggleButton.vm.$el,
					renderInPlace: true,
					open: true,
					primaryAction: { label: 'Save', actionType: 'progressive' },
					defaultAction: { label: 'Cancel' }
				},
				slots: { default: 'Popover Content'
				},
				attachTo: 'body'
			} );

			const primaryAction = wrapper.findComponent( '.cdx-popover__footer__primary-action' );
			const defaultAction = wrapper.findComponent( '.cdx-popover__footer__default-action' );

			await primaryAction.trigger( 'click' );
			expect( wrapper.emitted() ).toHaveProperty( 'primary' );

			await defaultAction.trigger( 'click' );
			expect( wrapper.emitted() ).toHaveProperty( 'default' );
		} );

		it( 'tabs from the primary action button to the default action button', async () => {
			const wrapper = mount( CdxPopover, {
				props: {
					anchor: toggleButton.vm.$el,
					renderInPlace: true,
					open: true,
					primaryAction: { label: 'Save', actionType: 'progressive' },
					defaultAction: { label: 'Cancel' }
				},
				slots: { default: 'Popover Content'
				},
				attachTo: 'body'
			} );

			const primaryAction = wrapper.findComponent( '.cdx-popover__footer__primary-action' );
			const defaultAction = wrapper.findComponent( '.cdx-popover__footer__default-action' );

			// Focus on primary button.
			// Assert that element is of type HTMLElement in order to call `focus()`.
			( primaryAction.element as HTMLElement ).focus();
			// Ensure the primary button is focused.
			expect( document.activeElement ).toBe( primaryAction.element );

			// Simulate Tab key press to move to the next button in the tab order.
			await primaryAction.trigger( 'keydown', { key: 'Tab' } );
			( defaultAction.element as HTMLElement ).focus();

			// Ensure the default button is focused.
			expect( document.activeElement ).toBe( defaultAction.element );

			// Simulate Shift+Tab to move focus back.
			await defaultAction.trigger( 'keydown', { key: 'Tab', shiftKey: true } );
			( primaryAction.element as HTMLElement ).focus();
			expect( document.activeElement ).toBe( primaryAction.element );
		} );
	} );
} );
