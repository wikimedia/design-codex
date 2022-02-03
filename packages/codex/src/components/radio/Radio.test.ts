import { mount, shallowMount } from '@vue/test-utils';
import CdxRadio from './Radio.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		modelValue: string|number|boolean,
		inputValue: string|number|boolean,
		name: string,
		disabled: boolean,
		inline: boolean,
		slot: string
	];

	const cases: Case[] = [
		[ 'String value', 'radio-1', 'radio-1', 'radios-string', false, false, 'Radio 1' ],
		[ 'Number value', 2, 2, 'radios-number', false, false, 'Radio 2' ],
		[ 'Boolean value', true, true, 'radios-boolean', false, false, 'True' ],
		[ 'Disabled', 'radio-1', 'radio-1', 'radios-string', true, false, 'Disabled radio' ],
		[ 'Inline', 'radio-1', 'radio-1', 'radios-string', false, true, 'Inline radio' ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => HTML',
		( _, modelValue, inputValue, name, disabled, inline, slot ) => {
			const wrapper = mount( CdxRadio, {
				props: { modelValue, inputValue, name, disabled, inline },
				slots: { default: slot }
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
} );

describe( 'Radio', () => {
	it( 'emits update:modelValue event with value when selected', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-2',
			name: 'radio-group'
		};
		const wrapper = shallowMount( CdxRadio, { props: props } );
		const input = wrapper.find( 'input' ).element;

		input.checked = true;
		await wrapper.find( 'input' ).trigger( 'change' );

		expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ 'radio-2' ] );
	} );

	it( 'is selected when modelValue matches inputValue', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-1',
			name: 'radio-group'
		};
		const wrapper = shallowMount( CdxRadio, { props: props } );
		const input = wrapper.find( 'input' ).element;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is not selected when modelValue does not match inputValue', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-2',
			name: 'radio-group'
		};
		const wrapper = shallowMount( CdxRadio, { props: props } );
		const input = wrapper.find( 'input' ).element;

		expect( input.checked ).toEqual( false );
	} );

	it( 'focuses on the input on label click', async () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-2',
			name: 'radio-group'
		};
		const wrapper = shallowMount( CdxRadio, { props: props } );
		const input = wrapper.find( 'input' ).element;
		input.focus = jest.fn();

		await wrapper.find( 'label' ).trigger( 'click' );

		expect( input.focus ).toHaveBeenCalled();
	} );
} );
