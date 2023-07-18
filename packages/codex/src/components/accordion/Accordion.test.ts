import { mount } from '@vue/test-utils';
import { cdxIconEdit, Icon } from '@wikimedia/codex-icons';
import CdxAccordion from './Accordion.vue';

describe( 'Accordion', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				actionAlwaysVisible?: boolean
				actionIcon?: Icon,
				actionButtonLabel?: string
			},
			slotTitle: string,
			slotContent: string,
		];

		const cases: Case[] = [
			[ 'Renders with basic basic title and text content', {}, 'Title', 'Content' ],
			[ 'Action button is not visible when collapsed', { actionIcon: cdxIconEdit, actionButtonLabel: 'Edit' }, 'Title', 'Content' ],
			[ 'actionAlwaysVisible makes action button visible even when collapsed', { actionIcon: cdxIconEdit, actionButtonLabel: 'Edit', actionAlwaysVisible: true }, 'Title', 'Content' ]
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

		it( 'should show the action button', async () => {
			const wrapper = mount( CdxAccordion, {
				props: {
					actionIcon: cdxIconEdit,
					actionButtonLabel: 'Edit'
				},
				slots: {
					title: 'Title',
					default: 'Content'
				}
			} );
			expect( wrapper.find( '.cdx-accordion__action' ).exists() ).toBeFalsy();
			await wrapper.find( '.cdx-accordion__toggle' ).trigger( 'click' );
			expect( wrapper.find( '.cdx-accordion__action' ).exists() ).toBeTruthy();
		} );
	} );
} );
