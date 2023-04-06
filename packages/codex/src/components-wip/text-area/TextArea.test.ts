import { mount } from '@vue/test-utils';
import CdxTextArea from './TextArea.vue';

describe( 'TextArea', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				modelValue?: string
			},
			attrs?: Record<string, string|number>
		];

		const cases: Case[] = [
			[ 'with modelValue prop and no attributes', { modelValue: 'Earth Day' } ],
			[ 'with attributes', { }, { placeholder: 'Start typing...' } ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, attrs = {} ) => {
			const wrapper = mount( CdxTextArea, { props, attrs } );

			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when user types in the textarea field', () => {
		it( 'should emit an event that updates the value of modelValue', async () => {
			const wrapper = mount( CdxTextArea );
			const textarea = wrapper.find( 'textarea' ).element as HTMLTextAreaElement;
			expect( textarea.value ).toEqual( '' );

			await wrapper.get( 'textarea' ).setValue( 'New value' );
			expect( wrapper.emitted( 'update:modelValue' ) ).toBeTruthy();
			expect( textarea.value ).toEqual( 'New value' );
			expect( wrapper.emitted( 'update:modelValue' )?.[ 0 ] ).toEqual( [ 'New value' ] );
		} );
	} );

	describe( 'when rendered to the UI', () => {
		it( 'should display an empty text area element', () => {
			const wrapper = mount( CdxTextArea );

			expect( wrapper.get( 'textarea' ).text() ).toBe( '' );
		} );

		it( 'should split the attributes between top-level elements and inner elements', () => {
			const wrapper = mount( CdxTextArea, {
				attrs: {
					placeholder: 'Start typing...',
					class: 'awesome-textarea'
				}
			} );

			expect( wrapper.attributes() ).toEqual( {
				class: 'cdx-text-area awesome-textarea'
			} );
			expect( wrapper.get( 'textarea' ).attributes() ).toEqual( {
				placeholder: 'Start typing...'
			} );
		} );
	} );
} );
