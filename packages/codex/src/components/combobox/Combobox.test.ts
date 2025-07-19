import { mount, enableAutoUnmount } from '@vue/test-utils';
import CdxCombobox from './Combobox.vue';
import CdxButton from '../button/Button.vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import CdxTextInput from '../text-input/TextInput.vue';
import { MenuItemData, ValidationStatusType } from '../../types';
import getMenuRoot from '../../testutils/getMenuRoot';

const data: MenuItemData[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: 'd', label: 'Option D', disabled: true }
];

const defaultProps: {
	selected: string,
	menuItems: MenuItemData[]
} = {
	selected: '',
	menuItems: []
};

const propsWithData: {
	selected: string,
	menuItems: MenuItemData[]
} = {
	selected: '',
	menuItems: data
};

describe( 'Combobox', () => {
	// To properly simulate some of the focus behavior that this component
	// relies upon, we need to attach it to a real element when mounting it.
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
				status?: ValidationStatusType,
			},
			attrs?: Record<string, unknown>
		]

		const cases: Case[] = [
			[ 'No selection', { menuItems: data, selected: '' } ],
			[ 'Menu item with label selected', { menuItems: data, selected: 'a' } ],
			[ 'Menu item with no label selected', { menuItems: data, selected: 'c' } ],
			[ 'Disabled', { menuItems: data, selected: '', disabled: true } ],
			[ 'With error status', { menuItems: data, selected: '', status: 'error' } ],
			[ 'With placeholder', { menuItems: data, selected: '' }, { placeholder: 'Choose an option' } ]
		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			( _, { menuItems, selected, disabled = false, status = 'default' }, attrs = {} ) => {
				const wrapper = mount( CdxCombobox, {
					props: { menuItems, selected, disabled, status },
					attrs,
					attachTo: '#root'
				} );
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );

	describe( 'when the button is clicked', () => {
		it( 'toggles the menu visibility', async () => {
			const wrapper = mount( CdxCombobox, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const expandButton = wrapper.findComponent( CdxButton );
			await expandButton.trigger( 'click' );
			expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
		} );

		describe( 'and the component is disabled', () => {
			it( 'does nothing', async () => {
				const wrapper = mount( CdxCombobox, {
					props: {
						...propsWithData,
						disabled: true
					},
					attachTo: '#root'
				} );
				const expandButton = wrapper.findComponent( CdxButton );
				await expandButton.trigger( 'click' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );
	} );

	describe( 'when an item is clicked', () => {
		it( 'emits an "update:selected" event with the correct "value"', async () => {
			const wrapper = mount( CdxCombobox, {
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
			const wrapper = mount( CdxCombobox, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const expandButton = wrapper.findComponent( CdxButton );
			await expandButton.trigger( 'click' );
			await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
			expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'when the user inputs text that does not correspond to an item value', () => {
		it( 'emits an "update:selected" event with the text value', async () => {
			const wrapper = mount( CdxCombobox, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const input = wrapper.findComponent( CdxTextInput );
			await input.setValue( 'test test' );
			expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ 'test test' ] );
		} );
	} );

	describe( 'when the input is focused', () => {
		it( 'expands the menu', async () => {
			const wrapper = mount( CdxCombobox, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const inputEl = wrapper.find( '.cdx-text-input input' );
			await inputEl.trigger( 'focus' );
			expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
		} );
	} );

	describe( 'when the input is blurred', () => {
		it( 'closes the menu', async () => {
			const wrapper = mount( CdxCombobox, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const inputEl = wrapper.find( '.cdx-text-input input' );
			await inputEl.trigger( 'focus' );
			await inputEl.trigger( 'blur' );
			expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'when the expander button is clicked', () => {
		describe( 'and the input is focused', () => {
			it( 'closes the menu', async () => {
				const wrapper = mount( CdxCombobox, {
					props: propsWithData,
					attachTo: '#root'
				} );
				const inputEl = wrapper.find( '.cdx-text-input input' );
				const expanderBtn = wrapper.findComponent( CdxButton );
				const menu = getMenuRoot( wrapper );
				await inputEl.trigger( 'focus' );
				expect( menu.isVisible() ).toBe( true );
				await expanderBtn.trigger( 'mousedown' );
				await expanderBtn.trigger( 'click' );
				expect( menu.isVisible() ).toBe( false );
			} );
		} );

		describe( 'and there are no items nor a "no results" message', () => {
			it( 'does not show the menu', async () => {
				const wrapper = mount( CdxCombobox, {
					props: defaultProps,
					attachTo: '#root'
				} );
				const expanderBtn = wrapper.findComponent( CdxButton );
				await expanderBtn.trigger( 'mousedown' );
				await expanderBtn.trigger( 'click' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the component is disabled', () => {
			it( 'does not show the menu', async () => {
				const wrapper = mount( CdxCombobox, {
					props: {
						...propsWithData,
						disabled: true
					},
					attachTo: '#root'
				} );
				const expanderBtn = wrapper.findComponent( CdxButton );
				await expanderBtn.trigger( 'mousedown' );
				await expanderBtn.trigger( 'click' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );
	} );

	describe( 'when the Enter key is pressed', () => {
		describe( 'and the menu is not expanded', () => {
			it( 'expands the menu', async () => {
				const wrapper = mount( CdxCombobox, {
					props: propsWithData,
					attachTo: '#root'
				} );
				const inputEl = wrapper.find( '.cdx-text-input input' );
				await inputEl.trigger( 'keydown', { key: 'Enter' } );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
			} );
		} );

		describe( 'and there is no data to display', () => {
			it( 'does not show the menu', async () => {
				const wrapper = mount( CdxCombobox, {
					props: defaultProps,
					attachTo: '#root'
				} );
				const inputEl = wrapper.find( '.cdx-text-input input' );
				await inputEl.trigger( 'keydown', { key: 'Enter' } );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );
	} );

	describe( 'when the Space key is pressed', () => {
		it( 'does not show the menu', async () => {
			const wrapper = mount( CdxCombobox, {
				props: propsWithData,
				attachTo: '#root'
			} );
			const inputEl = wrapper.find( '.cdx-text-input input' );
			await inputEl.trigger( 'keydown', { key: ' ' } );
			expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
		} );
	} );

	describe( 'when a native input event is triggered', () => {
		const eventNames = [
			'input',
			'change',
			'focus',
			'blur'
		];
		test.each( eventNames )( 'Case %#: emits %s event', async ( eventName ) => {
			const wrapper = mount( CdxCombobox, {
				props: defaultProps,
				attachTo: '#root'
			} );
			await wrapper.get( 'input' ).trigger( eventName );
			expect( wrapper.emitted()[ eventName ] ).toBeTruthy();
		} );
	} );
} );
