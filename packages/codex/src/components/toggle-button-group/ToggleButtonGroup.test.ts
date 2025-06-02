import { shallowMount } from '@vue/test-utils';
import { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconTrash } from '@wikimedia/codex-icons';
import { ButtonGroupItem } from '../../types';
import CdxToggleButtonGroup from './ToggleButtonGroup.vue';
import CdxToggleButton from '../toggle-button/ToggleButton.vue';

describe( 'ToggleButtonGroup', () => {
	const simpleButtons = [
		{ value: 1, label: 'One' },
		{ value: 2, label: 'Two' },
		{ value: 3, label: 'Three', disabled: true },
		{ value: 4, label: 'Four' }
	];

	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				buttons: ButtonGroupItem[],
				modelValue: string|number|null|( string|number )[],
				disabled?: boolean
			},
			slots?: Record<string, string>
		];

		const cases: Case[] = [
			[
				'Simple, single-select, nothing selected',
				{ buttons: simpleButtons, modelValue: null }
			],
			[
				'Simple, multi-select, nothing selected',
				{ buttons: simpleButtons, modelValue: [] }
			],
			[
				'Simple, #2 selected',
				{ buttons: simpleButtons, modelValue: 2 }

			],
			[
				'Simple, #1 and #2 selected',
				{ buttons: simpleButtons, modelValue: [ 1, 2 ] }
			],
			[
				'Simple, #2 and #4 selected, entire group disabled',
				{ buttons: simpleButtons, modelValue: [ 2, 4 ], disabled: true }
			],
			[
				'With icons, multi-select, #2 selected',
				{
					buttons: [
						{ value: 1, label: 'One', icon: cdxIconEdit },
						{ value: 2, label: 'Two', icon: cdxIconSpeechBubble },
						{ value: 3, label: 'Three', disabled: true, icon: cdxIconCheck },
						{ value: 4, label: 'Four', icon: cdxIconTrash }
					],
					modelValue: [ 2 ]
				}
			],
			[
				'Icon-only, single-select, #2 selected',
				{
					buttons: [
						{ value: 1, label: null, icon: cdxIconEdit, ariaLabel: 'One' },
						{ value: 2, label: null, icon: cdxIconSpeechBubble, ariaLabel: 'Two' },
						{ value: 3, label: null, disabled: true, icon: cdxIconCheck, ariaLabel: 'Three' },
						{ value: 4, label: null, icon: cdxIconTrash, ariaLabel: 'Four' }
					],
					modelValue: 2
				}
			],
			[
				'With slot',
				{ buttons: simpleButtons, modelValue: 2 },
				{
					default: `
					<template #default="{ button, selected }">
						<strong v-if="selected">SELECTED </strong>
						{{ button.label }} <em>({{ button.value }})</em>
					</template>
					`
				}
			]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, { buttons, modelValue, disabled = false }, slots = {} ) => {
			const wrapper = shallowMount( CdxToggleButtonGroup, {
				props: {
					buttons,
					modelValue,
					disabled
				},
				slots,
				global: {
					stubs: {
						CdxToggleButton: false
					}
				}
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	function makeToggleButtonGroup( modelValue: string|number|null|( string|number )[] ) {
		return shallowMount( CdxToggleButtonGroup, {
			props: {
				buttons: simpleButtons,
				modelValue
			},
			global: {
				stubs: {
					CdxToggleButton: false
				}
			}
		} );
	}

	describe( 'single-select group with nothing selected', () => {
		it( 'clicking a button selects that button', async () => {
			const wrapper = makeToggleButtonGroup( null );
			await wrapper.findAllComponents( CdxToggleButton )[ 1 ].trigger( 'click' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toEqual( [ [ simpleButtons[ 1 ].value ] ] );
		} );

		it( 'updating modelValue to the value of a button selects that button', async () => {
			const wrapper = makeToggleButtonGroup( null );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 0 );
			await wrapper.setProps( { modelValue: simpleButtons[ 1 ].value } );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 1 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 1 );
		} );
	} );

	describe( 'single-select group with a button already selected', () => {
		it( 'clicking a different button selects that button', async () => {
			const wrapper = makeToggleButtonGroup( simpleButtons[ 0 ].value );
			await wrapper.findAllComponents( CdxToggleButton )[ 1 ].trigger( 'click' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toEqual( [ [ simpleButtons[ 1 ].value ] ] );
		} );

		it( 'clicking the already-selected button does not unselect it', async () => {
			const wrapper = makeToggleButtonGroup( simpleButtons[ 1 ].value );
			await wrapper.findAllComponents( CdxToggleButton )[ 1 ].trigger( 'click' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toBe( undefined );
		} );

		it( 'updating modelValue unselects the selected button, and selects the other button', async () => {
			const wrapper = makeToggleButtonGroup( simpleButtons[ 0 ].value );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 1 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( false );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 1 );

			await wrapper.setProps( { modelValue: simpleButtons[ 1 ].value } );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( false );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 1 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 1 );
		} );

		it( 'setting modelValue to null unselects the selected button', async () => {
			const wrapper = makeToggleButtonGroup( simpleButtons[ 0 ].value );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 1 );

			await wrapper.setProps( { modelValue: null } );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( false );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 0 );
		} );
	} );

	describe( 'multi-select group with nothing selected', () => {
		it( 'clicking a button selects that button', async () => {
			const wrapper = makeToggleButtonGroup( [] );
			await wrapper.findAllComponents( CdxToggleButton )[ 1 ].trigger( 'click' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toEqual( [ [ [ simpleButtons[ 1 ].value ] ] ] );
		} );

		it( 'updating modelValue selects the matching buttons', async () => {
			const wrapper = makeToggleButtonGroup( [] );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 0 );

			await wrapper.setProps( {
				modelValue: [ simpleButtons[ 0 ].value, simpleButtons[ 3 ].value ]
			} );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 3 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 2 );
		} );
	} );

	describe( 'multi-select group with something selected', () => {
		it( 'clicking an unselected button adds that button to the selection', async () => {
			const wrapper = makeToggleButtonGroup( [
				simpleButtons[ 0 ].value, simpleButtons[ 3 ].value
			] );
			await wrapper.findAllComponents( CdxToggleButton )[ 1 ].trigger( 'click' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toEqual( [ [ [
				simpleButtons[ 0 ].value, simpleButtons[ 3 ].value, simpleButtons[ 1 ].value
			] ] ] );
		} );

		it( 'clicking a selected button removes that button from the selection', async () => {
			const wrapper = makeToggleButtonGroup( [
				simpleButtons[ 0 ].value, simpleButtons[ 3 ].value, simpleButtons[ 1 ].value
			] );
			await wrapper.findAllComponents( CdxToggleButton )[ 3 ].trigger( 'click' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toEqual( [ [ [
				simpleButtons[ 0 ].value, simpleButtons[ 1 ].value
			] ] ] );
		} );

		it( 'clicking the only selected button results in no buttons selected', async () => {
			const wrapper = makeToggleButtonGroup( [
				simpleButtons[ 0 ].value
			] );
			await wrapper.findAllComponents( CdxToggleButton )[ 0 ].trigger( 'click' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toEqual( [ [ [] ] ] );
		} );

		it( 'updating modelValue updates which buttons are selected', async () => {
			const wrapper = makeToggleButtonGroup( [
				simpleButtons[ 0 ].value, simpleButtons[ 3 ].value
			] );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 1 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( false );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 3 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 2 );

			await wrapper.setProps( {
				modelValue: [
					simpleButtons[ 0 ].value,
					simpleButtons[ 3 ].value,
					simpleButtons[ 1 ].value
				]
			} );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 1 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 3 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 3 );

			await wrapper.setProps( {
				modelValue: [
					simpleButtons[ 0 ].value,
					simpleButtons[ 1 ].value
				]
			} );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 1 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 3 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( false );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 2 );
		} );

		it( 'emptying modelValue unselects all buttons', async () => {
			const wrapper = makeToggleButtonGroup( [
				simpleButtons[ 0 ].value, simpleButtons[ 3 ].value
			] );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 3 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( true );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 2 );

			await wrapper.setProps( { modelValue: [] } );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 0 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( false );
			expect( wrapper.findAllComponents( CdxToggleButton )[ 3 ].classes( 'cdx-toggle-button--toggled-on' ) ).toBe( false );
			expect( wrapper.findAll( '.cdx-toggle-button--toggled-on' ).length ).toBe( 0 );
		} );
	} );
} );
