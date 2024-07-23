import { PropType, defineComponent, h, provide, toRef } from 'vue';
import { mount } from '@vue/test-utils';
import useI18n from './useI18n';
import { I18nFunction, I18nMessageValue } from '../types';

describe( 'useI18n', () => {
	const ChildComponent = defineComponent( {
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
				'cdx-test-message',
				props.defaultMessage,
				[ toRef( props, 'messageParam' ) ]
			);
			return { message };
		}
	} );
	const ParentComponent = defineComponent( {
		props: {
			defaultMessage: {
				type: [ String, Function ] as PropType<I18nMessageValue<string>>,
				required: true
			},
			messageParam: {
				type: String,
				default: null
			},
			providedI18nFunc: {
				type: Function as PropType<I18nFunction>,
				default: null
			}
		},
		render() {
			return h( ChildComponent, {
				defaultMessage: this.defaultMessage,
				messageParam: this.messageParam
			} );
		},
		setup( props ) {
			if ( props.providedI18nFunc ) {
				provide( 'CdxI18nFunction', props.providedI18nFunc );
			}
		}
	} );

	describe( 'when no i18n function is provided', () => {
		it( 'uses the default string value', () => {
			const wrapper = mount( ParentComponent, {
				props: {
					defaultMessage: 'default text'
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text' );
		} );

		it( 'uses the default function value', () => {
			const wrapper = mount( ParentComponent, {
				props: {
					defaultMessage: ( n: string ) => `default text from function ${ n }`,
					messageParam: '123'
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text from function 123' );
		} );

		it( 'is reactive to changes in parameters passed as refs', async () => {
			const wrapper = mount( ParentComponent, {
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
			const wrapper = mount( ParentComponent, {
				props: {
					defaultMessage: 'default text',
					messageParam: '123',
					providedI18nFunc: ( key: string, n: string ) =>
						key === 'cdx-test-message' ? `provided text ${ n }` : null
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'provided text 123' );
		} );

		it( 'is reactive to changes in parameters passed as refs', async () => {
			const wrapper = mount( ParentComponent, {
				props: {
					defaultMessage: 'default text',
					messageParam: '123',
					providedI18nFunc: ( key: string, n: string ) =>
						key === 'cdx-test-message' ? `provided text ${ n }` : null
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'provided text 123' );
			await wrapper.setProps( { messageParam: '456' } );
			expect( wrapper.find( 'p' ).text() ).toBe( 'provided text 456' );
		} );
	} );

	describe( 'when the i18n function returns null', () => {
		it( 'falls back to the default value', () => {
			const wrapper = mount( ParentComponent, {
				props: {
					defaultMessage: 'default text',
					providedI18nFunc: () => null
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'default text' );
		} );
	} );
} );
