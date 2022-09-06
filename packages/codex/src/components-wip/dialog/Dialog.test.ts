import { mount } from '@vue/test-utils';
import { DialogAction, PrimaryDialogAction } from '../../types';
import CdxDialog from './Dialog.vue';

type Case = [
	msg: string,
	props: {
		title: string,
		open?: boolean,
		hideTitle?: boolean,
		closeButtonLabel?: string,
		primaryAction?: PrimaryDialogAction,
		defaultAction?: DialogAction,
		stackedActions?: boolean
	},
	slot: string
];

describe( 'matches the snapshot', () => {
	const cases: Case[] = [
		[ 'Basic usage', { title: 'Dialog', open: true }, '<p>Hello world!</p>' ],
		[ 'Open dialog', { title: 'Dialog', open: true }, '<p>Hello world!</p>' ],
		[ 'With hidden title', { title: 'Dialog', hideTitle: true, closeButtonLabel: 'close', open: true }, '<p>foo</p>' ],
		[ 'With default action', { title: 'Dialog', defaultAction: { label: 'ok' }, open: true }, '<p>foo</p>' ],
		[ 'With default disabled action', { title: 'Dialog', defaultAction: { label: 'ok', disabled: true }, open: true }, '<p>foo</p>' ],
		[ 'With default and primary actions', { title: 'Dialog', defaultAction: { label: 'cancel' }, primaryAction: { label: 'save', actionType: 'progressive' }, open: true }, '<p>foo</p>' ],
		[ 'With stacked default and primary actions', { title: 'Dialog', defaultAction: { label: 'cancel' }, primaryAction: { label: 'save', actionType: 'progressive' }, stackedActions: true, open: true }, '<p>foo</p>' ]
	];

	test.each( cases )( 'Case %# %s', ( _, props, slot ) => {
		const wrapper = mount( CdxDialog, {
			props: props,
			slots: { default: slot }
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Basic usage', () => {
	const dialogSlotContents = '<p id="foo">Hello World</p>';
	const dialogBasicClosed = Object.freeze( { props: { title: 'Dialog Title' }, slots: { default: dialogSlotContents } } );
	const dialogBasicOpen = Object.freeze( { props: { title: 'Dialog Title', open: true }, slots: { default: dialogSlotContents } } );
	const dialogWithCloseButtonOpen = Object.freeze( { props: { title: 'Dialog Title', open: true, closeButtonLabel: 'close' }, slots: { default: dialogSlotContents } } );
	const dialogPrimaryOpen = Object.freeze( { props: { title: 'Dialog Title', open: true, primaryAction: { label: 'save', actionType: 'progressive' } as PrimaryDialogAction }, slots: { default: dialogSlotContents } } );
	const dialogDefaultOpen = Object.freeze( { props: { title: 'Dialog Title', open: true, defaultAction: { label: 'ok' } as DialogAction }, slots: { default: dialogSlotContents } } );

	it( 'is not visible when "open" is not "true"', () => {
		const wrapper1 = mount( CdxDialog, dialogBasicClosed );
		const wrapper2 = mount( CdxDialog, dialogBasicOpen );
		expect( wrapper1.find( '#foo' ).exists() ).toBe( false );
		expect( wrapper2.find( '#foo' ).exists() ).toBe( true );
	} );

	it( 'clicking the dialog mask emits an update:open event with a value of "false"', async () => {
		const wrapper = mount( CdxDialog, dialogBasicOpen );
		await wrapper.find( '.cdx-dialog-mask' ).trigger( 'click' );
		expect( wrapper.emitted()[ 'update:open' ][ 0 ] ).toEqual( [ false ] );
	} );

	it( 'clicking the close button emits an update:open event with a value of "false"', async () => {
		const wrapper = mount( CdxDialog, dialogWithCloseButtonOpen );
		await wrapper.findComponent( '.cdx-dialog__header__close-button' ).trigger( 'click' );
		expect( wrapper.emitted()[ 'update:open' ][ 0 ] ).toEqual( [ false ] );
	} );

	it( 'emits the "primary" event when primary button is clicked', async () => {
		const wrapper = mount( CdxDialog, dialogPrimaryOpen );
		await wrapper.findComponent( '.cdx-dialog__footer__primary-action' ).trigger( 'click' );
		expect( wrapper.emitted() ).toHaveProperty( 'primary' );
	} );

	it( 'emits the "default" event when default button is clicked', async () => {
		const wrapper = mount( CdxDialog, dialogDefaultOpen );
		await wrapper.findComponent( '.cdx-dialog__footer__default-action' ).trigger( 'click' );
		expect( wrapper.emitted() ).toHaveProperty( 'default' );
	} );

	test.todo( 'adds the "cdx-dialog-open" class to the body when open, and removes it when closed' );
	test.todo( 'does not allow focus to leave the dialog element via keyboard navigation' );
	test.todo( 'correctly stacks buttons when the "stackedActions" prop is true' );
} );
