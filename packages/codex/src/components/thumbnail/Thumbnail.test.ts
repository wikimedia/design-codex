import { mount } from '@vue/test-utils';
import CdxThumbnail from './Thumbnail.vue';
import CdxIcon from '../icon/Icon.vue';
import { Icon, cdxIconArticle } from '@wikimedia/codex-icons';
import { Thumbnail } from '../../types';

const testThumbnail: Thumbnail = {
	url: 'https://example.org/test/thumbnail.jpg'
};

describe( 'Thumbnail', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			placeholderIcon?: Icon
		];

		const cases: Case[] = [
			[ 'With default placeholder icon' ],
			[ 'With custom placeholder icon', cdxIconArticle ]
		];

		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, placeholderIcon = undefined ) => {
			const wrapper = mount( CdxThumbnail, {
				props: { placeholderIcon }
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	beforeEach( () => {
		jest.useFakeTimers();
		Object.defineProperty( Image.prototype, 'src', {
			set() {
				setTimeout( () => this.onload(), 1000 );
			}
		} );
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );

	describe( 'when the thumbnail property is not set', () => {
		it( 'shows a placeholder', () => {
			const wrapper = mount( CdxThumbnail );

			const placeholderIcon = wrapper.findComponent( CdxIcon );
			expect( placeholderIcon.exists() ).toBeTruthy();
		} );
	} );

	describe( 'when the image is loading', () => {
		it( 'shows a placeholder', () => {
			const wrapper = mount( CdxThumbnail, {
				props: { thumbnail: testThumbnail }
			} );

			const placeholderIcon = wrapper.findComponent( CdxIcon );
			const thumbnail = wrapper.find( '.cdx-thumbnail__image' );
			expect( placeholderIcon.exists() ).toBeTruthy();
			expect( thumbnail.exists() ).toBeFalsy();
		} );
	} );

	describe( 'when the image has loaded', () => {
		it( 'shows the thumbnail', async () => {
			const wrapper = mount( CdxThumbnail, {
				props: { thumbnail: testThumbnail }
			} );

			jest.runAllTimers();
			await wrapper.vm.$nextTick();
			const placeholderIcon = wrapper.findComponent( CdxIcon );
			const thumbnail = wrapper.find( '.cdx-thumbnail__image' );
			expect( placeholderIcon.exists() ).toBeFalsy();
			expect( thumbnail.exists() ).toBeTruthy();
		} );
	} );
} );
