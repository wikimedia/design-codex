import { mount, shallowMount } from '@vue/test-utils';
import CdxRadio from './Radio.vue';
import CdxTextArea from '../text-area/TextArea.vue';
import { ValidationStatusType } from '../../types';

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

describe( 'Radio', () => {
	it( 'emits update:modelValue event with value when selected', async () => {
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

	it( 'is not selected when modelValue does not match inputValue', () => {
		const props = {
			modelValue: 'radio-1',
			inputValue: 'radio-2',
			name: 'radio-group'
		};
		const wrapper = shallowMount( CdxRadio, { props: props, slots: { default: 'Label' } } );
		const input = wrapper.find( 'input' ).element;

		expect( input.checked ).toEqual( false );
	} );

	it( 'focuses on the input on label click', async () => {
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

	describe( 'when default slot is provided', () => {
		it( 'displays a Label component', () => {
			const props = {
				modelValue: 'radio-1',
				inputValue: 'radio-2',
				name: 'radio-group'
			};
			const wrapper = mount( CdxRadio, { props: props, slots: { default: 'Label' } } );

			expect( wrapper.find( '.cdx-radio__label' ).exists() ).toBe( true );
			expect( wrapper.find( '.cdx-label__label__text' ).exists() ).toBe( true );
			expect( wrapper.find( '.cdx-label__label__text' ).text() ).toBe( 'Label' );
		} );
	} );

	describe( 'when description slot is provided', () => {
		it( 'displays a short description text in the Label component', () => {
			const props = {
				modelValue: 'radio-1',
				inputValue: 'radio-1',
				name: 'radio-group'
			};
			const wrapper = mount( CdxRadio, {
				props: props,
				slots: {
					default: 'Label',
					description: 'Radio description'
				},
				attachTo: document.body
			} );

			expect( wrapper.find( '.cdx-radio__label' ).exists() ).toBe( true );
			expect( wrapper.find( '.cdx-label__description' ).exists() ).toBe( true );
		} );
	} );

	describe( 'when custom-input slot is provided', () => {
		it( 'displays a custom-input component', () => {
			const props = {
				modelValue: 'radio-1',
				inputValue: 'radio-1',
				name: 'radio-group'
			};
			const wrapper = shallowMount( CdxRadio, {
				props: props,
				slots: {
					default: 'Label',
					'custom-input': '<cdx-text-area />'
				},
				global: {
					components: { CdxTextArea }
				}
			} );

			// Find the custom input wrapper div and the TextArea component within its wrapper.
			expect( wrapper.find( 'div.cdx-radio__custom-input' ).exists() ).toBe( true );
			expect( wrapper.findComponent( CdxTextArea ).exists() ).toBe( true );
		} );
	} );
} );
