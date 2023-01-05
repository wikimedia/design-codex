import { mount, shallowMount } from '@vue/test-utils';
import CdxCheckbox from './Checkbox.vue';

describe( 'Checkbox', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			modelValue: boolean|string[]|number[],
			inputValue: string|number|boolean|undefined,
			disabled: boolean,
			indeterminate: boolean,
			inline: boolean,
			slot: string
		];

		const cases: Case[] = [
			[ 'Single checkbox', true, undefined, false, false, false, 'Checked if true' ],
			[ 'Group checkbox, string value', [ 'checkbox-1' ], 'checkbox-1', false, false, false, 'Checkbox 1' ],
			[ 'Group checkbox, number value', [ 1 ], 1, false, false, false, '1' ],
			[ 'Disabled', false, undefined, true, false, false, 'Disabled checkbox' ],
			[ 'Indeterminate', false, undefined, false, true, false, 'Indeterminate checkbox' ],
			[ 'Inline', [], 'checkbox-1', false, false, true, 'Inline checkbox' ]
		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			( _, modelValue, inputValue, disabled, indeterminate, inline, slot ) => {
				const wrapper = mount( CdxCheckbox, {
					props: { modelValue, inputValue, disabled, indeterminate, inline },
					slots: { default: slot }
				} );
				expect( wrapper.element ).toMatchSnapshot();
			} );
	} );

	describe( 'when there is a single checkbox', () => {
		describe( 'and the checkbox is toggled', () => {
			it( 'emits update:modelValue event with single boolean value', async () => {
				const props = { modelValue: false };
				const wrapper = shallowMount( CdxCheckbox, { props: props } );
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
				const wrapper = shallowMount( CdxCheckbox, { props: props } );
				const input = wrapper.find( 'input' ).element;

				expect( input.checked ).toEqual( true );
			} );
		} );

		describe( 'and modelValue is false', () => {
			it( 'is not checked', () => {
				const props = { modelValue: false };
				const wrapper = shallowMount( CdxCheckbox, { props: props } );
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
				const wrapper = shallowMount( CdxCheckbox, { props: props } );
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
				const wrapper = shallowMount( CdxCheckbox, { props: props } );
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
				const wrapper = shallowMount( CdxCheckbox, { props: props } );
				const input = wrapper.find( 'input' ).element;

				expect( input.checked ).toEqual( false );
			} );
		} );
	} );

	describe( 'on enter keydown', () => {
		it( 'clicks the input', async () => {
			const props = { modelValue: false };
			const wrapper = shallowMount( CdxCheckbox, { propsData: props } );
			const input = wrapper.find( 'input' ).element;
			input.click = jest.fn();

			await wrapper.find( 'input' ).trigger( 'keydown.enter' );

			expect( input.click ).toHaveBeenCalled();
		} );
	} );
} );
