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
	toggleButtonLabel: string,
	menuItems: MenuItemData[]
} = {
	selected: '',
	menuItems: data,
	toggleButtonLabel: 'Open and close the menu'
};

describe( 'MenuButton', () => {
	beforeEach( () => {
		const div = document.createElement( 'div' );
		div.id = 'root';
		document.body.appendChild( div );
	} );

	// Automatically destroy each wrapper after each test
	enableAutoUnmount( afterEach );

	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				menuItems: MenuItemData[],
				selected: string|number,
				disabled?: boolean,
				footer?: MenuItemData
			}
		]

		const cases: Case[] = [
			[ 'No selection', { menuItems: data, selected: '' } ],
			[ 'Menu item with label selected', { menuItems: data, selected: 'a' } ],
			[ 'Menu item with no label selected', { menuItems: data, selected: 'c' } ],
			[ 'Disabled', { menuItems: data, selected: '', disabled: true } ],
			[ 'With footer', { menuItems: data, selected: '', footer: { value: 'footer', label: 'Footer item' } } ]
		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			( _, { menuItems, selected, disabled = false, footer = undefined } ) => {
				const wrapper = mount( CdxMenuButton, {
					props: { menuItems, selected, disabled, footer },
					attachTo: '#root'
				} );
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );

	describe( 'when the toggle button is clicked', () => {
		it( 'toggles the menu visibility', async () => {
			const wrapper = mount( CdxMenuButton, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const expandButton = wrapper.findComponent( CdxToggleButton );
			await expandButton.trigger( 'click' );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
		} );

		describe( 'and the component is disabled', () => {
			it( 'does nothing', async () => {
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
		} );
	} );

	describe( 'when an item is clicked', () => {
		it( 'emits an "update:selected" event with the correct "value"', async () => {
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

		it( 'closes the menu', async () => {
			const wrapper = mount( CdxMenuButton, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const expandButton = wrapper.findComponent( CdxToggleButton );
			await expandButton.trigger( 'click' );
			await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'when the toggle button loses focus', () => {
		it( 'closes the menu', async () => {
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

	describe( 'when the footer prop is provided with a custom template', () => {
		it( 'renders footer menu item properly', async () => {
			const wrapper = mount( CdxMenuButton, {
				props: {
					...propsWithData,
					footer: { label: 'Menu Footer', value: 'menu-footer' }
				},
				attachTo: 'body',
				slots: {
					'menu-item': `<template #menu-item="{ menuItem }">
									<span v-if="menuItem.value === 'menu-footer'">
										Custom Footer for {{ menuItem.label }}
									</span>
								  </template>`
				}
			} );

			// Open the menu.
			const toggleButton = wrapper.findComponent( CdxToggleButton );
			await toggleButton.trigger( 'click' );

			// Check custom slot content.
			const menuitemsList = wrapper.findAll( 'li.cdx-menu-item span' );
			const footerItem = menuitemsList[ menuitemsList.length - 1 ];
			expect( footerItem.text() ).toBe( 'Custom Footer for Menu Footer' );
		} );
	} );
} );
