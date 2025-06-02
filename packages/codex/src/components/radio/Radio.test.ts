import { mount, shallowMount } from '@vue/test-utils';
import CdxRadio from './Radio.vue';
import CdxTextArea from '../text-area/TextArea.vue';
import { ValidationStatusType } from '../../types';

describe( 'Radio', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				modelValue: string|number|boolean,
				inputValue: string|number|boolean,
				name: string,
				disabled?: boolean,
				inline?: boolean,
				status?: ValidationStatusType
			},
			defaultSlot: string,
			description?: string,
			customInput?: string
		];

		const cases: Case[] = [
			[ 'String value', { modelValue: 'radio-1', inputValue: 'radio-1', name: 'radios-string' }, 'Radio 1' ],
			[ 'Number value', { modelValue: 2, inputValue: 2, name: 'radios-number' }, 'Radio 2' ],
			[ 'Boolean value', { modelValue: true, inputValue: true, name: 'radios-boolean' }, 'True' ],
			[ 'Disabled', { modelValue: 'radio-1', inputValue: 'radio-1', name: 'radios-string', disabled: true }, 'Disabled radio' ],
			[ 'Inline', { modelValue: 'radio-1', inputValue: 'radio-1', name: 'radios-string', inline: true }, 'Inline radio' ],
			[ 'With description', { modelValue: 'radio-1', inputValue: 'radio-1', name: 'radios-string' }, 'Radio 1', 'Description text' ],
			[ 'With custom input', { modelValue: 'radio-1', inputValue: 'radio-1', name: 'radios-custom-input' }, 'Radio with custom input', 'Description text', '<cdx-text-area />' ],
			[ 'With error', { modelValue: '', inputValue: '', name: 'radios-string', status: 'error' }, 'Radio with error' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, defaultSlot, description = undefined, customInput = undefined ) => {
			const wrapper = mount( CdxRadio, {
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

	describe( 'when selected', () => {
		it( 'emits update:modelValue event', async () => {
			const props = {
				modelValue: 'radio-1',
				inputValue: 'radio-2',
				name: 'radio-group'
			};
			const wrapper = shallowMount( CdxRadio, { props: props, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element;

			input.checked = true;
			await wrapper.find( 'input' ).trigger( 'change' );

			expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
			expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ 'radio-2' ] );
		} );
	} );

	describe( 'when modelValue matches inputValue', () => {
		it( 'is selected when modelValue matches inputValue', () => {
			const props = {
				modelValue: 'radio-1',
				inputValue: 'radio-1',
				name: 'radio-group'
			};
			const wrapper = shallowMount( CdxRadio, { props: props, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element;

			expect( input.checked ).toEqual( true );
		} );
	} );

	describe( 'when modelValue does not match inputValue', () => {
		it( 'is not selected', () => {
			const props = {
				modelValue: 'radio-1',
				inputValue: 'radio-2',
				name: 'radio-group'
			};
			const wrapper = shallowMount( CdxRadio, { props: props, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element;

			expect( input.checked ).toEqual( false );
		} );
	} );

	describe( 'when the label is clicked', () => {
		it( 'focuses on the input', async () => {
			const props = {
				modelValue: 'radio-1',
				inputValue: 'radio-2',
				name: 'radio-group'
			};
			const wrapper = shallowMount( CdxRadio, { props: props, slots: { default: 'Label' } } );
			const input = wrapper.find( 'input' ).element;
			input.focus = jest.fn();

			await wrapper.find( '.cdx-radio__label' ).trigger( 'click' );

			expect( input.focus ).toHaveBeenCalled();
		} );
	} );
} );
