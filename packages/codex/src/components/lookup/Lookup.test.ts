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

const defaultProps: {
	selected: string | null,
	menuItems: MenuItemData[]
} = {
	selected: null,
	menuItems: []
};

const propsWithData: {
	selected: string | null,
	menuItems: MenuItemData[]
} = {
	selected: null,
	menuItems: data
};

describe( 'Basic usage', () => {
	type Case = [
		msg: string,
		menuItems: MenuItemData[],
		selected: string | null,
		initialInputValue?: string,
		disabled?: boolean,
		clearable?: boolean,
		noResults?: string,
		attributes?: Record<string, string>
	]

	const cases: Case[] = [
		[ 'Default', [], null ],
		[ 'With initial input', data, null, 'Opt' ],
		[ 'With selection', data, 'a', 'Option A' ],
		[ 'Disabled', [], null, '', true ],
		[ 'With no results content', [], null, 'asdf', false, false, 'No results' ],
		[ 'With class attributes', [], null, '', false, false, undefined, { class: 'class-one class-two' } ],
		[ 'With type and placeholder attributes', [], null, '', false, false, undefined, {
			inputType: 'search', placeholder: 'Type something... '
		} ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', (
		_,
		menuItems,
		selected,
		initialInputValue = '',
		disabled = false,
		clearable = false,
		noResults = undefined,
		attributes = undefined
	) => {
		const componentOptions = {
			props: { menuItems, selected, initialInputValue, disabled, clearable },
			slots: {},
			attrs: {}
		};
		if ( noResults ) {
			componentOptions.slots = { 'no-results': noResults };
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
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		expect( wrapper.vm.menuItems ).toEqual( [] );
	} );

	it( 'Sets pending to true on input if there is input text', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
		await nextTick();
		// Note that we can't check the pending ref because it's not returned by setup.
		expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );
	} );

	it( 'Does nothing on input if input is empty', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', '' );
		await nextTick();
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
	} );

	it( 'Opens menu on focus if there are items to show', async () => {
		const wrapper = mount( CdxLookup, {
			props: { ...propsWithData, initialInputValue: 'foo' }
		} );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Opens menu on focus and shows "no results" message if there is no-results slot content', async () => {
		const wrapper = mount( CdxLookup, {
			props: { ...defaultProps, initialInputValue: 'foo' },
			slots: { 'no-results': 'No results' }
		} );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( true );
		expect( wrapper.find( '.cdx-menu__no-results' ) ).toBeTruthy();
	} );

	it( 'Does nothing on focus if there are no items or no-results content', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Passes keyboard events to handler if Lookup is enabled and there are items to show', async () => {
		const wrapper = mount( CdxLookup, {
			props: propsWithData
		} );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Passes keyboard events to handler if Lookup is enabled and there is no-results content', async () => {
		const wrapper = mount( CdxLookup, {
			props: defaultProps,
			slots: { 'no-results': 'No results' }
		} );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Does nothing on keydown if Lookup is disabled', async () => {
		const wrapper = mount( CdxLookup, {
			props: { ...defaultProps, disabled: true }
		} );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Does nothing on keydown if there are no items or no-results content', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Follows default behavior on space keydown if menu is open', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		wrapper.vm.expanded = true;
		await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Sets pending to false and opens the menu when items change while input is focused', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		await wrapper.find( 'input' ).trigger( 'focus' );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
		await nextTick();
		expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );

		await wrapper.setProps( { menuItems: data } );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Sets pending to false but does not open menu when items change while input is not focused', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		await wrapper.find( 'input' ).trigger( 'focus' );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
		await nextTick();
		await wrapper.find( 'input' ).trigger( 'blur' );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );

		await wrapper.setProps( { menuItems: data } );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Does not open menu when items change while not in pending state', async () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );

		await wrapper.setProps( { menuItems: data } );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Closes menu if items change to empty', async () => {
		const wrapper = mount( CdxLookup, {
			props: propsWithData
		} );
		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// items, so we need to manually open the menu first.
		wrapper.vm.expanded = true;
		await wrapper.setProps( { menuItems: [] } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Leaves menu open if items change to empty but there is no-results content', async () => {
		const wrapper = mount( CdxLookup, {
			props: propsWithData,
			slots: { 'no-results': 'No results' }
		} );
		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// items, so we need to manually open the menu first.
		wrapper.vm.expanded = true;
		await wrapper.setProps( { menuItems: [] } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Closes menu when input is cleared', async () => {
		const wrapper = mount( CdxLookup, {
			props: { selected: 'a', menuItems: data, initialInputValue: 'Opt' }
		} );
		const input = wrapper.find( 'input' );

		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// items, so we need to manually open the menu first.
		wrapper.vm.expanded = true;

		input.element.value = '';
		await input.trigger( 'input' );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Sets input value to the label of the newly selected item, if it exists', async () => {
		const wrapper = mount( CdxLookup, {
			props: { ...propsWithData, initialInputValue: 'Opt' }
		} );
		await wrapper.setProps( { selected: 'a' } );
		expect( wrapper.vm.inputValue ).toBe( 'Option A' );
	} );

	it( 'Sets input value to the value of the newly selected item with no label', async () => {
		const wrapper = mount( CdxLookup, {
			props: { ...propsWithData, initialInputValue: 'Opt' }
		} );
		await wrapper.setProps( { selected: 'c' } );
		expect( wrapper.vm.inputValue ).toBe( 'c' );
	} );

	it( 'Emits input event when input is entered', () => {
		const wrapper = mount( CdxLookup, { props: defaultProps } );
		const textInputWrapper = wrapper.findComponent( CdxTextInput );
		textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'a' ] );
	} );

	it( 'Emits input event when input is cleared via the clear button', () => {
		const wrapper = mount( CdxLookup, {
			props: { ...defaultProps, initialInputValue: 'Option A', clearable: true }
		} );
		const clearButton = wrapper.find( '.cdx-text-input__clear-icon' ).element as HTMLSpanElement;
		clearButton.click();
		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ '' ] );
	} );

	it( 'Emits input event with the label of the newly selected item, if it exists', async () => {
		const wrapper = mount( CdxLookup, {
			props: propsWithData
		} );
		await wrapper.setProps( { selected: 'a' } );
		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'Option A' ] );
	} );

	it( 'Emits input event with the value of the newly selected item with no label', async () => {
		const wrapper = mount( CdxLookup, {
			props: propsWithData
		} );
		await wrapper.setProps( { selected: 'c' } );
		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'c' ] );
	} );

	it( 'Clears the selection if input value changes from selection label', async () => {
		const wrapper = mount( CdxLookup, {
			props: { selected: 'a', menuItems: data, initialInputValue: 'Option A' }
		} );
		const input = wrapper.find( 'input' );

		// Simulate backspace.
		input.element.value = 'Option ';
		await input.trigger( 'input' );

		expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
	} );

	it( 'Clears the selection if input value changes from selection value', async () => {
		const wrapper = mount( CdxLookup, {
			props: { selected: 'c', menuItems: data, initialInputValue: 'c' }
		} );
		const input = wrapper.find( 'input' );

		input.element.value = 'ca';
		await input.trigger( 'input' );

		expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
	} );
} );
