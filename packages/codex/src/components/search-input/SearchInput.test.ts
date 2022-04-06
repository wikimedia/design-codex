import { mount } from '@vue/test-utils';
import CdxSearchInput from './SearchInput.vue';
import CdxTextInput from '../text-input/TextInput.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		props: {
			modelValue?: string | number,
			buttonLabel?: string
		},
		attrs?: Record<string, string|number|boolean>
	];

	const cases: Case[] = [
		[ 'Default', { modelValue: '' } ],
		[ 'With submit button', { modelValue: '', buttonLabel: 'Search' } ],
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
