import { shallowMount, mount } from '@vue/test-utils';
import CdxToggleSwitch from './ToggleSwitch.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: Record<keyof unknown, unknown>,
		description?: string
	];

	const cases: Case[] = [
		[ 'Default', { modelValue: false } ],
		[ 'Disabled', { modelValue: false, disabled: true } ],
		[ 'With description', { modelValue: false }, 'Description text' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, description = undefined ) => {
		const wrapper = mount( CdxToggleSwitch, { props, slots: {
			default: 'Label',
			...( description === undefined ? {} : { description } )
		} } );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'ToggleSwitch', () => {
	it( 'emits update:modelValue event with value when selected', async () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false }, slots: { default: 'Label' } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		input.checked = true;
		await wrapper.find( 'input' ).trigger( 'change' );

		expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
	} );

	it( 'is on when modelValue is true', () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: true }, slots: { default: 'Label' } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is off when modelValue is false', () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false }, slots: { default: 'Label' } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( false );
	} );

	it( 'toggles the switch on label click', async () => {
		const wrapper = mount( CdxToggleSwitch,
			{ props: { modelValue: false }, slots: { default: 'Label' } }
		);
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		await wrapper.find( 'label' ).trigger( 'click' );
		expect( input.checked ).toEqual( true );
	} );

	it( 'clicks the input on enter keydown', async () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false }, slots: { default: 'Label' } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;
		input.click = jest.fn();

		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );

		expect( input.click ).toHaveBeenCalled();
	} );
} );
