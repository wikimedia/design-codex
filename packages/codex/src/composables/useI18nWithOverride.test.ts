import { defineComponent, toRef } from 'vue';
import { mount } from '@vue/test-utils';
import useI18nWithOverride from './useI18nWithOverride';

describe( 'useI18nWithOverride', () => {
	const defaultMessage = 'Default message';
	const TestComponent = defineComponent( {
		template: '<p>{{ message }}</p>',
		props: {
			overrideMessage: {
				type: String,
				default: ''
			}
		},
		setup( props ) {
			const message = useI18nWithOverride(
				toRef( props, 'overrideMessage' ),
				'cdx-search-input-search-button-label',
				'Default message'
			);
			return {
				message
			};
		}
	} );

	describe( 'when no i18n function is provided', () => {
		it( 'uses the default string value if no override is set', () => {
			const wrapper = mount( TestComponent );
			expect( wrapper.find( 'p' ).text() ).toBe( defaultMessage );
		} );

		it( 'uses the override value if the override prop is set', () => {
			const wrapper = mount( TestComponent, {
				props: {
					overrideMessage: 'Prop value'
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'Prop value' );
		} );
	} );

	describe( 'when an i18n function is provided', () => {
		const dummyI18nMessage = 'I18n message';
		const provideI18nFunction = {
			CdxI18nFunction: () => dummyI18nMessage
		};

		it( 'uses the message if no override is set', () => {
			const wrapper = mount( TestComponent, {
				global: {
					provide: provideI18nFunction
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( dummyI18nMessage );
		} );

		it( 'uses the override value if the override prop is set', () => {
			const wrapper = mount( TestComponent, {
				props: {
					overrideMessage: 'Prop value'
				},
				global: {
					provide: provideI18nFunction
				}
			} );
			expect( wrapper.find( 'p' ).text() ).toBe( 'Prop value' );
		} );
	} );
} );
