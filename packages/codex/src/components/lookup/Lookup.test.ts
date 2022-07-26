import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { CdxLookup, CdxTextInput } from '../../lib';
import { MenuItemData } from '../../types';

const menuItemData: {
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
	menuItems: menuItemData
};

describe( 'Lookup', () => {
	describe( 'matches the snapshot', () => {
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
			[ 'With initial input', menuItemData, null, 'Opt' ],
			[ 'With selection', menuItemData, 'a', 'Option A' ],
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

	describe( 'when the text input changes', () => {
		it( 'emits an input event', () => {
			const wrapper = mount( CdxLookup, { props: defaultProps } );
			const textInputWrapper = wrapper.findComponent( CdxTextInput );
			textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
			expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'a' ] );
		} );

		describe( 'and there is an input value', () => {
			it( 'enables the pending UI', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				const textInputWrapper = wrapper.findComponent( CdxTextInput );
				textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
				await nextTick();
				// Note that we can't check the pending ref because it's not returned by setup.
				expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );
			} );
		} );

		describe( 'and the input value is cleared', () => {
			it( 'does not enable the pending UI', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				const textInputWrapper = wrapper.findComponent( CdxTextInput );
				textInputWrapper.vm.$emit( 'update:modelValue', '' );
				await nextTick();
				expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
			} );

			it( 'closes the menu', async () => {
				const wrapper = mount( CdxLookup, {
					props: { selected: 'a', menuItems: menuItemData, initialInputValue: 'Opt' }
				} );
				const input = wrapper.find( 'input' );

				// This doesn't happen automatically on mount because we would never mount a Lookup
				// with items, so we need to manually open the menu first.
				wrapper.vm.expanded = true;

				input.element.value = '';
				await input.trigger( 'input' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the input value does not match the label of the current selection', () => {
			it( 'clears the selection', async () => {
				const wrapper = mount( CdxLookup, {
					props: { selected: 'a', menuItems: menuItemData, initialInputValue: 'Option A' }
				} );
				const input = wrapper.find( 'input' );

				// Simulate backspace.
				input.element.value = 'Option ';
				await input.trigger( 'input' );

				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
			} );
		} );

		describe( 'and the input value does not match the value of the current selection', () => {
			it( 'clears the selection', async () => {
				const wrapper = mount( CdxLookup, {
					props: { selected: 'c', menuItems: menuItemData, initialInputValue: 'c' }
				} );
				const input = wrapper.find( 'input' );

				input.element.value = 'ca';
				await input.trigger( 'input' );

				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
			} );
		} );
	} );

	describe( 'when the text input is focused', () => {
		describe( 'and there are menu items to show', () => {
			it( 'opens the menu', async () => {
				const wrapper = mount( CdxLookup, {
					props: { ...propsWithData, initialInputValue: 'foo' }
				} );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			} );
		} );

		describe( 'and there are no menu items to show', () => {
			it( 'does not open the menu', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );

			it( 'if there is no-results slot content, opens menu and shows "no results" message', async () => {
				const wrapper = mount( CdxLookup, {
					props: { ...defaultProps, initialInputValue: 'foo' },
					slots: { 'no-results': 'No results' }
				} );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
				expect( wrapper.find( '.cdx-menu__no-results' ).isVisible() ).toBe( true );
			} );
		} );
	} );

	describe( 'when keyboard events occur', () => {
		describe( 'and the Lookup is enabled', () => {
			it( 'if there are items to show, passes keyboard events to handler', async () => {
				const wrapper = mount( CdxLookup, {
					props: propsWithData
				} );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			} );

			it( 'if there is no-results content, passes keyboard events to handler', async () => {
				const wrapper = mount( CdxLookup, {
					props: defaultProps,
					slots: { 'no-results': 'No results' }
				} );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			} );

			it( 'if there are no items or no-results content, does not pass keyboard events to handler', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the Lookup is disabled', () => {
			it( 'does not pass keyboard events to handler', async () => {
				const wrapper = mount( CdxLookup, {
					props: { ...defaultProps, disabled: true }
				} );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );
	} );

	describe( 'when the menu is open and the space key is pressed', () => {
		it( 'follows default behavior (adds a space character) rather than toggling the menu', async () => {
			const wrapper = mount( CdxLookup, { props: defaultProps } );
			wrapper.vm.expanded = true;
			await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
			expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
		} );
	} );

	describe( 'when the menuItems prop changes', () => {
		describe( 'and the input is focused', () => {
			it( 'sets pending to false and opens the menu', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				const textInputWrapper = wrapper.findComponent( CdxTextInput );
				textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
				await nextTick();
				expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );

				await wrapper.setProps( { menuItems: menuItemData } );
				expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			} );
		} );

		describe( 'and the input is not focused', () => {
			it( 'sets pending to false and does not open menu', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				const textInputWrapper = wrapper.findComponent( CdxTextInput );
				textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
				await nextTick();
				await wrapper.find( 'input' ).trigger( 'blur' );
				expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );

				await wrapper.setProps( { menuItems: menuItemData } );
				expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the Lookup is not in the pending state', () => {
			it( 'does not open menu', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );

				await wrapper.setProps( { menuItems: menuItemData } );
				expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the new prop is an empty array', () => {
			it( 'closes the menu', async () => {
				const wrapper = mount( CdxLookup, {
					props: propsWithData
				} );
				// This doesn't happen automatically on mount because we would never mount a Lookup
				// with items, so we need to manually open the menu first.
				wrapper.vm.expanded = true;
				await wrapper.setProps( { menuItems: [] } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
			} );

			it( 'if there is no-results content, leaves the menu open', async () => {
				const wrapper = mount( CdxLookup, {
					props: propsWithData,
					slots: { 'no-results': 'No results' }
				} );
				// This doesn't happen automatically on mount because we would never mount a Lookup
				// with items, so we need to manually open the menu first.
				wrapper.vm.expanded = true;
				await wrapper.setProps( { menuItems: [] } );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			} );
		} );
	} );

	describe( 'when an item is selected', () => {
		describe( 'and the selected item has a label', () => {
			it( 'sets input value to the label of the selected item', async () => {
				const wrapper = mount( CdxLookup, {
					props: { ...propsWithData, initialInputValue: 'Opt' }
				} );
				await wrapper.setProps( { selected: 'a' } );
				expect( wrapper.vm.inputValue ).toBe( 'Option A' );
			} );

			it( 'emits an input event with the label of the selected item', async () => {
				const wrapper = mount( CdxLookup, {
					props: propsWithData
				} );
				await wrapper.setProps( { selected: 'a' } );
				expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'Option A' ] );
			} );
		} );

		describe( 'and the selected item does not have a label', () => {
			it( 'sets input value to the value of the selected item', async () => {
				const wrapper = mount( CdxLookup, {
					props: { ...propsWithData, initialInputValue: 'Opt' }
				} );
				await wrapper.setProps( { selected: 'c' } );
				expect( wrapper.vm.inputValue ).toBe( 'c' );
			} );

			it( 'emits an input event with the value of the selected item', async () => {
				const wrapper = mount( CdxLookup, {
					props: propsWithData
				} );
				await wrapper.setProps( { selected: 'c' } );
				expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'c' ] );
			} );
		} );
	} );

	describe( 'when the clear button is pressed', () => {
		it( 'emits an input event', () => {
			const wrapper = mount( CdxLookup, {
				props: { ...defaultProps, initialInputValue: 'Option A', clearable: true }
			} );
			const clearButton = wrapper.find( '.cdx-text-input__clear-icon' ).element as HTMLSpanElement;
			clearButton.click();
			expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ '' ] );
		} );
	} );
} );
