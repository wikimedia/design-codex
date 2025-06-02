import { shallowMount, mount } from '@vue/test-utils';
import CdxToggleSwitch from './ToggleSwitch.vue';

describe( 'ToggleSwitch', () => {
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

	describe( 'when selected', () => {
		it( 'emits update:modelValue event with value', async () => {
			const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false }, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element as HTMLInputElement;

			input.checked = true;
			await wrapper.find( 'input' ).trigger( 'change' );

			expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
		} );
	} );

	describe( 'when the label is clicked', () => {
		it( 'toggles the switch', async () => {
			const wrapper = mount( CdxToggleSwitch,
				{ props: { modelValue: false }, slots: { default: 'Label' } }
			);
			const input = wrapper.find( 'input' ).element as HTMLInputElement;

			await wrapper.find( 'label' ).trigger( 'click' );
			expect( input.checked ).toEqual( true );
		} );
	} );

	describe( 'when modelValue is true', () => {
		it( 'is on', () => {
			const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: true }, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element as HTMLInputElement;

			expect( input.checked ).toEqual( true );
		} );
	} );

	describe( 'when modelValue is false', () => {
		it( 'is off', () => {
			const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false }, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element as HTMLInputElement;

			expect( input.checked ).toEqual( false );
		} );
	} );

	describe( 'when Enter is pressed', () => {
		it( 'clicks the input', async () => {
			const wrapper = shallowMount( CdxToggleSwitch, { props: { modelValue: false }, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element as HTMLInputElement;
			input.click = jest.fn();

			await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Enter' } );

			expect( input.click ).toHaveBeenCalled();
		} );
	} );
} );
