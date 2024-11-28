import { mount, shallowMount } from '@vue/test-utils';
import { BreadcrumbItem } from '../../types';
import CdxBreadcrumb from './Breadcrumb.vue';
import CdxIcon from '../../components/icon/Icon.vue';
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
		{ text: 'Some Home', href: '/some-home', showDivider: true },
		{ text: 'Some Section', href: '/some-section', showDivider: true },
		{ text: 'Some Subsection', href: '/some-subsection', showDivider: true },
		{ text: 'Some Active Breadcrumb', href: '', active: true, showDivider: false }
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

	describe( 'Behavior', () => {
		it( 'renders no items when the items list is empty', () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: { items: [] }
			} );
			expect( wrapper.findAll( 'li' ).length ).toBe( 0 );
		} );

		it( 'renders all items if less than maxVisible', () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: {
					items: breadcrumbItems.slice( 0, 3 ),
					maxVisible: 5
				}
			} );
			expect( wrapper.findAll( 'li' ).length ).toBe( 3 );
		} );

		it( 'truncates long item texts and shows tooltips', async () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: {
					items: breadcrumbItems.map( ( item ) => ( {
						...item,
						text: `Some Long ${ item.text }`,
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

			expect( wrapper.find( '.cdx-breadcrumb__overflow' ).exists() ).toBe( true );
			const overflowButton = wrapper.find( '.cdx-breadcrumb__overflow-button' );
			expect( overflowButton.attributes( 'aria-label' ) ).toBe( 'More navigation options' );
			expect( wrapper.findAll( '.cdx-breadcrumb__link' ).length ).toBe( 2 );
		} );

		it( 'adds aria-current to the active breadcrumb', () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: {
					items: breadcrumbItems
				}
			} );
			expect( wrapper.find( '[aria-current="page"]' ).exists() ).toBe( true );
		} );

		it( 'renders icons for separators and overflow buttons', () => {
			const wrapper = mount( CdxBreadcrumb, {
				props: {
					items: breadcrumbItems,
					maxVisible: 2
				},
				global: {
					components: { CdxIcon }
				}
			} );

			expect( wrapper.findAll( '.cdx-breadcrumb__separator-icon' ).length ).toBeGreaterThan( 0 );
			expect( wrapper.find( '.cdx-breadcrumb__overflow-button' ).findComponent( CdxIcon ).exists() ).toBe( true );
		} );
	} );
} );
