import { mount, shallowMount } from '@vue/test-utils';
import CdxTextInput from './TextInput.vue';
import { Icon, cdxIconSearch, cdxIconInfoFilled } from 'icons';
import { TextInputType } from '../../types';
import { TextInputTypes } from '../../constants';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			modelValue?: string | number,
			type?: TextInputType,
			disabled?: boolean,
			startIcon?: Icon,
			endIcon?: Icon,
			clearable?: boolean
		},
		attrs?: Record<string, string|number>
	];

	const cases: Case[] = [
		...TextInputTypes.map( ( type ) => [
			`Input type: ${type} `,
			{ type }
		] ) as Case[],
		[ 'Disabled', { disabled: true } ],
		[ 'With start icon', { startIcon: cdxIconSearch } ],
		[ 'With end icon', { endIcon: cdxIconInfoFilled } ],
		[ 'Clearable, no input', { clearable: true } ],
		[ 'Clearable, with input', { modelValue: 'Some value', clearable: true } ],
		[ 'With end icon, clearable, no input', { endIcon: cdxIconInfoFilled, clearable: true } ],
		[
			'With end icon, clearable, with input',
			{ modelValue: 'Some value', endIcon: cdxIconInfoFilled, clearable: true }
		],
		[ 'With attributes', {}, { size: 30, placeholder: 'Start typing...' } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, attrs = {} ) => {
		const wrapper = mount( CdxTextInput, { props: props, attrs: attrs } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'emits update:modelValue event with value when input changes', async () => {
	const wrapper = shallowMount( CdxTextInput );
	await wrapper.get( 'input' ).setValue( 'New value' );

	expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
	expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ 'New value' ] );
} );

it( 'emits input events', async () => {
	const wrapper = shallowMount( CdxTextInput );

	await wrapper.get( 'input' ).trigger( 'input' );
	expect( wrapper.emitted().input ).toBeTruthy();
} );

it( 'emits change events', () => {
	const wrapper = shallowMount( CdxTextInput );

	wrapper.get( 'input' ).trigger( 'change' );
	expect( wrapper.emitted().change ).toBeTruthy();
} );

it( 'emits focus events', () => {
	const wrapper = shallowMount( CdxTextInput );

	wrapper.get( 'input' ).trigger( 'focus' );
	expect( wrapper.emitted().focus ).toBeTruthy();
} );

it( 'emits blur events', () => {
	const wrapper = shallowMount( CdxTextInput );

	wrapper.get( 'input' ).trigger( 'blur' );
	expect( wrapper.emitted().blur ).toBeTruthy();
} );

it( 'updates on value prop change without emitting input event', async () => {
	const wrapper = mount( CdxTextInput, { props: { modelValue: 'Initial value' } } );
	const input = wrapper.find( 'input' ).element as HTMLInputElement;
	expect( input.value ).toEqual( 'Initial value' );

	await wrapper.setProps( { modelValue: 'New value' } );
	expect( input.value ).toEqual( 'New value' );
	expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeFalsy();
} );

it( 'does nothing on end icon click', async () => {
	const wrapper = mount(
		CdxTextInput,
		{ props: { modelValue: 'Initial value', endIcon: cdxIconInfoFilled } }
	);
	const endIcon = wrapper.find( '.cdx-text-input__end-icon' );
	const input = wrapper.find( 'input' ).element as HTMLInputElement;

	await endIcon.trigger( 'click' );
	expect( input.value ).toEqual( 'Initial value' );
	expect( wrapper.emitted().input ).toBeFalsy();
} );

it( 'updates on clear icon click', async () => {
	const wrapper = mount( CdxTextInput, { props: { modelValue: 'Initial value', clearable: true } } );
	const clearElement = wrapper.find( '.cdx-text-input--clearable .cdx-text-input__end-icon' );

	await clearElement.trigger( 'click' );

	expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeTruthy();
	expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ '' ] );
} );
