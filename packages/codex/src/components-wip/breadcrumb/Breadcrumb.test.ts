import { mount, shallowMount } from '@vue/test-utils';
import { BreadcrumbItem } from '../../types';
import CdxBreadcrumb from './Breadcrumb.vue';
import CdxTooltip from '../../components/tooltip/Tooltip';

type Case = [
	msg: string,
	props: {
		items: BreadcrumbItem[];
		maxVisible?: number;
		truncateLength?: number;
	}
];

describe( 'Breadcrumb', () => {
	const breadcrumbItems: BreadcrumbItem[] = [
		{ label: 'Some Home', url: '/some-home' },
		{ label: 'Some Section', url: '/some-section' },
		{ label: 'Some Subsection', url: '/some-subsection' },
		{ label: 'Some Active Breadcrumb', url: '' }
	];

	describe( 'matches the snapshot', () => {
		const cases: Case[] = [
			[
				'With empty Items',
				{
					items: []
				}
			],
			[
				'With a single item',
				{
					items: [
						breadcrumbItems[ 0 ]
					]
				}
			],
			[
				'With exact items',
				{
					items: breadcrumbItems,
					maxVisible: 4,
					truncateLength: 10
				}
			],
			[
				'With overflow',
				{
					items: breadcrumbItems,
					maxVisible: 3
				}
			],
			[
				'With truncation and overflow',
				{
					items: breadcrumbItems,
					maxVisible: 2,
					truncateLength: 10
				}
			]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
			const wrapper = shallowMount( CdxBreadcrumb, {
				props,
				global: {
					stubs: {
						CdxIcon: false
					}
				}
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'when the number of items is fewer than maxVisible', () => {
		it( 'renders all items', () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: {
					items: breadcrumbItems.slice( 0, 3 ),
					maxVisible: 5
				}
			} );
			expect( wrapper.findAll( 'li' ).length ).toBe( 3 );
		} );
	} );

	describe( 'when the number of items is greater than maxVisible', () => {
		it( 'renders overflow items in a menu when exceeding maxVisible', () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: {
					items: breadcrumbItems,
					maxVisible: 2
				},
				global: {
					stubs: { 'cdx-menu-button': true }
				}
			} );

			expect( wrapper.find( '.cdx-breadcrumb__list__overflow' ).exists() ).toBe( true );
			const overflowButton = wrapper.find( '.cdx-breadcrumb__overflow-button' );
			expect( overflowButton.attributes( 'aria-label' ) ).toBe( 'More navigation options' );
			expect( wrapper.findAll( '.cdx-breadcrumb__link' ).length ).toBe( 2 );
		} );
	} );

	describe( 'when an item is truncated', () => {
		it( 'truncates the texts and shows tooltips', async () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: {
					items: breadcrumbItems.map( ( item ) => ( {
						...item,
						label: `Some Long ${ item.label }`,
						isTruncated: true
					} ) ),
					truncateLength: 10
				},
				global: {
					components: { CdxTooltip }
				}
			} );

			await wrapper.vm.$nextTick();

			const truncatedItem = wrapper.find( 'a[aria-describedby]' );
			expect( truncatedItem.text() ).toContain( 'Some Long …' );
			expect( truncatedItem.attributes( 'aria-describedby' ) ).toBeTruthy();

			const tooltipId = truncatedItem.attributes( 'aria-describedby' );
			expect( wrapper.find( `#${ tooltipId }` ).exists() ).toBe( true );
		} );
	} );
} );
