import { mount, enableAutoUnmount } from '@vue/test-utils';
import { CdxCombobox, CdxButton, CdxOption, CdxTextInput } from '../../lib';

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
	// To properly simulate some of the focus behavior that this component
	// relies upon, we need to attach it to a real element when mounting it.
	beforeEach( () => {
		const div = document.createElement( 'div' );
		div.id = 'root';
		document.body.appendChild( div );
	} );

	// Automatically destroy each wrapper after each test
	enableAutoUnmount( afterEach );

	it( 'Displays the default label when no option has been selected if a "placeholder" attribute is present', () => {
		const wrapper = mount( CdxCombobox, {
			props: {
				options: data
			},
			attrs: {
				placeholder: 'Choose an option'
			},
			attachTo: '#root'
		} );
		expect( wrapper.find( '.cdx-combobox__input input' ).attributes().placeholder ).toBe( 'Choose an option' );
	} );

	it( 'Clicking the button toggles the menu visibility', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxButton );
		await expandButton.trigger( 'click' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( true );
	} );

	it( 'Clicking the button does nothing if component is disabled', async () => {
		const wrapper = mount( CdxCombobox, {
			props: {
				options: data,
				disabled: true
			},
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxButton );
		await expandButton.trigger( 'click' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking an option emits an "update:modelValue" event with the correct "value"', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxButton );
		await expandButton.trigger( 'click' );
		await wrapper.findAllComponents( CdxOption )[ 0 ].trigger( 'click' );
		expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeTruthy();
		expect( wrapper.emitted()[ 'update:modelValue' ][ 0 ] ).toEqual( [ data[ 0 ].value ] );
	} );

	it( 'Clicking an option closes the menu', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxButton );
		await expandButton.trigger( 'click' );
		await wrapper.findAllComponents( CdxOption )[ 0 ].trigger( 'click' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking a disabled option does not close the menu and does not emit any events', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const expandButton = wrapper.findComponent( CdxButton );
		await expandButton.trigger( 'click' );
		await wrapper.findAllComponents( CdxOption )[ 3 ].trigger( 'click' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( true );
		expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeFalsy();
	} );

	it( 'Allows the user to input arbitrary text that does not correspond to any option value', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const input = wrapper.findComponent( CdxTextInput );
		await input.setValue( 'test test' );
		expect( wrapper.emitted()[ 'update:modelValue' ][ 0 ] ).toEqual( [ 'test test' ] );
	} );

	it( 'Inital focus inside the text input should expand the menu', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const inputEl = wrapper.find( '.cdx-text-input input' );
		await inputEl.trigger( 'focus' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( true );
	} );

	it( 'Blurring the text input should close the menu', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const inputEl = wrapper.find( '.cdx-text-input input' );
		await inputEl.trigger( 'focus' );
		await inputEl.trigger( 'blur' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking the expander button after input is focused should result in the menu being closed', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const inputEl = wrapper.find( '.cdx-text-input input' );
		const expanderBtn = wrapper.findComponent( CdxButton );
		await inputEl.trigger( 'focus' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( true );
		await expanderBtn.trigger( 'mousedown' );
		await expanderBtn.trigger( 'click' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking the expander will not show menu if neither options nor footer content are present', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: [] },
			attachTo: '#root'
		} );
		const expanderBtn = wrapper.findComponent( CdxButton );
		await expanderBtn.trigger( 'mousedown' );
		await expanderBtn.trigger( 'click' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Clicking the expander will not show menu if component is disabled', async () => {
		const wrapper = mount( CdxCombobox, {
			props: {
				options: data,
				disabled: true
			},
			attachTo: '#root'
		} );
		const expanderBtn = wrapper.findComponent( CdxButton );
		await expanderBtn.trigger( 'mousedown' );
		await expanderBtn.trigger( 'click' );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( false );
	} );

	it( 'Disabled class is present if the disabled prop is provided', () => {
		const wrapper = mount( CdxCombobox, {
			props: {
				options: data,
				disabled: true
			},
			attachTo: '#root'
		} );
		expect( wrapper.classes() ).toContain( 'cdx-combobox--disabled' );
	} );

	it( 'Disabled class is not present if the disabled prop is not provided', () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		expect( wrapper.classes() ).not.toContain( 'cdx-combobox--disabled' );
	} );

	it( 'Enter keydown expands the menu if it is not already expanded', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const inputEl = wrapper.find( '.cdx-text-input input' );
		await inputEl.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( true );
	} );

	it( 'Enter keydown does not expand the menu if there is no data to display', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: [] },
			attachTo: '#root'
		} );
		const inputEl = wrapper.find( '.cdx-text-input input' );
		await inputEl.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.find( '.cdx-combobox__menu' ).isVisible() ).toBe( false );
	} );

	it( 'User can choose an option via keyboard interaction', async () => {
		const wrapper = mount( CdxCombobox, {
			props: { options: data },
			attachTo: '#root'
		} );
		const inputEl = wrapper.find( '.cdx-text-input input' );
		await inputEl.trigger( 'keydown', { key: 'Enter' } );
		await inputEl.trigger( 'keydown', { key: 'ArrowDown' } );
		await inputEl.trigger( 'keydown', { key: 'ArrowDown' } );
		await inputEl.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.emitted()[ 'update:modelValue' ][ 0 ] ).toEqual( [ data[ 1 ].value ] );
	} );
} );
