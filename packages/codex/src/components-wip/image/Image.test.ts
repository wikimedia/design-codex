import { mount } from '@vue/test-utils';
import CdxImage from './Image.vue';

type Case = [
	msg: string,
	props: {
		src: string;
		alt: string;
		width?: number;
		height?: number;
		aspectRatio?: '16:9' | '3:2' | '4:3' | '1:1' | '3:4' | '2:3';
	},
	attrs?: Record<string, string|number|boolean>
];

describe( 'Image', () => {
	const validImageSrc = 'https://upload.wikimedia.org/wikipedia/commons/d/df/Full_moon_partially_obscured_by_atmosphere.jpg';
	const invalidImageSrc = 'https://example.com/invalid-image.jpg';

	describe( 'matches the snapshot', () => {
		const cases: Case[] = [
			[ 'renders in the default state with a valid source', { src: validImageSrc, alt: 'Valid image', width: 400, height: 220 } ],
			[ 'renders with a custom aspect ratio', { src: validImageSrc, alt: 'Image with aspect ratio', aspectRatio: '16:9', width: 400, height: 220 } ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
			const wrapper = mount( CdxImage, {
				props
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'handles functional cases', () => {
		it( 'triggers error state when the image fails to load', async () => {
			const wrapper = mount( CdxImage, {
				props: {
					src: invalidImageSrc,
					alt: 'Broken image',
					width: 400,
					height: 220
				}
			} );

			await wrapper.find( 'img' ).trigger( 'error' );
			expect( wrapper.emitted().error ).toBeTruthy();
			expect( wrapper.vm.isBroken ).toBeTruthy();
		} );

		it( 'computes the correct placeholder icon size based on width', () => {
			const wrapper = mount( CdxImage, {
				props: {
					src: '',
					alt: 'Alt text',
					width: 150,
					height: 220
				}
			} );

			const icon = wrapper.find( '.cdx-icon' );
			expect( icon.classes() ).toContain( 'cdx-icon--medium' );
		} );
	} );
} );
