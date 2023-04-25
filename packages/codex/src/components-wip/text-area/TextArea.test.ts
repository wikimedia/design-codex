import { mount } from '@vue/test-utils';
import CdxTextArea from './TextArea.vue';
import { ValidationStatusType } from '../../types';

describe( 'TextArea', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				modelValue?: string,
				status?: ValidationStatusType
			},
			attrs?: Record<string, string|number|boolean>
		];

		const cases: Case[] = [
			[ 'with modelValue prop and no attributes', { modelValue: 'Earth Day' } ],
			[ 'with attributes', { }, { placeholder: 'Start typing...' } ],
			[ 'with disabled as true', { modelValue: 'Earth Day' }, { placeholder: 'Start typing...', disabled: true } ],
			[ 'with readonly as true', { modelValue: 'Earth Day' }, { placeholder: 'Start typing...', readonly: true } ],
			[ 'with error status', { status: 'error' }, { placeholder: 'Start typing...' } ]
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
		it( 'should have an empty string value inside the textarea element', () => {
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
				class: 'cdx-text-area cdx-text-area--status-default awesome-textarea'
			} );
			expect( wrapper.get( 'textarea' ).attributes() ).toEqual( {
				placeholder: 'Start typing...',
				class: 'cdx-text-area__textarea'
			} );
		} );
	} );
} );
