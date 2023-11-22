import { mount, shallowMount } from '@vue/test-utils';
import { Icon, cdxIconSearch, cdxIconInfoFilled } from '@wikimedia/codex-icons';
import CdxTextInput from './TextInput.vue';
import { TextInputType, ValidationStatusType } from '../../types';
import { TextInputTypes } from '../../constants';

describe( 'TextInput', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				modelValue?: string | number,
				inputType?: TextInputType,
				disabled?: boolean,
				startIcon?: Icon,
				endIcon?: Icon,
				clearable?: boolean,
				status?: ValidationStatusType
			},
			attrs?: Record<string, string|number>
		];

		const cases: Case[] = [
			// Add a case for each of the TextInputTypes.
			...TextInputTypes.map( ( type ) => [
				`Input type: ${ type } `,
				{ inputType: type }
			] ) as Case[],
			// Add other cases.
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
			[ 'With attributes', {}, { size: 30, placeholder: 'Start typing...' } ],
			[ 'With error status', { status: 'error' } ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, attrs = {} ) => {
			const wrapper = mount( CdxTextInput, { props: props, attrs: attrs } );

			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when input is entered', () => {
		it( 'emits update:modelValue event with value when input changes', async () => {
			const wrapper = shallowMount( CdxTextInput );
			await wrapper.get( 'input' ).setValue( 'New value' );

			expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ 'New value' ] );
		} );
	} );

	describe( 'when the input value prop changes', () => {
		it( 'updates the input value without emitting an update:modelValue event', async () => {
			const wrapper = mount( CdxTextInput, { props: { modelValue: 'Initial value' } } );
			const input = wrapper.find( 'input' ).element as HTMLInputElement;
			expect( input.value ).toEqual( 'Initial value' );

			await wrapper.setProps( { modelValue: 'New value' } );
			expect( input.value ).toEqual( 'New value' );
			expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeFalsy();
		} );
	} );

	describe( 'when a native event is triggered', () => {
		const eventNames = [
			'input',
			'change',
			'focus',
			'blur'
		];
		test.each( eventNames )( 'Case %#: emits %s event', async ( eventName ) => {
			const wrapper = shallowMount( CdxTextInput );

			await wrapper.get( 'input' ).trigger( eventName );
			expect( wrapper.emitted()[ eventName ] ).toBeTruthy();
		} );
	} );

	describe( 'when the input is clearable', () => {
		it( 'does nothing on end icon click', async () => {
			const wrapper = mount(
				CdxTextInput,
				{ props: { modelValue: 'Initial value', endIcon: cdxIconInfoFilled, clearable: true } }
			);
			const endIcon = wrapper.find( '.cdx-text-input__end-icon' );
			const input = wrapper.find( 'input' ).element as HTMLInputElement;

			await endIcon.trigger( 'click' );
			expect( input.value ).toEqual( 'Initial value' );
			expect( wrapper.emitted().input ).toBeFalsy();
		} );

		it( 'updates on clear icon click', async () => {
			const wrapper = mount(
				CdxTextInput,
				{ props: { modelValue: 'Initial value', endIcon: cdxIconInfoFilled, clearable: true } }
			);
			const clearElement = wrapper.find( '.cdx-text-input__clear-icon' );

			await clearElement.trigger( 'click' );
			expect( wrapper.emitted()[ 'update:modelValue' ] ).toBeTruthy();
			expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ '' ] );
		} );

		it( 'emits a "clear" event on icon click', async () => {
			const wrapper = mount(
				CdxTextInput,
				{ props: { modelValue: 'Initial value', endIcon: cdxIconInfoFilled, clearable: true } }
			);
			const clearElement = wrapper.find( '.cdx-text-input__clear-icon' );

			await clearElement.trigger( 'click' );
			expect( wrapper.emitted().clear ).toBeTruthy();
		} );
	} );

	describe( 'Public methods', () => {
		// Testing DOM element behavior is not really appropriate here
		// so these tests just serve as a reminder to not break the public
		// interface that this component exposes
		it( 'exposes a public focus() method', () => {
			const wrapper = mount( CdxTextInput, {
				props: { modelValue: 'Initial value' }
			} );

			expect( typeof wrapper.vm.focus ).toBe( 'function' );
		} );

		it( 'exposes a public blur() method', () => {
			const wrapper = mount( CdxTextInput, {
				props: { modelValue: 'Initial value' }
			} );

			expect( typeof wrapper.vm.blur ).toBe( 'function' );
		} );
	} );
} );
