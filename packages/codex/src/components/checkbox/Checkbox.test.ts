import { mount, shallowMount } from '@vue/test-utils';
import CdxCheckbox from './Checkbox.vue';
import { ValidationStatusType } from '../../types';
import { CdxTextArea } from '../../lib';

describe( 'Checkbox', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				modelValue: boolean|string[]|number[],
				inputValue?: string|number|boolean|undefined,
				disabled?: boolean,
				indeterminate?: boolean,
				inline?: boolean,
				hideLabel?: boolean,
				status?: ValidationStatusType
			},
			defaultSlot: string,
			description?: string,
			customInput?: string
		];

		const cases: Case[] = [
			[ 'Single checkbox', { modelValue: true }, 'Checked if true' ],
			[ 'Group checkbox, string value', { modelValue: [ 'checkbox-1' ], inputValue: 'checkbox-1' }, 'Checkbox 1' ],
			[ 'Group checkbox, number value', { modelValue: [ 1 ], inputValue: 1 }, '1' ],
			[ 'Disabled', { modelValue: false, disabled: true }, 'Disabled checkbox' ],
			[ 'Indeterminate', { modelValue: false, indeterminate: true }, 'Indeterminate checkbox' ],
			[ 'Inline', { modelValue: [], inputValue: 'checkbox-1', inline: true }, 'Inline checkbox' ],
			[ 'With description', { modelValue: true }, 'Checked if true', 'Description text' ],
			[ 'With error', { modelValue: false, status: 'error' }, 'Checkbox with error' ],
			[ 'With hidden label', { modelValue: false, hideLabel: true }, 'Checkbox with hidden label' ],
			[ 'With custom input', { modelValue: [ 'checkbox-1' ], inputValue: 'checkbox-1' }, 'Checkbox with custom input', 'Description text', '<cdx-text-area />' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, defaultSlot, description = undefined, customInput = undefined ) => {
			const wrapper = mount( CdxCheckbox, {
				props,
				slots: {
					default: defaultSlot,
					...( description === undefined ? {} : { description } ),
					...( customInput === undefined ? {} : { 'custom-input': customInput } )
				},
				global: {
					components: { CdxTextArea }
				}
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when there is a single checkbox', () => {
		describe( 'and the checkbox is toggled', () => {
			it( 'emits update:modelValue event with single boolean value', async () => {
				const props = { modelValue: false };
				const wrapper = shallowMount( CdxCheckbox, { props: props, slots: { default: 'Label' } } );
				const input = wrapper.find( 'input' ).element;

				input.checked = true;
				await wrapper.find( 'input' ).trigger( 'change' );
				expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
			} );
		} );

		describe( 'and modelValue is true', () => {
			it( 'is checked', () => {
				const props = { modelValue: true };
				const wrapper = shallowMount( CdxCheckbox, { props: props, slots: { default: 'Label' } } );
				const input = wrapper.find( 'input' ).element;

				expect( input.checked ).toEqual( true );
			} );
		} );

		describe( 'and modelValue is false', () => {
			it( 'is not checked', () => {
				const props = { modelValue: false };
				const wrapper = shallowMount( CdxCheckbox, { props: props, slots: { default: 'Label' } } );
				const input = wrapper.find( 'input' ).element;

				expect( input.checked ).toEqual( false );
			} );
		} );
	} );

	describe( 'when there is a checkbox in a group', () => {
		describe( 'and the checkbox is toggled', () => {
			it( 'emits update:modelValue event with array value', async () => {
				const props = {
					modelValue: [ 'checkbox-1' ],
					inputValue: 'checkbox-2'
				};
				const wrapper = shallowMount( CdxCheckbox, { props: props, slots: { default: 'Label' } } );
				const input = wrapper.find( 'input' ).element;

				input.checked = true;
				await wrapper.find( 'input' ).trigger( 'change' );
				expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
				expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ [ 'checkbox-1', 'checkbox-2' ] ] );
			} );
		} );

		describe( 'and modelValue includes inputValue', () => {
			it( 'is selected', () => {
				const props = {
					modelValue: [ 'checkbox-1' ],
					inputValue: 'checkbox-1'
				};
				const wrapper = shallowMount( CdxCheckbox, { props: props, slots: { default: 'Label' } } );
				const input = wrapper.find( 'input' ).element;

				expect( input.checked ).toEqual( true );
			} );
		} );

		describe( 'and modelValue does not inputValue', () => {
			it( 'is not selected', () => {
				const props = {
					modelValue: [],
					inputValue: 'checkbox-1'
				};
				const wrapper = shallowMount( CdxCheckbox, { props: props, slots: { default: 'Label' } } );
				const input = wrapper.find( 'input' ).element;

				expect( input.checked ).toEqual( false );
			} );
		} );
	} );

	describe( 'when custom-input slot is provided', () => {
		it( 'displays a custom-input component', () => {
			const props = {
				modelValue: [],
				inputValue: 'checkbox-1'
			};
			const wrapper = shallowMount( CdxCheckbox, {
				props: props,
				slots: {
					default: 'Label',
					'custom-input': '<cdx-text-area />'
				},
				global: {
					components: { CdxTextArea }
				}
			} );
			expect( wrapper.findComponent( CdxTextArea ).exists() ).toBe( true );
		} );
	} );
} );
