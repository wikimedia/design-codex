import { mount } from '@vue/test-utils';
import { CdxSelect, CdxOption } from '../../lib';
import { MenuOption } from '../../types';

const data: {
	value: string,
	label?: string,
	disabled?: boolean
}[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: 'd', label: 'Option D', disabled: true }
];

describe( 'Basic usage', () => {
	type Case = [
		msg: string,
		options: MenuOption[],
		defaultLabel?: string,
		modelValue?: string|number
	]

	const cases: Case[] = [
		[ 'No selection', data, 'Choose an option', undefined ],
		[ 'Option with label selected', data, 'Choose an option', 'a' ],
		[ 'Option with no label selected', data, 'Choose an option', 'c' ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => HTML',
		( _, options, defaultLabel, modelValue ) => {
			const wrapper = mount( CdxSelect, {
				props: { options, defaultLabel, modelValue }
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
} );

describe( 'Select', () => {
	it( 'Displays the default label when no option has been selected', () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		expect( wrapper.find( '.cdx-select__handle' ).text() ).toMatch( 'Choose an option' );
	} );

	it( 'Clicking the handle toggles the menu visibility', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( false );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'click' );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
	} );

	it( 'Clicking the handle does nothing if disabled', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data,
				disabled: true
			}
		} );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( false );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'click' );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking an option emits an "update:modelValue" event with the correct "value"', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'click' );
		await wrapper.findAllComponents( CdxOption )[ 0 ].trigger( 'click' );
		expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeTruthy();
		expect( wrapper.emitted()[ 'update:modelValue' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
	} );

	it( 'Clicking an option closes the menu', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'click' );
		await wrapper.findAllComponents( CdxOption )[ 0 ].trigger( 'click' );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking a disabled option does not close the menu and does not emit any events', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'click' );
		await wrapper.findAllComponents( CdxOption )[ 3 ].trigger( 'click' );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
		expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeFalsy();
	} );

	it( 'If a modelValue is provided it automatically shows the matching option as selected', () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data,
				modelValue: 'b'
			}
		} );
		expect( wrapper.find( '.cdx-select__handle' ).text() ).toMatch( data[ 1 ].label || data[ 1 ].value );
	} );

	it( 'If the modelValue prop is updated in the parent, the component updates itself to the new value', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.setProps( { modelValue: 'b' } );
		expect( wrapper.find( '.cdx-select__handle' ).text() ).toMatch( data[ 1 ].label || data[ 1 ].value );
	} );

	it( 'If the modelValue prop is updated in the parent, no update events are emitted', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.setProps( { modelValue: 'b' } );
		expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeFalsy();
	} );

	it( 'Enter keydown expands the menu if it is not already expanded', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
	} );

	it( 'Enter keydown sets the selected menu item to "highlighted" if a selection is present', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
	} );

	it( 'Enter keydown does nothing when disabled', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data,
				disabled: true
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Down arrow keydown sets the next menu item to "highlighted"', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).toContain( 'cdx-option--highlighted' );
	} );

	it( 'Down arrow keydown handled properly when menu is closed and nothing selected', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
		expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).not.toContain( 'cdx-option--highlighted' );
	} );

	it( 'Down arrow keydown handled properly when menu is closed and selection present', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
		expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
	} );

	it( 'Down arrow keydown skips disabled elements and loops around to the beginning if necessary', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).toContain( 'cdx-option--highlighted' );
	} );

	it( 'Up arrow keydown sets the previous menu item to "highlighted"', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowUp' } );
		expect( wrapper.findAllComponents( CdxOption )[ 1 ].classes() ).toContain( 'cdx-option--highlighted' );
	} );

	it( 'Up arrow keydown handled properly when menu is closed and nothing selected', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowUp' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
		expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).not.toContain( 'cdx-option--highlighted' );
	} );

	it( 'Up arrow keydown handled properly when menu is closed and selection present', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'c',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowUp' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
		expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
	} );

	it( 'Up arrow keydown skips disabled elements and loops around to the end if necessary', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				modelValue: 'a',
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowUp' } );
		expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
	} );

	it( 'Enter keydown after navigating to a new option emits an update event with the value of that option', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.emitted()[ 'update:modelValue' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
	} );

	it( 'Tab key after navigating to a new option emits an update event with the value of that option', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Tab' } );
		expect( wrapper.emitted()[ 'update:modelValue' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
	} );

	it( 'Esc keydown closes the menu', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Escape' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Blur event closes the menu', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( true );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'blur' );
		expect( wrapper.find( '.cdx-select__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Highlight state is not preserved after menu is closed', async () => {
		const wrapper = mount( CdxSelect, {
			props: {
				defaultLabel: 'Choose an option',
				options: data
			}
		} );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).toContain( 'cdx-option--highlighted' );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'blur' );
		await wrapper.find( '.cdx-select__handle' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).not.toContain( 'cdx-option--highlighted' );
	} );
} );
