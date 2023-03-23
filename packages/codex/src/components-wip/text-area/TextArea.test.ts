import { mount } from '@vue/test-utils';
import CdxTextArea from './TextArea.vue';

describe( 'TextArea', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string
		];

		const cases: Case[] = [
			[ 'default text area' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', () => {
			const wrapper = mount( CdxTextArea );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when rendered to the UI', () => {
		it( 'should display an empty text area element', () => {
			const wrapper = mount( CdxTextArea );
			expect( wrapper.get( 'textarea' ).text() ).toBe( '' );
		} );
	} );
} );
