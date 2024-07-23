import { shallowMount } from '@vue/test-utils';
import { Icon, cdxIconMapPin } from '@wikimedia/codex-icons';
import CdxLabel from './Label.vue';

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		labelText: string,
		props: {
			icon?: Icon,
			optionalFlag?: string,
			optional?: boolean,
			visuallyHidden?: boolean,
			isLegend?: boolean,
			inputId?: string,
			descriptionId?: string,
			disabled?: boolean
		},
		description?: string
	];
	const cases: Case[] = [
		[ 'Default', 'Label text', {} ],
		[ 'With icon', 'Label text', { icon: cdxIconMapPin } ],
		[ 'With optional flag using deprecated API', 'Label text', { optionalFlag: '(optional)' } ],
		[ 'With optional flag', 'Label text ', { optional: true } ],
		[ 'With visually hidden label', 'Label text', { visuallyHidden: true } ],
		[ 'As legend', 'Label text', { isLegend: true } ],
		[ 'With input ID', 'Label text', { inputId: 'my-input-123' } ],
		[ 'Disabled', 'Label text', { disabled: true } ],
		[ 'With description and description ID', 'Label text', { descriptionId: 'my-description-123' }, 'Description text' ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, labelText, props, description = undefined ) => {
		const wrapper = shallowMount( CdxLabel, { props, slots: {
			default: labelText,
			...( description === undefined ? {} : { description } )
		} } );
		expect( wrapper.element ).toMatchSnapshot();
	} );

	describe( 'when an i18n function is provided', () => {
		const dummyI18nMessage = 'I18n message';
		const provideI18nFunction = {
			CdxI18nFunction: () => dummyI18nMessage
		};

		it( 'and the optionalFlag prop is not set, uses the i18n message', () => {
			const wrapper = shallowMount( CdxLabel, {
				props: {
					optional: true
				},
				global: {
					provide: provideI18nFunction
				}
			} );
			const label = wrapper.findComponent( CdxLabel );

			expect( label.text() ).toBe( 'I18n message' );
		} );

		it( 'and the optionalFlag prop is set, uses the prop', () => {
			const wrapper = shallowMount( CdxLabel, {
				props: {
					optional: true,
					optionalFlag: 'Optional flag from prop'
				},
				global: {
					provide: provideI18nFunction
				}
			} );
			const label = wrapper.findComponent( CdxLabel );

			expect( label.text() ).toBe( 'Optional flag from prop' );
		} );
	} );
} );
