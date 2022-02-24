import { mount, VueWrapper } from '@vue/test-utils';
import { nextTick } from 'vue';
import { CdxMenu, CdxOption } from '../../lib';
import { MenuOption } from '../../types';

const exampleOptions: MenuOption[] = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' },
	{ value: 'c' },
	{ value: 'd', label: 'Option D', disabled: true }
];

const defaultProps = {
	options: exampleOptions,
	selected: null,
	expanded: true
};

describe( 'Matches the snapshots', () => {
	type Case = [
		msg: string,
		options: MenuOption[],
		selected: string|number|null,
		expanded?: boolean,
		slots?: {
			default?: string,
			footer?: string
		}
	];

	const cases: Case[] = [
		[ 'Nothing selected', exampleOptions, null ],
		[ 'Something selected', exampleOptions, 'b' ],
		[ 'Not expanded', exampleOptions, 'b', false ],
		[ 'With footer', exampleOptions, 'b', true, { footer: 'Footer text' } ],
		[ 'Custom option rendering', exampleOptions, 'b', true, {
			default: `
				<template #default="{ option }">
					{{ option.label }} (value: {{ option.value }})
				</template>
			`
		} ]
	];

	test.each( cases )( 'Case %# %s: => HTML', ( _, options, selected, expanded = true, slots = {} ) => {
		const wrapper = mount( CdxMenu, {
			props: { options, selected, expanded },
			slots
		} );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

// We would like to use VueWrapper<InstanceType<typeof CdxMenu>>, but that causes a TS error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function delegateKeydownEvent( wrapper: VueWrapper<any>, key: string ) {
	const menu = wrapper.vm as InstanceType<typeof CdxMenu>;
	const handled = menu.delegateKeyNavigation( new KeyboardEvent( 'keydown', { key } ) );
	expect( handled ).toBe( true );
	await nextTick();
}

it( 'Clicking an option emits an "update:selected" event with the correct "selectedValue"', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	await wrapper.findAllComponents( CdxOption )[ 0 ].trigger( 'click' );
	expect( wrapper.emitted()[ 'update:selected' ] ).toBeTruthy();
	expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleOptions[ 0 ].value ] );
} );

it( 'Clicking an option emits an "update:expanded" event indicating the menu should be closed', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	await wrapper.findAllComponents( CdxOption )[ 0 ].trigger( 'click' );
	expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
	expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ false ] );
} );

it( 'Clicking a disabled option does not emit any events', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	await wrapper.findAllComponents( CdxOption )[ 3 ].trigger( 'click' );
	expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeFalsy();
	expect( wrapper.emitted()[ 'update:expanded' ] ).toBeFalsy();
} );

it( 'If the selected prop is updated in the parent, the component updates itself to the new value', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'c'
	} } );
	expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--selected' );
	await wrapper.setProps( { selected: 'b' } );
	expect( wrapper.findAllComponents( CdxOption )[ 1 ].classes() ).toContain( 'cdx-option--selected' );
	expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).not.toContain( 'cdx-option--selected' );
} );

it( 'If the selected prop is updated in the parent, no update events are emitted', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'c'
	} } );
	await wrapper.setProps( { modelValue: 'b' } );
	expect( wrapper.emitted()[ 'update:selected' ] ).toBeFalsy();
} );

it( 'Enter keydown expands the menu if it is not already expanded', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		expanded: false
	} } );
	await delegateKeydownEvent( wrapper, 'Enter' );
	expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
	expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
} );

it( 'Enter keydown sets the selected menu item to "highlighted" if a selection is present', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'c',
		expanded: false
	} } );
	await delegateKeydownEvent( wrapper, 'Enter' );
	expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
} );

it( 'Down arrow keydown sets the next menu item to "highlighted"', async () => {
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
	expect( wrapper.findAllComponents( CdxOption )[ 1 ].classes() ).toContain( 'cdx-option--highlighted' );
} );

it( 'Down arrow keydown opens menu but does not highlight when menu is closed and nothing selected', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		expanded: false
	} } );
	await delegateKeydownEvent( wrapper, 'ArrowDown' );
	expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
	expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
	expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).not.toContain( 'cdx-option--highlighted' );
} );

it( 'Down arrow keydown opens menu and highlights selected item when menu is closed and selection present', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'c',
		expanded: false
	} } );
	await delegateKeydownEvent( wrapper, 'ArrowDown' );
	expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
	expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
	expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
} );

it( 'Down arrow keydown skips disabled elements and loops around to the beginning if necessary', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'c'
	} } );
	await delegateKeydownEvent( wrapper, 'ArrowDown' );
	expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).toContain( 'cdx-option--highlighted' );
} );

it( 'Up arrow keydown sets the previous menu item to "highlighted"', async () => {
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
	expect( wrapper.findAllComponents( CdxOption )[ 1 ].classes() ).toContain( 'cdx-option--highlighted' );
} );

it( 'Up arrow keydown opens menu but does not highlight when menu is closed and nothing selected', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		expanded: false
	} } );
	await delegateKeydownEvent( wrapper, 'ArrowUp' );
	expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
	expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
	expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).not.toContain( 'cdx-option--highlighted' );
} );

it( 'Up arrow keydown opens menu and highlights selected item when menu is closed and selection present', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'c',
		expanded: false
	} } );
	await delegateKeydownEvent( wrapper, 'ArrowUp' );
	expect( wrapper.emitted()[ 'update:expanded' ] ).toBeTruthy();
	expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ true ] );
	expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
} );

it( 'Up arrow keydown skips disabled elements and loops around to the end if necessary', async () => {
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
	expect( wrapper.findAllComponents( CdxOption )[ 2 ].classes() ).toContain( 'cdx-option--highlighted' );
} );

it( 'Enter keydown after navigating to a new option emits an update event with the value of that option', async () => {
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
	expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleOptions[ 2 ].value ] );
} );

it( 'Tab key after navigating to a new option emits an update event with the value of that option', async () => {
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
	expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleOptions[ 2 ].value ] );
} );

it( 'Highlighted option is selected when selectHighlighted prop is true', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'b',
		expanded: false,
		selectHighlighted: true
	} } );
	// Enter highlights the first item
	await delegateKeydownEvent( wrapper, 'Enter' );
	// Simulate the parent responding to the update:expanded event
	await wrapper.setProps( { expanded: true } );

	await delegateKeydownEvent( wrapper, 'ArrowDown' );
	expect( wrapper.emitted()[ 'update:selected' ][ 0 ] ).toEqual( [ exampleOptions[ 2 ].value ] );
} );

it( 'Highlighted option is returned by getHighlightedOption', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		selected: 'b',
		expanded: false
	} } );
	// Enter opens the menu and highlights the selected item
	await delegateKeydownEvent( wrapper, 'Enter' );
	// Simulate the parent responding to the update:expanded event
	await wrapper.setProps( { expanded: true } );
	expect( wrapper.vm.getHighlightedOption() ).toMatchObject( exampleOptions[ 1 ] );

	await delegateKeydownEvent( wrapper, 'ArrowDown' );
	expect( wrapper.vm.getHighlightedOption() ).toMatchObject( exampleOptions[ 2 ] );
} );

it( 'Esc keydown closes the menu', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	await delegateKeydownEvent( wrapper, 'Escape' );
	expect( wrapper.emitted()[ 'update:expanded' ][ 0 ] ).toEqual( [ false ] );
} );

it( 'Highlight state is not preserved after menu is closed', async () => {
	const wrapper = mount( CdxMenu, { props: {
		...defaultProps,
		expanded: false
	} } );
	// Enter highlights the first item
	await delegateKeydownEvent( wrapper, 'Enter' );
	// Simulate the parent responding to the update:expanded event
	await wrapper.setProps( { expanded: true } );

	await delegateKeydownEvent( wrapper, 'ArrowDown' );
	expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).toContain( 'cdx-option--highlighted' );

	// Close the menu
	await wrapper.setProps( { expanded: false } );

	// Reopen the menu
	await delegateKeydownEvent( wrapper, 'Enter' );
	await wrapper.setProps( { expanded: true } );
	expect( wrapper.findAllComponents( CdxOption )[ 0 ].classes() ).not.toContain( 'cdx-option--highlighted' );
} );

it( 'Option becomes active on mousedown', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	const firstOption = wrapper.findAllComponents( CdxOption )[ 0 ];
	expect( firstOption.classes() ).not.toContain( 'cdx-option--active' );

	await firstOption.trigger( 'mousedown' );
	expect( firstOption.classes() ).toContain( 'cdx-option--active' );
} );

it( 'Option becomes inactive after click', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	const firstOption = wrapper.findAllComponents( CdxOption )[ 0 ];
	await firstOption.trigger( 'mousedown' );
	expect( firstOption.classes() ).toContain( 'cdx-option--active' );

	await firstOption.trigger( 'click' );
	expect( firstOption.classes() ).not.toContain( 'cdx-option--active' );
} );

it( 'Option becomes inactive when clearActive is called', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	const firstOption = wrapper.findAllComponents( CdxOption )[ 0 ];
	await firstOption.trigger( 'mousedown' );
	expect( firstOption.classes() ).toContain( 'cdx-option--active' );

	wrapper.vm.clearActive();
	await nextTick();
	expect( firstOption.classes() ).not.toContain( 'cdx-option--active' );
} );

it( 'Option becomes inactive when another option becomes active', async () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );
	const firstOption = wrapper.findAllComponents( CdxOption )[ 0 ];
	await firstOption.trigger( 'mousedown' );
	expect( firstOption.classes() ).toContain( 'cdx-option--active' );

	const secondOption = wrapper.findAllComponents( CdxOption )[ 1 ];
	await secondOption.trigger( 'mousedown' );
	expect( secondOption.classes() ).toContain( 'cdx-option--active' );
	expect( firstOption.classes() ).not.toContain( 'cdx-option--active' );
} );

describe( 'delegateKeyNavigation returns true or false correctly', () => {
	const wrapper = mount( CdxMenu, { props: defaultProps } );

	test.each( [ ' ', 'Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'Escape' ] )( 'Returns true for "%s"', ( key ) => {
		expect( wrapper.vm.delegateKeyNavigation( new KeyboardEvent( 'keydown', { key } ) ) ).toBe( true );
	} );

	test.each( [ 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', 'Backspace', 'Delete', 'x', '2' ] )( 'Returns false for "%s"', ( key ) => {
		expect( wrapper.vm.delegateKeyNavigation( new KeyboardEvent( 'keydown', { key } ) ) ).toBe( false );
	} );
} );
