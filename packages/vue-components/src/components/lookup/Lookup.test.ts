import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { CdxLookup } from '../../lib';
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
		options,
		modelValue,
		initialInputValue = '',
		disabled = false,
		clearable = false,
		footerContent = undefined,
		attributes = undefined
	) => {
		const componentOptions = {
			props: { options, modelValue, initialInputValue, disabled, clearable },
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

describe( 'Select', () => {
	it( 'Defaults to an empty array of options', () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		expect( wrapper.vm.options ).toEqual( [] );
	} );

	it( 'Sets pending to true on input if there is input text', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		await wrapper.find( 'input' ).trigger( 'input', { data: 'a' } );
		// Note that we can't check the pending ref because it's not returned by setup.
		expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );
	} );

	it( 'Does nothing on input if input is empty', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		await wrapper.find( 'input' ).trigger( 'input' );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
	} );

	it( 'Opens menu on focus if there are options to show', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', options: data }
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

	it( 'Does nothing on focus if there are no options or footer content', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		await wrapper.find( 'input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Passes keyboard events to handler if Lookup is enabled and there are options to show', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', options: data }
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

	it( 'Does nothing on keydown if there are no options or footer content', async () => {
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

	it( 'Sets pending to false when options change', async () => {
		const wrapper = mount( CdxLookup, { props: { modelValue: '' } } );
		await wrapper.find( 'input' ).trigger( 'input', { data: 'a' } );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );

		await wrapper.setProps( { options: data } );
		expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
	} );

	it( 'Sets expanded to true if there are options and the input value does not match the selection', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', initialInputValue: 'Opt' }
		} );
		await wrapper.setProps( { options: data } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Does not set expanded to true if there are options but the input value matches the selection', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', initialInputValue: 'Option A' }
		} );
		await wrapper.setProps( { options: data } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Closes menu if options change to empty', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', options: data }
		} );
		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// options, so we need to manually open the menu first.
		wrapper.vm.expanded = true;
		await wrapper.setProps( { options: [] } );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Leaves menu open if options change to empty but there is footer content', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', options: data },
			slots: { footer: 'No results' }
		} );
		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// options, so we need to manually open the menu first.
		wrapper.vm.expanded = true;
		await wrapper.setProps( { options: [] } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Closes menu when input is cleared', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', options: data, initialInputValue: 'Opt' }
		} );
		// This doesn't happen automatically on mount because we would never mount a Lookup with
		// options, so we need to manually open the menu first.
		wrapper.vm.expanded = true;
		wrapper.vm.inputValue = '';
		await nextTick();
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Sets input value to the label of the newly selected option, if it exists', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', options: data, initialInputValue: 'Opt' }
		} );
		await wrapper.setProps( { modelValue: 'a' } );
		expect( wrapper.vm.inputValue ).toBe( 'Option A' );
	} );

	it( 'Sets input value to the value of the newly selected option with no label', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: '', options: data, initialInputValue: 'Opt' }
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

	it( 'Clears the selection if input value changes from selection label', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'a', options: data, initialInputValue: 'Option A' }
		} );

		// Simulate backspace.
		wrapper.vm.inputValue = 'Option ';
		await nextTick();
		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ null ] );
	} );

	it( 'Clears the selection if input value changes from selection value', async () => {
		const wrapper = mount( CdxLookup, {
			props: { modelValue: 'c', options: data, initialInputValue: 'c' }
		} );

		wrapper.vm.inputValue = 'ca';
		await nextTick();
		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ null ] );
	} );
} );
