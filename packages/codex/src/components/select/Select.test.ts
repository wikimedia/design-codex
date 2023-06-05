import { mount } from '@vue/test-utils';
import CdxSelect from './Select.vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import { Icon, cdxIconSearch } from '@wikimedia/codex-icons';
import { MenuItemData, ValidationStatusType } from '../../types';

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

describe( 'Basic usage', () => {
	type Case = [
		msg: string,
		menuItems: MenuItemData[],
		selected: string|number|null,
		defaultLabel?: string,
		defaultIcon?: Icon,
		status?: ValidationStatusType
	]

	const cases: Case[] = [
		[ 'No selection', data, null, 'Choose an option' ],
		[ 'No selection with empty string', data, null, 'Choose an option' ],
		[ 'Menu item with label selected', data, 'a', 'Choose an option' ],
		[ 'Menu item with no label selected', data, 'c', 'Choose an option' ],
		[ 'Menu item with icon selected', data, 'e', 'Choose an option' ],
		[ 'With Start icon', data, null, 'Choose an option', cdxIconSearch ],
		[ 'With Start icon and selection', data, 'c', 'Choose an option', cdxIconSearch ],
		[ 'With error status', data, null, 'Choose an option', undefined, 'error' ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => HTML',
		( _, menuItems, selected, defaultLabel, defaultIcon = undefined, status = 'default' ) => {
			const wrapper = mount( CdxSelect, {
				props: { menuItems, defaultLabel, selected, defaultIcon, status }
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
} );

describe( 'Select', () => {
	it( 'Displays the default label when no menu item has been selected', () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				menuItems: data,
				selected: null
			}
		} );
		expect( wrapper.find( '.cdx-select-vue__handle' ).text() ).toMatch( 'Choose an option' );
	} );

	it( 'Clicking the handle toggles the menu visibility', async () => {
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

	it( 'Clicking the handle does nothing if disabled', async () => {
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

	it( 'Clicking a menu item emits an "update:selected" event with the correct "value"', async () => {
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

	it( 'Clicking a menu item closes the menu', async () => {
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

	it( 'If a selected is provided it automatically shows the matching item as selected', () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				menuItems: data,
				selected: 'b'
			}
		} );
		expect( wrapper.find( '.cdx-select-vue__handle' ).text() ).toMatch( data[ 1 ].label || data[ 1 ].value );
	} );

	it( 'If the selected prop is updated in the parent, the component updates itself to the new value', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				selected: 'c',
				defaultLabel: 'Choose an option',
				menuItems: data
			}
		} );
		await wrapper.setProps( { selected: 'b' } );
		expect( wrapper.find( '.cdx-select-vue__handle' ).text() ).toMatch( data[ 1 ].label || data[ 1 ].value );
	} );

	it( 'Enter keydown expands the menu if it is not already expanded', async () => {
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

	it( 'Enter keydown does nothing when disabled', async () => {
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

	it( 'Enter keydown after navigating to a new item emits an update event with the value of that item', async () => {
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

	it( 'Esc keydown closes the menu', async () => {
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

	it( 'Blur event closes the menu', async () => {
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
