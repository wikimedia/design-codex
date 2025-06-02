import { shallowMount } from '@vue/test-utils';
import { cdxIconCamera, cdxIconSuccess, cdxIconArticle, Icon } from '@wikimedia/codex-icons';
import { StatusTypes } from '../../constants';
import { StatusType } from '../../types';
import CdxInfoChip from './InfoChip.vue';

describe( 'InfoChip', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				status?: StatusType
				icon?: Icon
			},
			slot: string
		];

		const cases: Case[] = [
			[ 'Default props', {}, '<p>Chip content</p>' ],
			...StatusTypes.map( ( status ) : Case => [
				`${ status } status`,
				{ status },
				'<p>Chip content</p>'
			] ),
			[ 'Custom icon', { icon: cdxIconArticle }, '<p>Message content</p>' ]

		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props, slot ) => {
			const wrapper = shallowMount( CdxInfoChip,
				{
					props: props,
					slots: { default: slot }
				} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when the notice status is used', () => {
		it( 'does not show an icon by default', () => {
			const wrapper = shallowMount( CdxInfoChip );
			expect( wrapper.vm.computedIcon ).toBe( null );
		} );

		describe( 'and an icon is provided', () => {
			it( 'shows user provided icon', () => {
				const wrapper = shallowMount( CdxInfoChip, { props: { icon: cdxIconCamera } } );
				expect( wrapper.findComponent( { name: 'cdx-icon' } ) ).toBeTruthy();
				expect( wrapper.vm.computedIcon ).toBe( cdxIconCamera );
			} );
		} );
	} );

	describe( 'when a non-notice status is used', () => {
		it( 'does not allow custom icon', () => {
			const wrapper = shallowMount( CdxInfoChip, { props: { status: 'success', icon: cdxIconCamera } } );
			expect( wrapper.vm.computedIcon ).toBe( cdxIconSuccess );
		} );
	} );
} );
