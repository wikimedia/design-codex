import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import CdxMultiselectLookup from './MultiselectLookup.vue';
import CdxInputChip from '../input-chip/InputChip.vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import { ChipInputItem, MenuItemData, MenuItemValue, MenuGroupData, ValidationStatusType } from '../../types';
import getMenuRoot from '../../testutils/getMenuRoot';

const menuItems: {
	value: string,
	label?: string
}[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: 'd', label: 'Option D' }
];

const veggies: {
	value: string,
	label?: string
}[] = [
	{ label: 'potato', value: 'Q10998' },
	{ label: 'carrot', value: 'Q81' },
	{ label: 'cauliflower', value: 'Q23900272' }
];

const defaultProps: {
	inputChips: ChipInputItem[],
	selected: MenuItemValue[],
	menuItems: MenuItemData[]
} = {
	inputChips: [],
	selected: [],
	menuItems: []
};

const inputChips: ChipInputItem[] = [
	{ value: 'chip1' },
	{ value: 'chip 2', label: 'Chip 2' }
];

const menuItemsWithGroups: ( MenuItemData|MenuGroupData )[] = [
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

describe( 'MultiselectLookup', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				inputChips: ChipInputItem[],
				selected: MenuItemValue[],
				menuItems: MenuItemData[],
				inputValue?: string|number,
				separateInput?: boolean,
				status?: ValidationStatusType,
				disabled?: boolean,
			}
		];

		const cases: Case[] = [
			[ 'Default props', defaultProps ],
			[ 'With menu items', { ...defaultProps, menuItems } ],
			[ 'With input chips', { ...defaultProps, inputChips } ],
			[ 'With input value', { ...defaultProps, inputValue: 'Foo' } ],
			[ 'With separate input', { ...defaultProps, inputChips, separateInput: true } ],
			[ 'With error', { ...defaultProps, inputChips, status: 'error' } ],
			[ 'Disabled', { ...defaultProps, inputChips, disabled: true } ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
			const wrapper = mount( CdxMultiselectLookup, { props } );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when the text input changes', () => {
		it( 'emits an input event', async () => {
			const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
			const input = wrapper.find( 'input' );
			input.element.value = 'Opt';
			await input.trigger( 'input' );

			expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'Opt' ] );
			expect( wrapper.emitted( 'update:input-value' ) ).toBeFalsy();
		} );

		describe( 'and the inputValue prop was provided', () => {
			it( 'emits an update:input-value event', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, inputValue: '' }
				} );
				const input = wrapper.find( 'input' );
				input.element.value = 'Opt';
				await input.trigger( 'input' );
				expect( wrapper.emitted( 'update:input-value' )?.[ 0 ] ).toEqual( [ 'Opt' ] );
			} );
		} );

		describe( 'and there is input', () => {
			it( 'enables the pending UI', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
				const input = wrapper.find( 'input' );
				input.element.value = 'Opt';
				await input.trigger( 'input' );
				await nextTick();
				// Note that we can't check the pending ref because it's not returned by setup.
				expect( wrapper.element.classList ).toContain( 'cdx-multiselect-lookup--pending' );
			} );
		} );

		describe( 'and there is no input (i.e. input was cleared)', () => {
			it( 'does not enable the pending UI', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, inputValue: '' }
				} );
				const input = wrapper.find( 'input' );
				input.element.value = '';
				await input.trigger( 'input' );
				await nextTick();
				// Note that we can't check the pending ref because it's not returned by setup.
				expect( wrapper.element.classList ).not.toContain( 'cdx-multiselect-lookup--pending' );
			} );
		} );
	} );

	describe( 'when the text input is focused', () => {
		describe( 'and there are initial menu items', () => {
			it( 'opens the menu', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, menuItems }
				} );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
			} );
		} );

		describe( 'and there are menu items to show', () => {
			it( 'opens the menu', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
				// Set input.
				const input = wrapper.find( 'input' );
				input.element.value = 'foo';
				await input.trigger( 'input' );
				// Add menu items.
				await wrapper.setProps( { menuItems } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
			} );
		} );

		describe( 'and there are no menu items to show', () => {
			it( 'does not open the menu', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );

			describe( 'and there is no-results slot content', () => {
				it( 'opens menu and shows "no results" message if there is input', async () => {
					const wrapper = mount( CdxMultiselectLookup, {
						props: defaultProps,
						slots: { 'no-results': 'No results' }
					} );
					// Set input.
					const input = wrapper.find( 'input' );
					const menu = getMenuRoot( wrapper );
					input.element.value = 'foo';
					await input.trigger( 'input' );
					// Trigger focus.
					await input.trigger( 'focus' );
					expect( menu.isVisible() ).toBe( true );
					expect( menu.find( '.cdx-menu__no-results' ).isVisible() ).toBe( true );
				} );

				it( 'does not open menu nor show "no results" message if there is no input', async () => {
					const wrapper = mount( CdxMultiselectLookup, {
						props: defaultProps,
						slots: { 'no-results': 'No results' }
					} );
					const menu = getMenuRoot( wrapper );
					// Trigger focus.
					await wrapper.find( 'input' ).trigger( 'focus' );
					expect( menu.isVisible() ).toBe( false );
					expect( menu.find( '.cdx-menu__no-results' ).isVisible() ).toBe( false );
				} );
			} );
		} );
	} );

	describe( 'when keyboard events occur', () => {
		describe( 'and the Lookup is enabled', () => {
			it( 'does not pass keyboard events to handler', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );

			describe( 'and there are menu items to show', () => {
				it( 'if there are items to show, passes keyboard events to handler', async () => {
					const wrapper = mount( CdxMultiselectLookup, {
						props: { ...defaultProps, menuItems }
					} );
					await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
					expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
				} );
			} );

			describe( 'and there is no-results slot content', () => {
				it( 'passes keyboard events to handler if there is input', async () => {
					const wrapper = mount( CdxMultiselectLookup, {
						props: defaultProps,
						slots: { 'no-results': 'No results' }
					} );
					// Set input.
					const input = wrapper.find( 'input' );
					input.element.value = 'foo';
					await input.trigger( 'input' );
					await input.trigger( 'keydown', { key: 'Enter' } );
					expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
				} );

				it( 'does not pass keyboard events to handler if there is no input', async () => {
					const wrapper = mount( CdxMultiselectLookup, {
						props: defaultProps,
						slots: { 'no-results': 'No results' }
					} );
					await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
					expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
				} );
			} );

			it( 'does not pass the space keyboard event to handler', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, menuItems }
				} );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the Lookup is disabled', () => {
			it( 'does not pass keyboard events to handler', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, disabled: true }
				} );
				await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );
	} );

	describe( 'when the menu is open and the space key is pressed', () => {
		it( 'follows default behavior (adds a space character) rather than toggling the menu', async () => {
			const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
			wrapper.vm.expanded = true;
			await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
			expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
		} );
	} );

	describe( 'when the menuItems prop changes', () => {
		describe( 'and the input is focused', () => {
			it( 'sets pending to false and opens the menu', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				const input = wrapper.find( 'input' );
				input.element.value = 'Opt';
				await input.trigger( 'input' );
				await nextTick();
				expect( wrapper.element.classList ).toContain( 'cdx-multiselect-lookup--pending' );

				await wrapper.setProps( { menuItems } );
				expect( wrapper.element.classList ).not.toContain( 'cdx-multiselect-lookup--pending' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
			} );
		} );

		describe( 'and the input is not focused', () => {
			it( 'sets pending to false and does not open menu', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				const input = wrapper.find( 'input' );
				input.element.value = 'Opt';
				await input.trigger( 'input' );
				await nextTick();
				await wrapper.find( 'input' ).trigger( 'blur' );
				expect( wrapper.element.classList ).toContain( 'cdx-multiselect-lookup--pending' );

				await wrapper.setProps( { menuItems } );
				expect( wrapper.element.classList ).not.toContain( 'cdx-multiselect-lookup--pending' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the Lookup is not in the pending state', () => {
			it( 'does not open menu', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: defaultProps } );
				await wrapper.find( 'input' ).trigger( 'focus' );
				expect( wrapper.element.classList ).not.toContain( 'cdx-multiselect-lookup--pending' );

				await wrapper.setProps( { menuItems } );
				expect( wrapper.element.classList ).not.toContain( 'cdx-multiselect-lookup--pending' );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );
		} );

		describe( 'and the new prop is an empty array', () => {
			it( 'closes the menu', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, menuItems }
				} );
				// This doesn't happen automatically on mount because we would never mount a Lookup
				// with items, so we need to manually open the menu first.
				wrapper.vm.expanded = true;
				await wrapper.setProps( { menuItems: [] } );
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
			} );

			describe( 'and there is no-results slot content', () => {
				it( 'leaves the menu open if there is input', async () => {
					const wrapper = mount( CdxMultiselectLookup, {
						props: { ...defaultProps, menuItems },
						slots: { 'no-results': 'No results' }
					} );
					const input = wrapper.find( 'input' );
					input.element.value = 'Opt';
					await input.trigger( 'input' );
					wrapper.vm.expanded = true;
					await wrapper.setProps( { menuItems: [] } );
					expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );
				} );

				it( 'closes the menu open if there is no input', async () => {
					const wrapper = mount( CdxMultiselectLookup, {
						props: { ...defaultProps, menuItems },
						slots: { 'no-results': 'No results' }
					} );
					wrapper.vm.expanded = true;
					await wrapper.setProps( { menuItems: [] } );
					expect( getMenuRoot( wrapper ).isVisible() ).toBe( false );
				} );
			} );
		} );
	} );

	describe( 'when an item is selected', () => {
		it( 'emits "update:input-value" and "input" events', async () => {
			const wrapper = mount( CdxMultiselectLookup, {
				props: { ...defaultProps, menuItems, inputValue: 'foo' }
			} );
			await wrapper.setProps( { selected: [ 'b' ] } );
			expect( wrapper.emitted( 'update:input-value' )?.[ 0 ] ).toEqual( [ '' ] );
			expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ '' ] );
			expect( wrapper.emitted()[ 'update:expanded' ] ).toBeFalsy();
		} );

		describe( 'and the keepInputOnSelection prop is set to true', () => {
			it( 'allows multiple selection based on the search term', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, veggies, inputValue: 'c', keepInputOnSelection: true }
				} );

				await wrapper.setProps( { menuItems: [ { label: 'carrot', value: 'Q81' }, { label: 'cauliflower', value: 'Q23900272' } ] } );
				wrapper.vm.expanded = true;
				await wrapper.setProps( { selected: [ 'Q81' ] } );

				// Assert that the menu remains open after selection.
				expect( wrapper.emitted()[ 'update:expanded' ] ).toBeFalsy();
				expect( getMenuRoot( wrapper ).isVisible() ).toBe( true );

				// Assert that the input is not cleared.
				expect( wrapper.find( 'input' ).element.value ).toBe( 'c' );
			} );
		} );

		describe( 'and the selected item has a label', () => {
			it( 'emits an update:input-chips event with a chip that has a label and a value', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, menuItems }
				} );
				await wrapper.setProps( { selected: [ 'b' ] } );
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { label: 'Option B', value: 'b' } ] ] );
				// Simulate v-model.
				await wrapper.setProps( { inputChips: [ { label: 'Option B', value: 'b' } ] } );
				await wrapper.setProps( { selected: [ 'b', 'a' ] } );
				expect( wrapper.emitted( 'update:input-chips' )?.[ 1 ] ).toEqual( [ [
					{ label: 'Option B', value: 'b' },
					{ label: 'Option A', value: 'a' }
				] ] );
			} );
		} );

		describe( 'and the selected item does not have a label', () => {
			it( 'emits an update:input-chips event with a chip that has only a value', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, menuItems }
				} );
				await wrapper.setProps( { selected: [ 'c' ] } );
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { value: 'c' } ] ] );
			} );
		} );

		describe( 'and there are menu groups', () => {
			it( 'emits an update:input-chips event with proper chip data', async () => {
				const wrapper = mount( CdxMultiselectLookup, {
					props: { ...defaultProps, menuItems: menuItemsWithGroups }
				} );
				await wrapper.setProps( { selected: [ 'a' ] } );
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { label: 'Option A', value: 'a' } ] ] );
				// Simulate v-model.
				await wrapper.setProps( { inputChips: [ { label: 'Option A', value: 'a' } ] } );
				await wrapper.setProps( { selected: [ 'a', 'c' ] } );
				expect( wrapper.emitted( 'update:input-chips' )?.[ 1 ] ).toEqual( [ [
					{ label: 'Option A', value: 'a' }, { value: 'c' }
				] ] );
			} );
		} );
	} );

	describe( 'when an item is de-selected', () => {
		describe( 'via the menu', () => {
			it( 'emits update:selected and update:input-chips events', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: {
					menuItems,
					selected: [ 'a', 'b' ],
					inputChips: [ { label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' } ]
				} } );
				// Click the first menu item.
				await wrapper.findComponent( CdxMenuItem ).trigger( 'click' );
				// Which should trigger an update:selected event.
				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ [ 'b' ] ] );
				// Simulate v-model.
				await wrapper.setProps( { selected: [ 'b' ] } );
				// Which should trigger an update:input-chips event removing the chip.
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { label: 'Option B', value: 'b' } ] ] );
			} );
		} );

		describe( 'via the input chip', () => {
			it( 'emits update:input-chips and update:selected events', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: {
					menuItems,
					selected: [ 'a', 'b' ],
					inputChips: [ { label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' } ]
				} } );
				// Click the close button of the first chip.
				await wrapper.findComponent( CdxInputChip ).find( 'button' ).trigger( 'click' );
				// Which should trigger an update:input-chips event.
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toEqual( [ [ { label: 'Option B', value: 'b' } ] ] );
				// Simulate v-model.
				await wrapper.setProps( { inputChips: [ { label: 'Option B', value: 'b' } ] } );
				// Which should trigger an update:selected event removing the chip's value.
				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toEqual( [ [ 'b' ] ] );
			} );

			it( 'does not emit update:input-chips nor update:selected events when readonly', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: {
					menuItems,
					selected: [ 'a', 'b' ],
					inputChips: [ { label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' } ],
					readonly: true
				} } );
				// Click the close button of the first chip.
				await wrapper.findComponent( CdxInputChip ).find( 'button' ).trigger( 'click' );
				// The click event should not trigger an update:input-chips event.
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toBeFalsy();
				// The click event should not trigger an update:selected event.
				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toBeFalsy();
			} );

			it( 'does not emit update:input-chips nor update:selected events when disabled', async () => {
				const wrapper = mount( CdxMultiselectLookup, { props: {
					menuItems,
					selected: [ 'a', 'b' ],
					inputChips: [ { label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' } ],
					disabled: true
				} } );
				// Click the close button of the first chip.
				await wrapper.findComponent( CdxInputChip ).find( 'button' ).trigger( 'click' );
				// The click event should not trigger an update:input-chips event.
				expect( wrapper.emitted( 'update:input-chips' )?.[ 0 ] ).toBeFalsy();
				// The click event should not trigger an update:selected event.
				expect( wrapper.emitted( 'update:selected' )?.[ 0 ] ).toBeFalsy();
			} );
		} );
	} );

	describe( 'when a chip is clicked', () => {
		it( 'emits a chip-click event', async () => {
			const wrapper = mount( CdxMultiselectLookup, { props: {
				menuItems,
				selected: [ 'a', 'b' ],
				inputChips: [ { label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' } ]
			} } );
			// Click the first chip.
			await wrapper.findComponent( CdxInputChip ).trigger( 'click' );
			expect( wrapper.emitted( 'chip-click' ) ).toBeTruthy();
			expect( wrapper.emitted( 'chip-click' )?.[ 0 ] ).toEqual( [ { label: 'Option A', value: 'a' } ] );
		} );
	} );
} );
