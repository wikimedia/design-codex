import { mount, shallowMount } from '@vue/test-utils';
import CdxCheckbox from './Checkbox.vue';

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

describe( 'Checkbox', () => {
	it( 'emits update:modelValue event with value when toggled (single checkbox)', async () => {
		const props = { modelValue: false };
		const wrapper = shallowMount( CdxCheckbox, { props: props } );
		const input = wrapper.find( 'input' ).element;

		input.checked = true;
		await wrapper.find( 'input' ).trigger( 'change' );
		expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
	} );

	it( 'emits update:modelValue event with value when selected (checkbox in group)', async () => {
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

	it( 'is selected when modelValue is true', () => {
		const props = { modelValue: true };
		const wrapper = shallowMount( CdxCheckbox, { props: props } );
		const input = wrapper.find( 'input' ).element;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is not selected when modelValue is false', () => {
		const props = { modelValue: false };
		const wrapper = shallowMount( CdxCheckbox, { props: props } );
		const input = wrapper.find( 'input' ).element;

		expect( input.checked ).toEqual( false );
	} );

	it( 'is selected when modelValue includes inputValue', () => {
		const props = {
			modelValue: [ 'checkbox-1' ],
			inputValue: 'checkbox-1'
		};
		const wrapper = shallowMount( CdxCheckbox, { props: props } );
		const input = wrapper.find( 'input' ).element;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is not selected when modelValue does not include inputValue', () => {
		const props = {
			modelValue: [],
			inputValue: 'checkbox-1'
		};
		const wrapper = shallowMount( CdxCheckbox, { props: props } );
		const input = wrapper.find( 'input' ).element;

		expect( input.checked ).toEqual( false );
	} );

	it( 'focuses on the input on label click', async () => {
		const props = { modelValue: false };
		const wrapper = shallowMount( CdxCheckbox, { props: props } );
		const input = wrapper.find( 'input' ).element;
		input.focus = jest.fn();

		await wrapper.find( 'label' ).trigger( 'click' );

		expect( input.focus ).toHaveBeenCalled();
	} );

	it( 'clicks the label on enter keydown', async () => {
		const props = { modelValue: false };
		const wrapper = shallowMount( CdxCheckbox, { propsData: props } );
		const label = wrapper.find( 'label' ).element;
		label.click = jest.fn();

		await wrapper.find( 'label' ).trigger( 'keydown.enter' );

		expect( label.click ).toHaveBeenCalled();
	} );
} );
