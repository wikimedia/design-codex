import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import CdxMenu from './Menu.vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import { MenuItemData, MenuItemValue } from '../../types';

const exampleMenuItems: MenuItemData[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: '', label: 'Empty String' },
	{ value: 0, label: 'Number 0' },
	{ value: 'd', label: 'Option D', disabled: true }
];

const defaultProps = {
	menuItems: exampleMenuItems,
	selected: null,
	expanded: true
};

const multiselectProps = {
	menuItems: exampleMenuItems,
	selected: [],
	expanded: true
};

async function delegateKeydownEvent(
	wrapper: VueWrapper<InstanceType<typeof CdxMenu>>,
	key: string
) {
	const menu = wrapper.vm;
	const handled = menu.delegateKeyNavigation(
		new KeyboardEvent( 'keydown', { key } ),
		{ characterNavigation: true }
	);
	expect( handled ).toBe( true );
	await nextTick();
}

describe( 'Menu', () => {
	// Jest doesn't support the scrollIntoView method in jsdom, which is used by our Menu component.
	// We stub it here to prevent errors.
	beforeAll( () => {
		window.HTMLElement.prototype.scrollIntoView = jest.fn();
	} );

	describe( 'matches the snapshots', () => {
		type Case = [
			msg: string,
			menuItems: MenuItemData[],
			selected: MenuItemValue|MenuItemValue[]|null,
			expanded?: boolean,
			showPending?: boolean,
			slots?: {
				default?: string,
				'no-results'?: string,
				pending?: string
			}
		];

		const cases: Case[] = [
			[ 'Nothing selected', exampleMenuItems, null ],
			[ 'Something selected', exampleMenuItems, 'b' ],
			[ 'Multiselect, nothing selected', exampleMenuItems, [] ],
			[ 'Multiselect, something selected', exampleMenuItems, [ 'b' ] ],
			[ 'Not expanded', exampleMenuItems, 'b', false ],
			[ 'With no results text', [], null, true, false, { 'no-results': 'No results' } ],
			[ 'Pending', [], null, true, true, { pending: 'Loading...' } ],
			[ 'Pending with items', exampleMenuItems, null, true, true, { pending: 'Loading...' } ],
			[ 'Custom menu item rendering', exampleMenuItems, 'b', true, false, {
				default: `
					<template #default="{ menuItem }">
						{{ menuItem.label }} (value: {{ menuItem.value }})
					</template>
				`
			} ]
		];

		test.each( cases )( 'Case %# %s: => HTML', (
			_, menuItems, selected, expanded = true, showPending = false, slots = {}
		) => {
			const wrapper = mount( CdxMenu, {
				props: { menuItems, selected, expanded, showPending },
				slots
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when a menu item is selected via click', () => {
		describe( 'and the menu is in single-select mode', () => {
			it( 'emits an "update:selected" event with the correct "selectedValue"', async () => {
				const wrapper = mount( CdxMenu, { props: defaultProps } );
				await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
				expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleMenuItems[ 0 ].value ] );
			} );

			it( 'emits an "update:expanded" event indicating the menu should be closed', async () => {
				const wrapper = mount( CdxMenu, { props: defaultProps } );
				await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
				expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ false ] );
			} );
		} );

		describe( 'and the menu is in multiselect mode', () => {
			it( 'emits an "update:selected" event with the correct "selectedValue"', async () => {
				const wrapper = mount( CdxMenu, { props: multiselectProps } );
				await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
				expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ [ exampleMenuItems[ 0 ].value ] ] );

				// Simulate v-model.
				await wrapper.setProps( { selected: [ exampleMenuItems[ 0 ].value ] } );
				await wrapper.findAllComponents( CdxMenuItem )[ 1 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:selected' ][ 1 ] ).toEqual( [ [
					exampleMenuItems[ 0 ].value,
					exampleMenuItems[ 1 ].value
				] ] );
			} );

			it( 'does not emit an "update:expanded" event', async () => {
				const wrapper = mount( CdxMenu, { props: multiselectProps } );
				await wrapper.findAllComponents( CdxMenuItem )[ 0 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:expanded' ] ).toBeFalsy();
			} );
		} );

		describe( 'and the value is 0', () => {
			it( 'emits an "update:selected" event with the correct "selectedValue"', async () => {
				const wrapper = mount( CdxMenu, { props: {
					...defaultProps,
					menuItems: exampleMenuItems
				} } );
				await wrapper.findAllComponents( CdxMenuItem )[ 4 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
				expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleMenuItems[ 4 ].value ] );
			} );
		} );

		describe( 'and the value is an empty string', () => {
			it( 'emits an "update:selected" event with the correct "selectedValue"', async () => {
				const wrapper = mount( CdxMenu, { props: {
					...defaultProps,
					menuItems: exampleMenuItems
				} } );
				await wrapper.findAllComponents( CdxMenuItem )[ 3 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
				expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleMenuItems[ 3 ].value ] );
			} );
		} );

		describe( 'and the menu item is disabled', () => {
			it( 'does not emit any events', async () => {
				const wrapper = mount( CdxMenu, { props: defaultProps } );
				await wrapper.findAllComponents( CdxMenuItem )[ 5 ].trigger( 'click' );
				expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeFalsy();
				expect( wrapper.emitted()[ 'update:expanded' ] ).toBeFalsy();
			} );
		} );
	} );

	describe( 'when the selected prop is updated by the parent', () => {
		describe( 'and the menu is in single-select mode', () => {
			it( 'adds selected styles to the selected item', async () => {
				const wrapper = mount( CdxMenu, { props: {
					...defaultProps,
					selected: 'c'
				} } );
				expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--selected' );
				await wrapper.setProps( { selected: 'b' } );
				expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--selected' );
				expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).not.toContain( 'cdx-menu-item--selected' );
			} );
		} );

		describe( 'and the menu is in multiselect mode', () => {
			it( 'adds selected styles to the selected item(s)', async () => {
				const wrapper = mount( CdxMenu, { props: {
					...multiselectProps,
					selected: [ 'c' ]
				} } );
				expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--selected' );
				await wrapper.setProps( { selected: [ 'c', 'b' ] } );
				expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--selected' );
				expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--selected' );
			} );
		} );

		it( 'no update events are emitted', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'c'
			} } );
			await wrapper.setProps( { selected: 'b' } );
			expect( wrapper.emitted()[ 'update:selected' ] ).toBeFalsy();
		} );
	} );

	describe( 'when the user presses Enter', () => {
		it( 'expands the menu if it is not already expanded', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				expanded: false
			} } );
			await delegateKeydownEvent( wrapper, 'Enter' );
			expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
			expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
		} );

		describe( 'and a selection is present', () => {
			describe( 'and the menu is in single-select mode', () => {
				it( 'sets the selected menu item to "highlighted" if a selection is present', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						selected: 'c',
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'Enter' );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );

			describe( 'and the menu is in multiselect mode', () => {
				it( 'sets the first selected menu item to "highlighted" if a selection is present', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						selected: [ 'b', 'c' ],
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'Enter' );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );

		} );

		describe( 'and a menu item is highlighted via the keyboard', () => {
			it( 'emits an update event with the value of that item', async () => {
				const wrapper = mount( CdxMenu, { props: {
					...defaultProps,
					selected: 'b',
					expanded: false
				} } );
				// Enter opens the menu and highlights the selected item
				await delegateKeydownEvent( wrapper, 'Enter' );
				// Simulate the parent responding to the update:expanded event
				await wrapper.setProps( { expanded: true } );

				await delegateKeydownEvent( wrapper, 'ArrowDown' );
				await delegateKeydownEvent( wrapper, 'Enter' );
				expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleMenuItems[ 2 ].value ] );
			} );

			describe( 'and the menu is in single-select mode', () => {
				it( 'closes the menu', async () => {
					const wrapper = mount( CdxMenu, { props: defaultProps } );
					await delegateKeydownEvent( wrapper, 'ArrowDown' );
					await delegateKeydownEvent( wrapper, 'Enter' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ false ] );
				} );
			} );

			describe( 'and the menu is in multiselect mode', () => {
				it( 'does not close the menu', async () => {
					const wrapper = mount( CdxMenu, { props: multiselectProps } );
					await delegateKeydownEvent( wrapper, 'ArrowDown' );
					await delegateKeydownEvent( wrapper, 'Enter' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeFalsy();
				} );
			} );
		} );

		describe( 'and a menu item is highlighted via the mouse', () => {
			it( 'does not select that item', async () => {
				const wrapper = mount( CdxMenu, { props: {
					...defaultProps,
					expanded: false
				} } );
				// Enter opens the menu
				await delegateKeydownEvent( wrapper, 'Enter' );
				// Simulate the parent responding to the update:expanded event
				await wrapper.setProps( { expanded: true } );

				// Highlight first menu item via hover.
				const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];
				await firstMenuItem.trigger( 'mousemove' );
				expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject(
					exampleMenuItems[ 0 ]
				);

				await delegateKeydownEvent( wrapper, 'Enter' );

				expect( wrapper.emitted()[ 'update:selected' ] ).toBeUndefined();
			} );
		} );
	} );

	describe( 'when the user presses the Down arrow', () => {
		it( 'sets the next menu item to "highlighted"', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'a',
				expanded: false
			} } );
			// Enter highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			// Pressing ArrowDown highlights the next item
			await delegateKeydownEvent( wrapper, 'ArrowDown' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		it( 'skips disabled elements and loops around to the beginning if necessary', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 0 // This is the entry before the disabled menuItem
			} } );
			await delegateKeydownEvent( wrapper, 'ArrowDown' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		describe( 'and the menu is closed', () => {
			describe( 'and the menu is in single-select mode', () => {
				it( 'does not highlight an item if nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowDown' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'highlights the selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						selected: 'c',
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowDown' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );

			describe( 'and the menu is in multiselect mode', () => {
				it( 'does not highlight an item if nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowDown' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'highlights the first selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						selected: [ 'b', 'c' ],
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowDown' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );
		} );
	} );

	describe( 'when the user presses the Up arrow', () => {
		it( 'sets the previous menu item to "highlighted"', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'c',
				expanded: false
			} } );
			// Enter highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			// Pressing ArrowUp again highlights the previous item
			await delegateKeydownEvent( wrapper, 'ArrowUp' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		it( 'skips disabled elements and loops around to the end if necessary', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'a',
				expanded: false
			} } );
			// Enter highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			await delegateKeydownEvent( wrapper, 'ArrowUp' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 4 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		describe( 'and the menu is closed', () => {
			describe( 'and the menu is in single-select mode', () => {
				it( 'does not highlight an item if nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowUp' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'highlights the selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						selected: 'c',
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowUp' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );

			describe( 'and the menu is in multiselect mode', () => {
				it( 'does not highlight an item if nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowUp' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'highlights the first selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						selected: [ 'b', 'c' ],
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'ArrowUp' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );
		} );
	} );

	describe( 'when the user presses the Home arrow', () => {
		it( 'sets the first menu item to "highlighted"', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'c',
				expanded: false
			} } );
			// Enter highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			// Pressing Home highlight the first item
			await delegateKeydownEvent( wrapper, 'Home' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		it( 'skips disabled elements', async () => {
			// Perform a deep copy and change first entry to disabled
			const updateMenuItems = JSON.parse( JSON.stringify( exampleMenuItems ) );
			updateMenuItems[ 0 ].disabled = true;

			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems: updateMenuItems,
				selected: 'c',
				expanded: false
			} } );
			// Enter highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			await delegateKeydownEvent( wrapper, 'Home' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		describe( 'and the menu is closed', () => {
			describe( 'and the menu is in single-select mode', () => {
				it( 'opens menu but does not highlight an item if nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'Home' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'opens menu and highlights the selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						selected: 'c',
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'Home' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );

			describe( 'and the menu is in multiselect mode', () => {
				it( 'opens menu but does not highlight an item if nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'Home' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'opens menu and highlights the first selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						selected: [ 'b', 'c' ],
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'Home' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );
		} );
	} );

	describe( 'when the user presses the End arrow', () => {
		it( 'sets the last menu item to "highlighted"', async () => {
			// Performs a deep copy and changes the last entry to not be disabled
			const updateMenuItems = JSON.parse( JSON.stringify( exampleMenuItems ) );
			updateMenuItems[ 5 ].disabled = false;

			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems: updateMenuItems,
				selected: 'c',
				expanded: false
			} } );
			// Enter highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			// Pressing End highlight the last item
			await delegateKeydownEvent( wrapper, 'End' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 5 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		it( 'skips disabled elements', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'c',
				expanded: false
			} } );
			// Enter highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			await delegateKeydownEvent( wrapper, 'End' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 4 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
		} );

		describe( 'and the menu is closed', () => {
			describe( 'and the menu is in single-select mode', () => {
				it( 'opens menu but does not highlight an item when nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'End' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'opens menu and highlights the selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...defaultProps,
						selected: 'c',
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'End' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 2 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );

			describe( 'and the menu is in multiselect mode', () => {
				it( 'opens menu but does not highlight an item when nothing is selected', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'End' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
				} );

				it( 'opens menu and highlights the first selected item', async () => {
					const wrapper = mount( CdxMenu, { props: {
						...multiselectProps,
						selected: [ 'b', 'c' ],
						expanded: false
					} } );
					await delegateKeydownEvent( wrapper, 'End' );
					expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
					expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
					// Simulate the parent responding to the update:expanded event
					await wrapper.setProps( { expanded: true } );
					expect( wrapper.findAllComponents( CdxMenuItem )[ 1 ].classes() ).toContain( 'cdx-menu-item--highlighted' );
				} );
			} );
		} );
	} );

	describe( 'when the user navigates to a new item and presses Tab', () => {
		it( 'emits an update event with the value of that item', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'b',
				expanded: false
			} } );
			// Enter opens the menu and highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			await delegateKeydownEvent( wrapper, 'ArrowDown' );
			await delegateKeydownEvent( wrapper, 'Tab' );
			expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleMenuItems[ 2 ].value ] );
		} );
	} );

	describe( 'when the user presses Esc', () => {
		it( 'closes the menu', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			await delegateKeydownEvent( wrapper, 'Escape' );
			expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ false ] );
		} );
	} );

	describe( 'when the user types characters', () => {
		afterEach( () => {
			jest.useRealTimers();
		} );

		it( 'highlights the first matching item', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			await delegateKeydownEvent( wrapper, 'e' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( exampleMenuItems[ 3 ] );
		} );

		it( 'highlights the first item matching all typed characters', async () => {
			const menuItems = [
				{ value: 'Foo' },
				{ value: 'Blah' },
				{ value: 'Bar' },
				{ value: 'Bleh' }
			];
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems
			} } );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			await delegateKeydownEvent( wrapper, 'l' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			await delegateKeydownEvent( wrapper, 'e' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
		} );

		it( 'cycles through items starting with the same letter when a letter is typed repeatedly', async () => {
			const menuItems = [
				{ value: 'Blah' },
				{ value: 'Foo' },
				{ value: 'Bar' },
				{ value: 'Bleh' }
			];
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems
			} } );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
		} );

		it( 'still allows typing prefixes that start with repeated letters', async () => {
			const menuItems = [
				{ value: 'Blah' },
				{ value: 'Foo' },
				{ value: 'Bbbbbbrrr' },
				{ value: 'Bleh' }
			];
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems
			} } );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'r' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
		} );

		it( 'Backspace erases a typed character', async () => {
			const menuItems = [
				{ value: 'Foo' },
				{ value: 'Blah' },
				{ value: 'Bar' },
				{ value: 'Bleh' }
			];
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems
			} } );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			await delegateKeydownEvent( wrapper, 'a' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
			await delegateKeydownEvent( wrapper, 'Backspace' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
			await delegateKeydownEvent( wrapper, 'l' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			await delegateKeydownEvent( wrapper, 'e' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'Backspace' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'Backspace' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'Backspace' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'f' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
		} );

		it( 'Clear erases all typed characters', async () => {
			const menuItems = [
				{ value: 'Foo' },
				{ value: 'Blah' },
				{ value: 'Bar' },
				{ value: 'Bleh' }
			];
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems
			} } );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			await delegateKeydownEvent( wrapper, 'l' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			await delegateKeydownEvent( wrapper, 'e' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'Clear' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 3 ] );
			await delegateKeydownEvent( wrapper, 'f' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
		} );

		it( 'all typed characters are forgotten after the timeout elapses', async () => {
			jest.useFakeTimers();

			const menuItems = [
				{ value: 'Foo' },
				{ value: 'Bar' },
				{ value: 'Bfoo' }
			];
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems
			} } );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			jest.advanceTimersByTime( 1400 );
			await delegateKeydownEvent( wrapper, 'f' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 2 ] );
			jest.advanceTimersByTime( 1500 );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 1 ] );
			jest.advanceTimersByTime( 1500 );
			await delegateKeydownEvent( wrapper, 'f' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( menuItems[ 0 ] );
		} );

		it( 'does not change the highlight if there are no matching items', async () => {
			const menuItems = [
				{ value: 'Foo' },
				{ value: 'Blah' },
				{ value: 'Bar' },
				{ value: 'Bleh' }
			];
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				menuItems
			} } );
			await delegateKeydownEvent( wrapper, 'x' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toBe( null );
			await delegateKeydownEvent( wrapper, 'b' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toBe( null );
		} );

		it( 'opens the menu', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				expanded: false
			} } );
			await delegateKeydownEvent( wrapper, 'n' );
			expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
			await wrapper.setProps( { expanded: true } );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( exampleMenuItems[ 4 ] );
		} );

		it( 'opens the menu even if the typed character does not match any items', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				expanded: false
			} } );
			await delegateKeydownEvent( wrapper, 'x' );
			expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
			await wrapper.setProps( { expanded: true } );
			expect( wrapper.vm.getHighlightedMenuItem() ).toBe( null );
		} );
	} );

	describe( 'delegateKeyNavigation returns true or false correctly', () => {
		const wrapper = mount( CdxMenu, { props: defaultProps } );

		test.each( [ ' ', 'Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'Escape', 'Home', 'End' ] )( 'Returns true for "%s"', ( key ) => {
			expect( wrapper.vm.delegateKeyNavigation( new KeyboardEvent( 'keydown', { key } ), { characterNavigation: true } ) ).toBe( true );
		} );

		test.each( [ 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Delete' ] )( 'Returns false for "%s"', ( key ) => {
			expect( wrapper.vm.delegateKeyNavigation( new KeyboardEvent( 'keydown', { key } ), { characterNavigation: true } ) ).toBe( false );
		} );

		test.each( [ 'Backspace', 'Clear', 'x', '2' ] )( 'Returns false for "%s" when characterNavigation is false', ( key ) => {
			expect( wrapper.vm.delegateKeyNavigation( new KeyboardEvent( 'keydown', { key } ) ) ).toBe( false );
		} );

		test.each( [ 'Backspace', 'Clear', 'x', '2' ] )( 'Returns true for "%s" when characterNavigation is true', ( key ) => {
			expect( wrapper.vm.delegateKeyNavigation( new KeyboardEvent( 'keydown', { key } ), { characterNavigation: true } ) ).toBe( true );
		} );
	} );

	describe( 'when the user highlights a menu item via the keyboard', () => {
		it( 'emits a menu-item-keyboard-navigation event', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'b',
				expanded: false
			} } );
			// Enter highlights the first item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );

			await delegateKeydownEvent( wrapper, 'ArrowDown' );
			expect(
				wrapper.emitted()[ 'menu-item-keyboard-navigation' ][ 0 ]
			).toMatchObject(
				[ exampleMenuItems[ 2 ] ]
			);
		} );

		it( 'gets the right highlighted menu item via getHighlightedMenuItem', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				selected: 'b',
				expanded: false
			} } );
			expect( wrapper.vm.getHighlightedMenuItem() ).toBe( null );
			// Enter opens the menu and highlights the selected item
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( exampleMenuItems[ 1 ] );

			await delegateKeydownEvent( wrapper, 'ArrowDown' );
			expect( wrapper.vm.getHighlightedMenuItem() ).toMatchObject( exampleMenuItems[ 2 ] );

			// Close the menu
			await wrapper.setProps( { expanded: false } );
			expect( wrapper.vm.getHighlightedMenuItem() ).toBe( null );
		} );

		it( 'clears the highlight state after the menu is closed', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				expanded: false
			} } );
			// Enter opens the menu; first item is not highlighted.
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );

			// ArrowDown highlights the first item.
			await delegateKeydownEvent( wrapper, 'ArrowDown' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).toContain( 'cdx-menu-item--highlighted' );

			// Close the menu
			await wrapper.setProps( { expanded: false } );

			expect( wrapper.vm.getHighlightedMenuItem() ).toBe( null );

			// Reopen the menu
			await delegateKeydownEvent( wrapper, 'Enter' );
			await wrapper.setProps( { expanded: true } );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );
		} );

		it( 'clears the highlight state after an item is selected', async () => {
			const wrapper = mount( CdxMenu, { props: {
				...defaultProps,
				expanded: false
			} } );
			// Enter opens the menu; first item is not highlighted.
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: true } );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).not.toContain( 'cdx-menu-item--highlighted' );

			// ArrowDown highlights the first item.
			await delegateKeydownEvent( wrapper, 'ArrowDown' );
			expect( wrapper.findAllComponents( CdxMenuItem )[ 0 ].classes() ).toContain( 'cdx-menu-item--highlighted' );

			// Close the menu
			await delegateKeydownEvent( wrapper, 'Enter' );
			// Simulate the parent responding to the update:selected event
			await wrapper.setProps( { selected: 'a' } );
			// Simulate the parent responding to the update:expanded event
			await wrapper.setProps( { expanded: false } );

			expect( wrapper.vm.getHighlightedMenuItem() ).toBe( null );

			// We won't try to reopen the menu to assert that there is no highlight, because opening
			// the menu when an item is selected should highlight the selected item, and that is
			// already tested elsewhere
		} );
	} );

	describe( 'when the user highlights a menu item via the mouse', () => {
		it( 'highlights and un-highlights the item on mousemove and mouseleave', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];

			await firstMenuItem.trigger( 'mousemove' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--highlighted' );
			await firstMenuItem.trigger( 'mouseleave' );
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--highlighted' );
		} );
	} );

	// Active behavior.
	describe( 'when the user clicks on a menu item', () => {
		it( 'becomes un-active on mouseleave', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];

			await firstMenuItem.trigger( 'mousemove' );
			await firstMenuItem.trigger( 'mousedown' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );
			await firstMenuItem.trigger( 'mouseleave' );
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );
		} );

		it( 'becomes active on mousemove -> mousedown', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );

			await firstMenuItem.trigger( 'mousemove' );
			await firstMenuItem.trigger( 'mousedown' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );
		} );

		it( 'is active after mousemove -> mousedown -> mouseleave -> mousemove', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );

			await firstMenuItem.trigger( 'mousemove' );
			await firstMenuItem.trigger( 'mousedown' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );
			await firstMenuItem.trigger( 'mouseleave' );
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );
			await firstMenuItem.trigger( 'mousemove' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );
		} );

		it( 'is not active after mousemove -> mousedown -> mouseleave -> mouseup -> mousemove', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps, attachTo: 'body' } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );

			await firstMenuItem.trigger( 'mousemove' );
			await firstMenuItem.trigger( 'mousedown' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );
			await firstMenuItem.trigger( 'mouseleave' );
			await wrapper.trigger( 'mouseup' );
			await firstMenuItem.trigger( 'mousemove' );
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );
		} );

		it( 'becomes inactive after click', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];
			await firstMenuItem.trigger( 'mousemove' );
			await firstMenuItem.trigger( 'mousedown' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );

			await firstMenuItem.trigger( 'click' );
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );
		} );

		it( 'becomes inactive when clearActive is called', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];
			await firstMenuItem.trigger( 'mousemove' );
			await firstMenuItem.trigger( 'mousedown' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );

			wrapper.vm.clearActive();
			await nextTick();
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );
		} );

		it( 'becomes inactive when another item becomes active', async () => {
			const wrapper = mount( CdxMenu, { props: defaultProps } );
			const firstMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 0 ];
			await firstMenuItem.trigger( 'mousemove' );
			await firstMenuItem.trigger( 'mousedown' );
			expect( firstMenuItem.classes() ).toContain( 'cdx-menu-item--active' );

			const secondMenuItem = wrapper.findAllComponents( CdxMenuItem )[ 1 ];
			await secondMenuItem.trigger( 'mousemove' );
			await secondMenuItem.trigger( 'mousedown' );
			expect( secondMenuItem.classes() ).toContain( 'cdx-menu-item--active' );
			expect( firstMenuItem.classes() ).not.toContain( 'cdx-menu-item--active' );
		} );
	} );

	describe( 'when the no-results slot is provided', () => {
		describe( 'and there are zero menu items', () => {
			it( 'displays the no-results content', () => {
				const wrapper = mount( CdxMenu, {
					props: { ...defaultProps, menuItems: [] },
					slots: { 'no-results': 'No results found' }
				} );

				expect( wrapper.vm.computedShowNoResultsSlot ).toBeTruthy();
			} );

			it( 'hides no-results content when showNoResultsSlot prop is set to false', () => {
				const wrapper = mount( CdxMenu, {
					props: { ...defaultProps, menuItems: [], showNoResultsSlot: false },
					slots: { 'no-results': 'No results found' }
				} );

				expect( wrapper.vm.computedShowNoResultsSlot ).toBeFalsy();
			} );
		} );

		describe( 'and there are menu items', () => {
			it( 'hides no-results content', () => {
				const wrapper = mount( CdxMenu, {
					props: defaultProps,
					slots: { 'no-results': 'No results found' }
				} );

				expect( wrapper.vm.computedShowNoResultsSlot ).toBeFalsy();
			} );

			it( 'displays no-results content when showNoResultsSlot prop is set to true', () => {
				const wrapper = mount( CdxMenu, {
					props: { ...defaultProps, showNoResultsSlot: true },
					slots: { 'no-results': 'No results found' }
				} );

				expect( wrapper.vm.computedShowNoResultsSlot ).toBeTruthy();
			} );
		} );
	} );
} );
