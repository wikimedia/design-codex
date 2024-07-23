import { mount } from '@vue/test-utils';
import CdxSearchInput from './SearchInput.vue';
import CdxTextInput from '../text-input/TextInput.vue';
import CdxButton from '../button/Button.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			modelValue?: string | number,
			buttonLabel?: string,
			useButton?: boolean
		},
		attrs?: Record<string, string|number|boolean>
	];

	const cases: Case[] = [
		[ 'Default', { modelValue: '' } ],
		[ 'With submit button', { modelValue: '', useButton: true } ],
		[ 'With custom visible button label', { modelValue: '', useButton: true, buttonLabel: 'Search results' } ],
		[ 'With attributes', { modelValue: '' }, { disabled: true, placeholder: 'Start typing...' } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, attrs = {} ) => {
		const wrapper = mount( CdxSearchInput, { props: props, attrs: attrs } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

it( 'calls TextInput focus method', async () => {
	const wrapper = mount( CdxSearchInput );
	const textInput = wrapper.findComponent( CdxTextInput );
	textInput.vm.focus = jest.fn();
	await wrapper.vm.focus();
	expect( textInput.vm.focus ).toHaveBeenCalled();
} );

describe( 'when a native input event is triggered', () => {
	const eventNames = [
		'input',
		'change',
		'focus',
		'blur'
	];
	test.each( eventNames )( 'Case %#: emits %s event', async ( eventName ) => {
		const wrapper = mount( CdxSearchInput );

		await wrapper.get( 'input' ).trigger( eventName );
		expect( wrapper.emitted()[ eventName ] ).toBeTruthy();
	} );
} );

describe( 'when an i18n function is provided', () => {
	const dummyI18nMessage = 'I18n message';
	const provideI18nFunction = {
		CdxI18nFunction: () => dummyI18nMessage
	};

	it( 'and the buttonLabel prop is not set, uses the i18n message', () => {
		const wrapper = mount( CdxSearchInput, {
			props: {
				useButton: true
			},
			global: {
				provide: provideI18nFunction
			}
		} );
		const button = wrapper.findComponent( CdxButton );
		expect( button.text() ).toBe( 'I18n message' );
	} );

	it( 'and the buttonLabel prop is set, uses the prop', () => {
		const wrapper = mount( CdxSearchInput, {
			props: {
				useButton: true,
				buttonLabel: 'Label from prop'
			},
			global: {
				provide: provideI18nFunction
			}
		} );
		const button = wrapper.findComponent( CdxButton );
		expect( button.text() ).toBe( 'Label from prop' );
	} );
} );
