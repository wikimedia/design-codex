import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CdxSelect from './Select.vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import { Icon, cdxIconSearch } from '@wikimedia/codex-icons';
import { MenuItemData, MenuGroupData, ValidationStatusType } from '../../types';

const data: {
	value: string,
	label?: string,
	disabled?: boolean,
	icon?: Icon
}[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: 'd', label: 'Option D', disabled: true },
	{ value: 'e', label: 'Option E', icon: cdxIconSearch }
];

const dataWithGroups: ( MenuItemData|MenuGroupData )[] = [
	{
		label: 'Group 1',
		items: [
			{ value: 'a', label: 'Option A' },
			{ value: 'b', label: 'Option B', disabled: true },
			{ value: 'c' }
		]
	},
	{
		label: 'Group 2',
		items: [
			{ value: 'd', label: 'Option D' },
			{ value: 'e', label: 'Option E' }
		]
	}
];

// Jest doesn't support the scrollIntoView method in jsdom, which is used by our Menu component.
// We stub it here to prevent errors.
beforeAll( () => {
	window.HTMLElement.prototype.scrollIntoView = jest.fn();
} );

describe( 'Select', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				menuItems: MenuItemData[],
				selected: string|number|null,
				defaultIcon?: Icon,
				status?: ValidationStatusType
			}
		]

		const cases: Case[] = [
			[ 'No selection', { menuItems: data, selected: null } ],
			[ 'No selection with empty string', { menuItems: data, selected: null } ],
			[ 'Menu item with label selected', { menuItems: data, selected: 'a' } ],
			[ 'Menu item with no label selected', { menuItems: data, selected: 'c' } ],
			[ 'Menu item with icon selected', { menuItems: data, selected: 'e' } ],
			[ 'With Start icon', { menuItems: data, selected: null, defaultIcon: cdxIconSearch } ],
			[ 'With Start icon and selection', { menuItems: data, selected: 'c', defaultIcon: cdxIconSearch } ],
			[ 'With error status', { menuItems: data, selected: null, status: 'error' } ]
		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			async ( _, { menuItems, selected, defaultIcon = undefined, status = 'default' } ) => {
				const wrapper = mount( CdxSelect, {
					props: { menuItems, defaultLabel: 'Choose an option', selected, defaultIcon, status }
				} );
				// Make sure the selectedMenuItem is set.
				await nextTick();
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );

	describe( 'when the handle is clicked', () => {
		it( 'toggles the menu visibility', async () => {
			const wrapper = mount( CdxSelect, {
				props: {
					defaultLabel: 'Choose an option',
					menuItems: data,
					selected: null
				}
			} );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'click' );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
		} );

		describe( 'and the component is disabled', () => {
			it( 'does nothing', async () => {
				const wrapper = mount( CdxSelect, {
					props: {
						defaultLabel: 'Choose an option',
						menuItems: data,
						disabled: true,
						selected: null
					}
				} );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
				await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'click' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );
	} );

	describe( 'when an item is clicked', () => {
		it( 'emits an "update:selected" event with the correct "value"', async () => {
			const wrapper = mount( CdxSelect, {
				props: {
					defaultLabel: 'Choose an option',
					menuItems: data,
					selected: null
				}
			} );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'click' );
			await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
			expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
			expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
		} );

		it( 'closes the menu', async () => {
			const wrapper = mount( CdxSelect, {
				props: {
					defaultLabel: 'Choose an option',
					menuItems: data,
					selected: null
				}
			} );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'click' );
			await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'when there are menu groups', () => {
		describe( 'and an item is selected', () => {
			it( 'automatically shows the matching item as selected', async () => {
				const wrapper = mount( CdxSelect, {
					props: {
						defaultLabel: 'Choose an option',
						menuItems: dataWithGroups,
						selected: 'e'
					}
				} );
				await nextTick();
				expect( wrapper.find( '.cdx-select-vue__handle' ).text() ).toMatch( 'Option E' );
			} );
		} );
	} );

	describe( 'when the selected prop is updated', () => {
		it( 'shows that item as selected', async () => {
			const wrapper = mount( CdxSelect, {
				props: {
					selected: 'c',
					defaultLabel: 'Choose an option',
					menuItems: data
				}
			} );
			await wrapper.setProps( { selected: 'b' } );
			expect( wrapper.find( '.cdx-select-vue__handle' ).text() ).toMatch( 'Option B' );
		} );
	} );

	describe( 'when the Enter key is pressed', () => {
		it( 'expands the menu', async () => {
			const wrapper = mount( CdxSelect, {
				props: {
					selected: 'c',
					defaultLabel: 'Choose an option',
					menuItems: data
				}
			} );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'Enter' } );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
		} );

		describe( 'and the component is disabled', () => {
			it( 'does nothing', async () => {
				const wrapper = mount( CdxSelect, {
					props: {
						selected: 'c',
						defaultLabel: 'Choose an option',
						menuItems: data,
						disabled: true
					}
				} );
				await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and an item is highlighted', () => {
			it( 'emits an update event with the value of that item', async () => {
				const wrapper = mount( CdxSelect, {
					props: {
						defaultLabel: 'Choose an option',
						menuItems: data,
						selected: null
					}
				} );
				await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'Enter' } );
				await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
				await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
			} );
		} );
	} );

	describe( 'when the Esc key is pressed', () => {
		it( 'closes the menu', async () => {
			const wrapper = mount( CdxSelect, {
				props: {
					defaultLabel: 'Choose an option',
					menuItems: data,
					selected: null
				}
			} );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'Enter' } );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'Escape' } );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'when the component loses focus', () => {
		it( 'closes the menu', async () => {
			const wrapper = mount( CdxSelect, {
				props: {
					defaultLabel: 'Choose an option',
					menuItems: data,
					selected: null
				}
			} );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'keydown', { key: 'Enter' } );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			await wrapper.find( '.cdx-select-vue__handle' ).trigger( 'blur' );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
		} );
	} );
} );
