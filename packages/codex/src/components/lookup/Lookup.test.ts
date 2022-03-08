import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { CdxLookup, CdxTextInput } from '../../lib';
import { MenuItemData } from '../../types';

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
		menuItems: MenuItemData[],
		modelValue: string,
		initialInputValue?: string,
		disabled?: boolean,
		clearable?: boolean,
		footerContent?: string,
		attributes?: Record<string, string>
	]

	const cases: Case[] = [
		[ 'Default', [], '' ],
		[ 'With initial input', data, '', 'Opt' ],
		[ 'With selection', data, 'a', 'Option A' ],
		[ 'Disabled', [], '', '', true ],
		[ 'With footer content', [], '', 'asdf', false, false, 'No results' ],
		[ 'With class attributes', [], '', '', false, false, undefined, { class: 'class-one class-two' } ],
		[ 'With type and placeholder attributes', [], '', '', false, false, undefined, {
			inputType: 'search', placeholder: 'Type something... '
		} ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', (
		_,
		menuItems,
		modelValue,
		initialInputValue = '',
		disabled = false,
		clearable = false,
		footerContent = undefined,
		attributes = undefined
	) => {
		const componentOptions = {
			props: { menuItems, modelValue, initialInputValue, disabled, clearable },
			slots: {},
			attrs: {}
		};
		if ( footerContent ) {
			componentOptions.slots = { footer: footerContent };
		}
		if ( attributes ) {
			componentOptions.attrs = attributes;
		}

		const wrapper = mount( CdxLookup, componentOptions );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'Lookup', () => {
	it( 'Defaults to an empty array of menu items', () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		expect( wrapper.vm.menuItems ).toEqual( [] );
	} );

	it( 'Sets pending to true on input if there is input text', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
		await nextTick();
		// Note that we can't check the pending ref because it's not returned by setup.
		expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );
	} );

	it( 'Does nothing on input if input is empty', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', '' );
		await nextTick();
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
	} );

	it( 'Opens menu on focus if there are items to show', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', menuItems: data }
		} );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Opens menu on focus if there is footer slot content', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '' },
			slots: { footer: 'No results' }
		} );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Does nothing on focus if there are no items or footer content', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Passes keyboard events to handler if Lookup is enabled and there are items to show', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', menuItems: data }
		} );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Passes keyboard events to handler if Lookup is enabled and there is footer content', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '' },
			slots: { footer: 'No results' }
		} );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Does nothing on keydown if Lookup is disabled', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', disabled: true }
		} );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Does nothing on keydown if there are no items or footer content', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Follows default behavior on space keydown if menu is open', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		wrapper.vm.expanded = true;
		await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Sets pending to false when items change', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
		await nextTick();
		expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );

		await wrapper.setProps( { menuItems: data } );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
	} );

	it( 'Sets expanded to true if there are items and the input value does not match the selection', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', initialInputValue: 'Opt' }
		} );
		await wrapper.setProps( { menuItems: data } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Does not set expanded to true if there are items but the input value matches the selection', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', initialInputValue: 'Option A' }
		} );
		await wrapper.setProps( { menuItems: data } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Closes menu if items change to empty', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', menuItems: data }
		} );
		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// items, so we need to manually open the menu first.
		wrapper.vm.expanded = true;
		await wrapper.setProps( { menuItems: [] } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Leaves menu open if items change to empty but there is footer content', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', menuItems: data },
			slots: { footer: 'No results' }
		} );
		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// items, so we need to manually open the menu first.
		wrapper.vm.expanded = true;
		await wrapper.setProps( { menuItems: [] } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Closes menu when input is cleared', () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', menuItems: data, initialInputValue: 'Opt' }
		} );
		const input = wrapper.find( 'input' );

		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// items, so we need to manually open the menu first.
		wrapper.vm.expanded = true;

		input.element.value = '';
		input.trigger( 'input' );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Sets input value to the label of the newly selected item, if it exists', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', menuItems: data, initialInputValue: 'Opt' }
		} );
		await wrapper.setProps( { modelValue: 'a' } );
		expect( wrapper.vm.inputValue ).toBe( 'Option A' );
	} );

	it( 'Sets input value to the value of the newly selected item with no label', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', menuItems: data, initialInputValue: 'Opt' }
		} );
		await wrapper.setProps( { modelValue: 'c' } );
		expect( wrapper.vm.inputValue ).toBe( 'c' );
	} );

	it( 'Sets input value empty if the selection is cleared', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', initialInputValue: 'Option A' }
		} );
		await wrapper.setProps( { modelValue: '' } );
		expect( wrapper.vm.inputValue ).toBe( '' );
	} );

	it( 'Emits new-input event when input is entered', () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
		expect( wrapper.emitted( 'new-input' )?.[ 0 ] ).toEqual( [ 'a' ] );
	} );

	it( 'Emits new-input event when input is cleared via the clear button', () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', initialInputValue: 'Option A', clearable: true }
		} );
		const clearButton = wrapper.find( '.cdx-text-input__end-icon' ).element as HTMLSpanElement;
		clearButton.click();
		expect( wrapper.emitted( 'new-input' )?.[ 0 ] ).toEqual( [ '' ] );
	} );

	it( 'Clears the selection if input value changes from selection label', () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', menuItems: data, initialInputValue: 'Option A' }
		} );
		const input = wrapper.find( 'input' );

		// Simulate backspace.
		input.element.value = 'Option ';
		input.trigger( 'input' );

		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ null ] );
	} );

	it( 'Clears the selection if input value changes from selection value', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'c', menuItems: data, initialInputValue: 'c' }
		} );
		const input = wrapper.find( 'input' );

		input.element.value = 'ca';
		input.trigger( 'input' );

		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ null ] );
	} );
} );
