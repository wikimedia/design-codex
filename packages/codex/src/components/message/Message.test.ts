import { mount } from '@vue/test-utils';
import { Icon, cdxIconArticle, cdxIconSuccess } from '@wikimedia/codex-icons';
import { StatusType } from '../../types';
import { StatusTypes } from '../../constants';
import CdxMessage from './Message.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			type?: StatusType,
			inline?: boolean,
			allowUserDismiss?: boolean,
			dismissButtonLabel?: string,
			icon?: Icon
		},
		slot: string
	];

	const cases: Case[] = [
		[ 'Default props', {}, '<p>Message content</p>' ],
		// A snapshot for each message type.
		...StatusTypes.map( ( type ) : Case => [
			`${ type } message`,
			{ type },
			'<p>Message content</p>'
		] ),
		[ 'Inline', { inline: true }, '<p>Message content</p>' ],
		[ 'Dismissable', { allowUserDismiss: true }, '<p>Message content</p>' ],
		[ 'Dismissable, custom label', { allowUserDismiss: true, dismissButtonLabel: 'Dismiss' }, '<p>Message content</p>' ],
		[ 'Custom icon', { icon: cdxIconArticle }, '<p>Message content</p>' ]

	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const wrapper = mount( CdxMessage, { props: props, slots: { default: slot } } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Message', () => {
	afterEach( () => {
		// Some tests use fake timers.
		jest.useRealTimers();
	} );

	// DEPRECATED: eventually remove (T368444).
	it( 'handles user dismissal with the deprecated API', async () => {
		const wrapper = mount( CdxMessage, { props: { dismissButtonLabel: 'Dismiss' } } );
		await wrapper.get( 'button' ).trigger( 'click' );
		expect( wrapper.emitted()[ 'user-dismissed' ] ).toBeTruthy();
		expect( wrapper.vm.dismissed ).toBeTruthy();
		expect( wrapper.vm.leaveActiveClass ).toBe( 'cdx-message-leave-active-user' );
	} );

	it( 'handles user dismissal', async () => {
		const wrapper = mount( CdxMessage, { props: { allowUserDismiss: true } } );
		await wrapper.get( 'button' ).trigger( 'click' );
		expect( wrapper.emitted()[ 'user-dismissed' ] ).toBeTruthy();
		expect( wrapper.vm.dismissed ).toBeTruthy();
		expect( wrapper.vm.leaveActiveClass ).toBe( 'cdx-message-leave-active-user' );
	} );

	it( 'handles automatic dismissal', () => {
		jest.useFakeTimers();

		// We'll use the default displayTime of 4000 milliseconds.
		const wrapper = mount( CdxMessage, { props: { autoDismiss: true } } );
		expect( wrapper.vm.dismissed ).toBeFalsy();

		// Check right before the displayTime elapses.
		jest.advanceTimersByTime( 3950 );
		expect( wrapper.emitted()[ 'auto-dismissed' ] ).toBeFalsy();
		expect( wrapper.vm.dismissed ).toBeFalsy();

		// Check right after the displayTime elapses.
		jest.advanceTimersByTime( 50 );
		expect( wrapper.emitted()[ 'auto-dismissed' ] ).toBeTruthy();
		expect( wrapper.vm.dismissed ).toBeTruthy();
		expect( wrapper.vm.leaveActiveClass ).toBe( 'cdx-message-leave-active-system' );
	} );

	it( 'handles automatic dismissal with custom display time', () => {
		jest.useFakeTimers();

		const wrapper = mount( CdxMessage, { props: { autoDismiss: 1000 } } );
		expect( wrapper.emitted()[ 'auto-dismissed' ] ).toBeFalsy();
		expect( wrapper.vm.dismissed ).toBeFalsy();

		jest.advanceTimersByTime( 1000 );
		expect( wrapper.emitted()[ 'auto-dismissed' ] ).toBeTruthy();
		expect( wrapper.vm.dismissed ).toBeTruthy();
	} );

	it( 'does not allow auto-dismissal for error messages', () => {
		jest.useFakeTimers();

		const wrapper = mount( CdxMessage, { props: { type: 'error', autoDismiss: 1000 } } );
		expect( wrapper.emitted()[ 'auto-dismissed' ] ).toBeFalsy();
		expect( wrapper.vm.dismissed ).toBeFalsy();

		jest.advanceTimersByTime( 1000 );
		expect( wrapper.emitted()[ 'auto-dismissed' ] ).toBeFalsy();
		expect( wrapper.vm.dismissed ).toBeFalsy();
	} );

	it( 'does not emit an auto-dismissed event when user-dismissed', async () => {
		jest.useFakeTimers();

		// Set up a Message that is both auto and user dismissable.
		const wrapper = mount( CdxMessage, { props: {
			autoDismiss: true,
			dismissButtonLabel: 'Close'
		} } );

		await wrapper.get( 'button' ).trigger( 'click' );
		expect( wrapper.emitted()[ 'user-dismissed' ] ).toBeTruthy();

		// Let the default displayTime of 4000 milliseconds pass.
		jest.advanceTimersByTime( 4000 );
		expect( wrapper.emitted()[ 'auto-dismissed' ] ).toBeFalsy();
	} );

	it( 'does not allow custom icon for success type message', () => {
		const wrapper = mount( CdxMessage, { props: { type: 'success', icon: cdxIconArticle } } );
		expect( wrapper.vm.computedIcon ).toBe( cdxIconSuccess );
	} );
} );
