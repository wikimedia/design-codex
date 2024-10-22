import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CdxLookup from './Lookup.vue';
import CdxTextInput from '../text-input/TextInput.vue';
import { MenuItemData, MenuGroupData } from '../../types';

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

const menuItemDataWithGroups: ( MenuItemData|MenuGroupData )[] = [
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

describe( 'Lookup', () => {
	// DEPRECATED: Remove initialInputValue once the prop is removed (T373532).
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			menuItems: MenuItemData[],
			selected: string | null,
			inputValue?: string,
			disabled?: boolean,
			clearable?: boolean,
			noResults?: string,
			attributes?: Record<string, string>,
			initialInputValue?: string,
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
			} ],
			[ 'With initial input (deprecated)', menuItemData, null, '', false, false, undefined, {}, 'Opt' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', (
			_,
			menuItems,
			selected,
			inputValue = '',
			disabled = false,
			clearable = false,
			noResults = undefined,
			attributes = undefined,
			initialInputValue = ''
		) => {
			const componentOptions = {
				props: { menuItems, selected, inputValue, disabled, clearable, initialInputValue },
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
			expect( wrapper.emitted( 'update:input-value' ) ).toBeFalsy();
			expect( wrapper.emitted( 'update:selected' ) ).toBeFalsy();
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

			it( 'clears the existing pending state', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				const textInputWrapper = wrapper.findComponent( CdxTextInput );
				textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
				await nextTick();
				expect( wrapper.find( '.cdx-lookup' ).classes() ).toContain( 'cdx-lookup--pending' );

				textInputWrapper.vm.$emit( 'update:modelValue', '' );
				await nextTick();
				expect( wrapper.find( '.cdx-lookup' ).classes() ).not.toContain( 'cdx-lookup--pending' );
			} );

			describe( 'and there were no initial menu items', () => {
				it( 'closes the menu', async () => {
					const wrapper = mount( CdxLookup, { props: defaultProps } );
					// Set input.
					const input = wrapper.find( 'input' );
					input.element.value = 'Opt';
					await input.trigger( 'input' );
					// Open the menu.
					wrapper.vm.expanded = true;
					// Add menu items.
					await wrapper.setProps( { menuItems: menuItemData } );
					// Clear the input.
					input.element.value = '';
					await input.trigger( 'input' );
					expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( false );
				} );
			} );

			describe( 'and there were initial menu items', () => {
				it( 'does not close the menu', async () => {
					const wrapper = mount( CdxLookup, { props: propsWithData } );
					// Set input.
					const input = wrapper.find( 'input' );
					input.element.value = 'Opt';
					await input.trigger( 'input' );
					// Open the menu.
					wrapper.vm.expanded = true;
					// Clear the input.
					input.element.value = '';
					await input.trigger( 'input' );
					expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
				} );
			} );
		} );

		describe( 'and the input value does not match the label of the current selection', () => {
			it( 'clears the selection', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				// Set selected, which will update the input value.
				await wrapper.setProps( { selected: 'a' } );

				// Simulate backspace.
				const input = wrapper.find( 'input' );
				input.element.value = 'Option ';
				await input.trigger( 'input' );

				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
			} );
		} );

		describe( 'and the input value does not match the value of the current selection', () => {
			it( 'clears the selection', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				// Set selected, which will update the input value.
				await wrapper.setProps( { selected: 'c' } );

				const input = wrapper.find( 'input' );
				input.element.value = 'ca';
				await input.trigger( 'input' );

				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
			} );
		} );
	} );

	describe( 'when the text input is focused', () => {
		describe( 'and there are initial menu items', () => {
			it( 'opens the menu', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
			} );
		} );

		describe( 'and there is both input and menu items', () => {
			it( 'opens the menu', async () => {
				const wrapper = mount( CdxLookup, { props: defaultProps } );
				// Set input.
				const input = wrapper.find( 'input' );
				input.element.value = 'foo';
				await input.trigger( 'input' );
				// Add menu items.
				await wrapper.setProps( { menuItems: menuItemData } );
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
					props: defaultProps,
					slots: { 'no-results': 'No results' }
				} );
				// Set input.
				const input = wrapper.find( 'input' );
				input.element.value = 'foo';
				await input.trigger( 'input' );
				// Trigger focus.
				await input.trigger( 'focus' );
				expect( wrapper.find( '.cdx-menu' ).isVisible() ).toBe( true );
				expect( wrapper.find( '.cdx-menu__no-results' ).isVisible() ).toBe( true );
			} );
		} );
	} );

	describe( 'when keyboard events occur', () => {
		describe( 'and the Lookup is enabled', () => {
			it( 'if there are items to show, passes keyboard events to handler', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
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

			it( 'does not pass the space keyboard event to handler', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
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
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				await wrapper.setProps( { selected: 'a' } );
				expect( wrapper.vm.computedInputValue ).toBe( 'Option A' );
			} );

			it( 'emits an input event with the label of the selected item', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				await wrapper.setProps( { selected: 'a' } );
				expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'Option A' ] );
			} );
		} );

		describe( 'and the selected item does not have a label', () => {
			it( 'sets input value to the value of the selected item', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				await wrapper.setProps( { selected: 'c' } );
				expect( wrapper.vm.computedInputValue ).toBe( 'c' );
			} );

			it( 'emits an input event with the value of the selected item', async () => {
				const wrapper = mount( CdxLookup, { props: propsWithData } );
				await wrapper.setProps( { selected: 'c' } );
				expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'c' ] );
			} );
		} );

		describe( 'and there are menu groups', () => {
			it( 'sets input value to the label of the selected item', async () => {
				const wrapper = mount( CdxLookup, { props: {
					menuItems: menuItemDataWithGroups,
					selected: null
				} } );
				await wrapper.setProps( { selected: 'a' } );
				expect( wrapper.vm.computedInputValue ).toBe( 'Option A' );
			} );

			it( 'emits an input event with the label of the selected item', async () => {
				const wrapper = mount( CdxLookup, { props: {
					menuItems: menuItemDataWithGroups,
					selected: null
				} } );
				await wrapper.setProps( { selected: 'a' } );
				expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'Option A' ] );
			} );
		} );
	} );

	describe( 'when the clear button is pressed', () => {
		it( 'emits an input event', async () => {
			const wrapper = mount( CdxLookup, {
				props: { ...defaultProps, clearable: true }
			} );
			const input = wrapper.find( 'input' );
			input.element.value = 'Option ';
			await input.trigger( 'input' );

			const clearButton = wrapper.find( '.cdx-text-input__clear-icon' ).element as HTMLSpanElement;
			clearButton.click();
			expect( wrapper.emitted( 'input' )?.[ 1 ] ).toEqual( [ '' ] );
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
			const wrapper = mount( CdxLookup, { props: defaultProps } );

			await wrapper.get( 'input' ).trigger( eventName );
			expect( wrapper.emitted()[ eventName ] ).toBeTruthy();
		} );
	} );

	// DEPRECATED: Remove once the initialInputValue prop is removed (T373532).
	describe( 'with initialInputValue', () => {
		it( 'is overridden by inputValue', () => {
			const wrapper = mount( CdxLookup, { props:
				{ inputValue: 'foo', initialInputValue: 'bar', ...defaultProps }
			} );
			const input = wrapper.find( 'input' );
			expect( input.element.value ).toBe( 'foo' );
		} );
	} );

	describe( 'with inputValue', () => {
		describe( 'when text is added to the input', () => {
			it( 'emits an update:input-value event', () => {
				const wrapper = mount( CdxLookup, { props: { inputValue: '', ...defaultProps } } );
				const textInputWrapper = wrapper.findComponent( CdxTextInput );
				textInputWrapper.vm.$emit( 'update:modelValue', 'a' );
				expect( wrapper.emitted( 'update:input-value' )?.[ 0 ] ).toEqual( [ 'a' ] );
			} );
		} );

		// See T370504.
		describe( 'when the current selection does not match a menu item', () => {
			describe( 'and the text input is cleared', () => {
				it( 'clears the selection', async () => {
					const wrapper = mount( CdxLookup, {
						props: { selected: 'c', menuItems: [], inputValue: 'c' }
					} );
					const input = wrapper.find( 'input' );

					input.element.value = '';
					await input.trigger( 'input' );

					expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
				} );
			} );

			describe( 'and the text input changes', () => {
				it( 'clears the selection', async () => {
					const wrapper = mount( CdxLookup, {
						props: { selected: 'a', menuItems: [], inputValue: 'Option A' }
					} );
					const input = wrapper.find( 'input' );

					input.element.value = 'Option ';
					await input.trigger( 'input' );

					expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ null ] );
				} );
			} );
		} );

		describe( 'when the clear button is pressed', () => {
			it( 'emits an update:input-value event', () => {
				const wrapper = mount( CdxLookup, {
					props: { ...defaultProps, inputValue: 'Option A', clearable: true }
				} );
				const clearButton = wrapper.find( '.cdx-text-input__clear-icon' ).element as HTMLSpanElement;
				clearButton.click();
				expect( wrapper.emitted( 'update:input-value' )?.[ 0 ] ).toEqual( [ '' ] );
			} );
		} );
	} );
} );
