import { PropType, defineComponent, toRef } from 'vue';
import { mount } from '@vue/test-utils';
import useI18n from './useI18n';
import { I18nMessageValue } from '../types';

describe( 'useI18n', () => {
	const TestComponent = defineComponent( {
		template: '<p>{{ message }}</p>',
		props: {
			defaultMessage: {
				type: [ String, Function ] as PropType<I18nMessageValue<string>>,
				required: true
			},
			messageParam: {
				type: String,
				default: null
			}
		},
		setup( props ) {
			const message = useI18n(
				'cdx-search-input-search-button-label',
				props.defaultMessage,
				[ toRef( props, 'messageParam' ) ]
			);
			return { message };
		}
	} );

	describe( 'when no i18n function is provided', () => {
		it( 'uses the default string value', () => {
			const wrapper = mount( TestComponent, {
				props: {
					defaultMessage: 'default text'
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text' );
		} );

		it( 'uses the default function value', () => {
			const wrapper = mount( TestComponent, {
				props: {
					defaultMessage: ( n: string ) => `default text from function ${ n }`,
					messageParam: '123'
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text from function 123' );
		} );

		it( 'is reactive to changes in parameters passed as refs', async () => {
			const wrapper = mount( TestComponent, {
				props: {
					defaultMessage: ( n: string ) => `default text from function ${ n }`,
					messageParam: '123'
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text from function 123' );
			await wrapper.setProps( { messageParam: '456' } );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text from function 456' );
		} );
	} );

	describe( 'when the i18n function returns a value', () => {
		it( 'uses the returned value', () => {
			const wrapper = mount( TestComponent, {
				props: {
					defaultMessage: 'default text',
					messageParam: '123'
				},
				global: {
					provide: {
						CdxI18nFunction: ( key: string, n: number ) =>
							key === 'cdx-search-input-search-button-label' ? `provided text ${ n }` : null
					}
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'provided text 123' );
		} );

		it( 'is reactive to changes in parameters passed as refs', async () => {
			const wrapper = mount( TestComponent, {
				props: {
					defaultMessage: 'default text',
					messageParam: '123'
				},
				global: {
					provide: {
						CdxI18nFunction: ( key: string, n: number ) =>
							key === 'cdx-search-input-search-button-label' ? `provided text ${ n }` : null
					}
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'provided text 123' );
			await wrapper.setProps( { messageParam: '456' } );
			expect( wrapper.find( 'p' ).text() ).toBe( 'provided text 456' );
		} );
	} );

	describe( 'when the i18n function returns null', () => {
		it( 'falls back to the default value', () => {
			const wrapper = mount( TestComponent, {
				props: {
					defaultMessage: 'default text'
				},
				global: {
					provide: {
						CdxI18nFunction: () => null
					}
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text' );
		} );
	} );
} );
