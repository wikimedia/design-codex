import { mount } from '@vue/test-utils';
import { cdxIconEdit } from '@wikimedia/codex-icons';
import CdxAccordion from './Accordion.vue';

describe( 'Accordion', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				actionAlwaysVisible?: boolean
				actionIcon?: string,
				disabled?: boolean,
			},
			slotTitle: string,
			slotContent: string,
		];

		const cases: Case[] = [
			[ 'Renders with basic basic title and text content', {}, 'Title', 'Content' ],
			[ 'Renders accordion disabled', { disabled: true }, 'Title', 'Content' ],
			[ 'Renders accordion with icon', { actionAlwaysVisible: true }, 'Title', 'Content' ],
			[ 'Renders accordion with action button', { actionIcon: cdxIconEdit }, 'Title', 'Content' ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slotTitle, slotContent ) => {
			const wrapper = mount( CdxAccordion, {
				props,
				slots: {
					title: slotTitle,
					content: slotContent
				}
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when the header is closed and is clicked', () => {
		it( 'should expand the accordion', async () => {
			const wrapper = mount( CdxAccordion, {
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );
			await wrapper.find( '.cdx-accordion__toggle' ).trigger( 'click' );
			expect( wrapper.get( '.cdx-accordion__content' ).text() ).toBe( 'Content' );
		} );
	} );
} );
