import { nextTick } from 'vue';
import { config, mount } from '@vue/test-utils';
import { DialogAction, PrimaryDialogAction } from '../../types';
import CdxDialog from './Dialog.vue';

type Case = [
	msg: string,
	props: {
		title: string,
		subtitle?: string,
		open?: boolean,
		hideTitle?: boolean,
		useCloseButton?: boolean,
		closeButtonLabel?: string,
		primaryAction?: PrimaryDialogAction,
		defaultAction?: DialogAction,
		stackedActions?: boolean,
		renderInPlace?: boolean,
		target?: string
	},
	slots: {
		default: string,
		header?: string,
		footer?: string,
		footerText?: string,
	}
];

// Ignore all "teleport" behavior for the purpose of testing Dialog;
// see https://test-utils.vuejs.org/guide/advanced/teleport.html
config.global.stubs = {
	teleport: true
};

describe( 'matches the snapshot', () => {
	const cases: Case[] = [
		[ 'Basic usage', { title: 'Dialog', open: true }, { default: '<p>Hello world!</p>' } ],
		[ 'Open dialog', { title: 'Dialog', open: true }, { default: '<p>Hello world!</p>' } ],
		[ 'With hidden title', { title: 'Dialog', hideTitle: true, useCloseButton: true, open: true }, { default: '<p>foo</p>' } ],
		[ 'With custom close button label', { title: 'Dialog', useCloseButton: true, closeButtonLabel: 'Dismiss', open: true }, { default: '<p>foo</p>' } ],
		// DEPRECATED: Remove this when backwards compatibility is removed (T368444)
		[ 'Using deprecated API for close button', { title: 'Dialog', closeButtonLabel: 'Close', open: true }, { default: '<p>foo</p>' } ],
		[ 'With default action', { title: 'Dialog', defaultAction: { label: 'ok' }, open: true }, { default: '<p>foo</p>' } ],
		[ 'With default disabled action', { title: 'Dialog', defaultAction: { label: 'ok', disabled: true }, open: true }, { default: '<p>foo</p>' } ],
		[ 'With default and primary actions', { title: 'Dialog', defaultAction: { label: 'cancel' }, primaryAction: { label: 'save', actionType: 'progressive' }, open: true }, { default: '<p>foo</p>' } ],
		[ 'With stacked default and primary actions', { title: 'Dialog', defaultAction: { label: 'cancel' }, primaryAction: { label: 'save', actionType: 'progressive' }, stackedActions: true, open: true }, { default: '<p>foo</p>' } ],
		[ 'With subtitle', { title: 'Dialog', subtitle: 'Subtitle', defaultAction: { label: 'cancel' }, primaryAction: { label: 'save', actionType: 'progressive' }, open: true }, { default: '<p>foo</p>' } ],
		[ 'With footer text', { title: 'Dialog', subtitle: 'Subtitle', defaultAction: { label: 'cancel' }, primaryAction: { label: 'save', actionType: 'progressive' }, open: true }, { default: '<p>foo</p>', footerText: 'This is some <a href="#">footer text</a>.' } ],
		[ 'With custom header and footer', { title: 'Dialog', subtitle: 'Subtitle', defaultAction: { label: 'cancel' }, primaryAction: { label: 'save', actionType: 'progressive' }, open: true }, { default: '<p>foo</p>', header: '<h1>Dialog header custom</h1>', footer: '<p>Dialog footer custom</p>' } ]
	];

	test.each( cases )( 'Case %# %s', ( _, props, slots ) => {
		const wrapper = mount( CdxDialog, {
			props: props,
			slots: {
				default: slots.default,
				...( slots.footerText === undefined ? {} : { 'footer-text': slots.footerText } ),
				...( slots.header === undefined ? {} : { header: slots.header } ),
				...( slots.footer === undefined ? {} : { footer: slots.footer } )
			}
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Basic usage', () => {
	const dialogSlotContents = '<p id="foo">Hello World</p>';
	const dialogSlotContentsWithInput = '<p id="foo"> Example input: <input id="input" type="text"></p>';
	const dialogBasicClosed = Object.freeze( { props: { title: 'Dialog Title' }, slots: { default: dialogSlotContents } } );
	const dialogBasicOpen = Object.freeze( { props: { title: 'Dialog Title', open: true }, slots: { default: dialogSlotContents } } );
	const dialogWithCloseButtonOpen = Object.freeze( { props: { title: 'Dialog Title', open: true, useCloseButton: true }, slots: { default: dialogSlotContents } } );
	const dialogPrimaryOpen = Object.freeze( { props: { title: 'Dialog Title', open: true, primaryAction: { label: 'save', actionType: 'progressive' } as PrimaryDialogAction }, slots: { default: dialogSlotContents } } );
	const dialogDefaultOpen = Object.freeze( { props: { title: 'Dialog Title', open: true, defaultAction: { label: 'ok' } as DialogAction }, slots: { default: dialogSlotContents } } );
	const dialogStackedActions = Object.freeze( { props: { title: 'Dialog Title', open: true, stackedActions: true, primaryAction: { label: 'save', actionType: 'progressive' } as PrimaryDialogAction }, slots: { default: dialogSlotContents } } );
	const dialogBasicClosedWithInput = Object.freeze( { props: { title: 'Dialog Title' }, slots: { default: dialogSlotContentsWithInput } } );
	const dialogWithSubtitle = Object.freeze( { props: { title: 'Dialog Title', subtitle: 'Subtitle', open: true }, slots: { default: dialogSlotContents } } );

	it( 'is not visible when "open" is not "true"', () => {
		const wrapper1 = mount( CdxDialog, dialogBasicClosed );
		const wrapper2 = mount( CdxDialog, dialogBasicOpen );
		expect( wrapper1.find( '#foo' ).exists() ).toBe( false );
		expect( wrapper2.find( '#foo' ).exists() ).toBe( true );
	} );

	it( 'clicking the dialog backdrop emits an update:open event with a value of "false"', async () => {
		const wrapper = mount( CdxDialog, dialogBasicOpen );
		await wrapper.find( '.cdx-dialog-backdrop' ).trigger( 'click' );
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

	it( 'adds the "cdx-dialog-open" class to the body when open, and removes it when closed', async () => {
		const wrapper = mount( CdxDialog, { attachTo: document.body, ...dialogBasicClosed } );
		await wrapper.setProps( { open: true } );
		expect( document.body.classList ).toContain( 'cdx-dialog-open' );
		await wrapper.setProps( { open: false } );
		expect( document.body.classList ).not.toContain( 'cdx-dialog-open' );
	} );

	it( 'correctly stacks buttons when the "stackedActions" prop is true', () => {
		const wrapper = mount( CdxDialog, dialogStackedActions );
		const dialog = wrapper.find( '.cdx-dialog' );
		expect( dialog.classes() ).toContain( 'cdx-dialog--vertical-actions' );
	} );

	it( 'automatically focuses the first focusable element inside dialog when opened', async () => {
		const wrapper = mount( CdxDialog, {
			attachTo: document.body,
			...dialogBasicClosedWithInput
		} );
		await wrapper.setProps( { open: true } );
		await nextTick();

		const input = wrapper.find( '#input' ).element;
		expect( document.activeElement ).toBe( input );
	} );

	it( 'displays a subtitle when one is provided', () => {
		const wrapper = mount( CdxDialog, dialogWithSubtitle );
		expect( wrapper.find( '.cdx-dialog__header__subtitle' ).exists() ).toBe( true );
	} );

	it( 'renders no subtitle markup when one is not provided', () => {
		const wrapper = mount( CdxDialog, dialogBasicOpen );
		expect( wrapper.find( '.cdx-dialog__header__subtitle' ).exists() ).toBe( false );
	} );
} );
