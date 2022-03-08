import { shallowMount } from '@vue/test-utils';
import CdxToggleButton from './ToggleButton.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			disabled: boolean;
			modelValue: boolean;
		}
	];
	const cases: Case[] = [
		[ 'Default', { disabled: false, modelValue: false } ],
		[ 'Active', { disabled: false, modelValue: true } ],
		[ 'Disabled, inactive', { disabled: true, modelValue: false } ],
		[ 'Disabled, active', { disabled: true, modelValue: true } ]
	];
	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = shallowMount(
			CdxToggleButton,
			{ props: props, slots: { default: 'Button text' } }
		);
		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'ToggleButton', () => {
	it( 'is active when modelValue is true', async () => {
		const wrapper = shallowMount( CdxToggleButton, { props: { modelValue: true } } );
		const classes = wrapper.find( 'button' ).classes();
		expect( classes ).toContain( 'cdx-toggle-button--toggled-on' );
		expect( classes ).not.toContain( 'cdx-toggle-button--toggled-off' );
	} );

	it( 'is inactive when modelValue is false', async () => {
		const wrapper = shallowMount( CdxToggleButton, { props: { modelValue: false } } );
		const classes = wrapper.find( 'button' ).classes();
		expect( classes ).not.toContain( 'cdx-toggle-button--toggled-on' );
		expect( classes ).toContain( 'cdx-toggle-button--toggled-off' );
	} );

	it( 'emits update:modelValue event with value when clicked', async () => {
		const wrapper = shallowMount( CdxToggleButton, { props: { modelValue: false } } );

		await wrapper.find( 'button' ).trigger( 'click' );

		expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
		expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ true ] );
	} );

	it( 'disables the button when specified', async () => {
		const wrapper = shallowMount(
			CdxToggleButton,
			{ props: { modelValue: false, disabled: true } }
		);
		const button = wrapper.find( 'button' ).element as HTMLButtonElement;
		expect( button.disabled ).toEqual( true );
	} );

	it( 'cannot be clicked while disabled', async () => {
		const wrapper = shallowMount(
			CdxToggleButton,
			{ props: { modelValue: false, disabled: true } }
		);

		await wrapper.find( 'button' ).trigger( 'click' );

		expect( wrapper.emitted( 'update:modelValue' ) ).toBeFalsy();
	} );
} );
