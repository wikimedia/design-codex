import { mount } from '@vue/test-utils';
import { ContainerSize } from '../../types';
import { ContainerSizes } from '../../constants';
import CdxContainer from './Container.vue';
import CdxImage from '../image/Image.vue';

describe( 'Container', () => {
	const validImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/d9/MoYu_accessories_box.jpg';

	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props?: { size?: ContainerSize },
			slot?: string
		];

		const cases: Case[] = [
			[ 'No props and no slot', {}, '' ],
			...ContainerSizes.map( ( size ) : Case => [
				'renders a $( size ) container with a custom slot content',
				{ size: size },
				'<cdx-image src="${ validImageSrc }" width="400" height="220" alt="Valid image." />'
			] )
		];

		test.each( cases )(
			'Case %# %s: (%p) => HTML',
			( _, props, slot ) => {
				const wrapper = mount( CdxContainer, {
					global: {
						components: { CdxImage }
					},
					props: props,
					slot: slot ? { default: slot } : {}
				} );
				expect( wrapper.element ).toMatchSnapshot();
			},
			10000
		);
	} );

	describe( 'handles functional cases', () => {
		it( 'renders when CdxImage is provided in the slot', () => {
			const wrapper = mount( CdxContainer, {
				global: {
					components: { CdxImage }
				},
				slots: {
					default: `<cdx-image src="${ validImageSrc }" width="400" height="220" alt="Valid image." />`
				}
			} );
			expect( wrapper.findComponent( CdxImage ).classes() ).toContain( 'cdx-image-wrapper' );
		} );
	} );
} );
