import { mount, enableAutoUnmount } from '@vue/test-utils';
import CdxMenuButton from './MenuButton.vue';
import CdxButton from '../../components/button/Button.vue';
import CdxMenuItem from '../../components/menu-item/MenuItem.vue';
import { MenuItemData, ButtonAction, ButtonWeight } from '../../types';

const data: MenuItemData[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: 'd', label: 'Option D', disabled: true }
];

const propsWithData: {
	selected: string,
	buttonLabel: string,
	menuItems: MenuItemData[]
} = {
	selected: '',
	menuItems: data,
	buttonLabel: 'Open and close the menu'
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
				action?: ButtonAction,
				weight?: ButtonWeight,
				disabled?: boolean,
				footer?: MenuItemData
			}
		]

		const cases: Case[] = [
			[ 'No selection', { menuItems: data, selected: '' } ],
			[ 'Menu item with label selected', { menuItems: data, selected: 'a' } ],
			[ 'Menu item with no label selected', { menuItems: data, selected: 'c' } ],
			[ 'Disabled', { menuItems: data, selected: '', disabled: true } ],
			[ 'With footer', { menuItems: data, selected: '', footer: { value: 'footer', label: 'Footer item' } } ],
			[ 'With primary progressive action button', { menuItems: data, selected: '', action: 'progressive', weight: 'primary' } ],
			[ 'With normal destructive action button', { menuItems: data, selected: '', action: 'destructive', weight: 'normal' } ]

		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			( _, { menuItems, selected, disabled = false, footer = undefined, action = 'default', weight = 'quiet' } ) => {
				const wrapper = mount( CdxMenuButton, {
					props: { menuItems, selected, disabled, footer, action, weight },
					attachTo: '#root'
				} );
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );

	describe( 'when the button is clicked', () => {
		it( 'toggles the menu visibility', async () => {
			const wrapper = mount( CdxMenuButton, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const expandButton = wrapper.findComponent( CdxButton );
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
				const expandButton = wrapper.findComponent( CdxButton );
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
			const expandButton = wrapper.findComponent( CdxButton );
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
			const expandButton = wrapper.findComponent( CdxButton );
			await expandButton.trigger( 'click' );
			await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'when Enter is pressed', () => {
		describe( 'and focus is on the MenuButton', () => {
			it( 'toggles the menu visibility', async () => {
				const wrapper = mount( CdxMenuButton, {
					props: propsWithData,
					attachTo: '#root'
				} );
				const expandButton = wrapper.findComponent( CdxButton );
				await expandButton.trigger( 'keydown', { key: 'Enter' } );
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
					const expandButton = wrapper.findComponent( CdxButton );
					await expandButton.trigger( 'keydown', { key: 'Enter' } );
					expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
				} );
			} );
		} );

		describe( 'and a highlighted menu item is selected with Enter', () => {
			it( 'emits an "update:selected" event with the correct "value"', async () => {
				const wrapper = mount( CdxMenuButton, {
					props: propsWithData,
					attachTo: '#root'
				} );
				const expandButton = wrapper.findComponent( CdxButton );
				// Open the menu with Enter
				await expandButton.trigger( 'keydown', { key: 'Enter' } );
				// Navigate down to highlight the first menu item
				await expandButton.trigger( 'keydown', { key: 'ArrowDown' } );
				// Select the highlighted item with Enter
				await expandButton.trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
				expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
			} );

			it( 'closes the menu', async () => {
				const wrapper = mount( CdxMenuButton, {
					props: propsWithData,
					attachTo: '#root'
				} );
				const expandButton = wrapper.findComponent( CdxButton );
				// Open the menu with Enter
				await expandButton.trigger( 'keydown', { key: 'Enter' } );
				// Navigate down to highlight the first menu item
				await expandButton.trigger( 'keydown', { key: 'ArrowDown' } );
				// Select the highlighted item with Enter
				await expandButton.trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );
	} );

	describe( 'when the button loses focus', () => {
		it( 'closes the menu', async () => {
			const wrapper = mount( CdxMenuButton, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const expandButton = wrapper.findComponent( CdxButton );
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
			const button = wrapper.findComponent( CdxButton );
			await button.trigger( 'click' );

			// Check custom slot content.
			const menuitemsList = wrapper.findAll( 'li.cdx-menu-item span' );
			const footerItem = menuitemsList[ menuitemsList.length - 1 ];
			expect( footerItem.text() ).toBe( 'Custom Footer for Menu Footer' );
		} );
	} );
} );
