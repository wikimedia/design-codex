import { shallowMount } from '@vue/test-utils';
import CdxToggleSwitch from './ToggleSwitch.vue';

describe( 'matches the snapshot', () => {
	type Case = [ msg: string, props: Record<keyof unknown, unknown>, slot: string ];

	const cases: Case[] = [
		[ 'Default', { modelValue: true, disabled: false }, '' ],
		[ 'With label', { modelValue: true, disabled: false }, 'Label' ],
		[ 'Disabled', { modelValue: true, disabled: true }, '' ],
		[ 'Disabled with label', { modelValue: true, disabled: true }, 'Label' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
		const options = { props: props, slots: {} };
		if ( slot.length > 0 ) {
			options.slots = { default: slot };
		}
		const wrapper = shallowMount( CdxToggleSwitch, options );
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'ToggleSwitch', () => {
	it( 'emits update:modelValue event with value when selected', async () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		input.checked = true;
		await wrapper.find( 'input' ).trigger( 'change' );

		expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
	} );

	it( 'is on when modelValue is true', async () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: true } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( true );
	} );

	it( 'is off when modelValue is false', async () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		expect( input.checked ).toEqual( false );
	} );

	it( 'toggles the switch on label click', async () => {
		const wrapper = shallowMount( CdxToggleSwitch,
			{ props: { modelValue: false }, slots: { default: 'Label' } }
		);
		const input = wrapper.find( 'input' ).element as HTMLInputElement;

		await wrapper.find( 'label' ).trigger( 'click' );
		expect( input.checked ).toEqual( true );
	} );

	it( 'clicks the input on enter keydown', async () => {
		const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false } } );
		const input = wrapper.find( 'input' ).element as HTMLInputElement;
		input.click = jest.fn();

		await wrapper.find( 'input' ).trigger( 'keydown.enter' );

		expect( input.click ).toHaveBeenCalled();
	} );
} );
