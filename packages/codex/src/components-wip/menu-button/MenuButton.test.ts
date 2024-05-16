import { mount, enableAutoUnmount } from '@vue/test-utils';
import CdxMenuButton from './MenuButton.vue';
import CdxToggleButton from '../../components/toggle-button/ToggleButton.vue';
import CdxMenuItem from '../../components/menu-item/MenuItem.vue';
import { MenuItemData } from '../../types';

const data: MenuItemData[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: 'd', label: 'Option D', disabled: true }
];

const propsWithData: {
	selected: string,
	toggleButtonLabel: string
	menuItems: MenuItemData[]
} = {
	selected: '',
	menuItems: data,
	toggleButtonLabel: 'Open and close the menu'
};

describe( 'Basic usage', () => {
	beforeEach( () => {
		const div = document.createElement( 'div' );
		div.id = 'root';
		document.body.appendChild( div );
	} );

	// Automatically destroy each wrapper after each test
	enableAutoUnmount( afterEach );

	it( 'Clicking the button toggles the menu visibility', async () => {
		const wrapper = mount( CdxMenuButton, {
			props: propsWithData,
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxToggleButton );
		await expandButton.trigger( 'click' );
		expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
	} );

	it( 'Clicking the button does nothing if component is disabled', async () => {
		const wrapper = mount( CdxMenuButton, {
			props: {
				...propsWithData,
				disabled: true
			},
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxToggleButton );
		await expandButton.trigger( 'click' );
		expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking an item emits an "update:selected" event with the correct "value"', async () => {
		const wrapper = mount( CdxMenuButton, {
			props: propsWithData,
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxToggleButton );
		await expandButton.trigger( 'click' );
		await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
		expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
		expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
	} );

	it( 'Clicking an item closes the menu', async () => {
		const wrapper = mount( CdxMenuButton, {
			props: propsWithData,
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxToggleButton );
		await expandButton.trigger( 'click' );
		await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
		expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
	} );

	it( 'Blurring the toggle button should close the menu', async () => {
		const wrapper = mount( CdxMenuButton, {
			props: propsWithData,
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxToggleButton );
		await expandButton.trigger( 'focus' );
		await expandButton.trigger( 'blur' );
		expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
	} );
} );
