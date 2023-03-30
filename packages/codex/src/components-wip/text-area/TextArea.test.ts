import { mount } from '@vue/test-utils';
import CdxTextArea from './TextArea.vue';

describe( 'TextArea', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			attrs?: Record<string, string|number>
		];

		const cases: Case[] = [
			[ 'default text area' ],
			[ 'with attributes', { placeholder: 'Start typing...' } ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, attrs = {} ) => {
			const wrapper = mount( CdxTextArea, { attrs: attrs } );
			expect( wrapper.element ).toMatchSnapshot();
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
