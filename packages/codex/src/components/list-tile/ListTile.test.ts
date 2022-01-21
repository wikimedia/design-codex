import { mount } from '@vue/test-utils';
import CdxListTile from './ListTile.vue';
import { SearchResult } from '../../types';

const testItem = {
	value: 'value',
	description: 'An example item',
	url: 'https://example.org/item'
};
const testQuery = 'Label f ';
const testThumbnail = {
	mimetype: 'image/jpeg',
	width: 200,
	height: 150,
	url: 'https://example.org/item/thumbnail.jpg'
};

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		item: SearchResult,
		searchQuery?: string,
		highlightQuery?: boolean,
		hideThumbnail?: boolean,
		hideDescription?: boolean
	];

	const cases: Case[] = [
		[ 'Item with label', { label: 'Label for item', ...testItem } ],
		[ 'With search query', { label: 'Label for item', ...testItem }, testQuery ],
		[ 'With search query and highlight', { label: 'Label for item', ...testItem }, testQuery, true ],
		[ 'With thumbnail', { thumbnail: testThumbnail, ...testItem } ],
		[ 'Hide thumbnail', testItem, '', true, true ],
		[ 'Hide description', testItem, '', true, false, true ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => HTML',
		( _, item, searchQuery = '', highlightQuery = false, hideThumbnail = false, hideDescription = false ) => {
			const wrapper = mount( CdxListTile, {
				props: { item, searchQuery, highlightQuery, hideThumbnail, hideDescription }
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
} );

describe( 'ListTile', () => {
	it( 'computes background-image value with thumbnail', () => {
		const wrapper = mount( CdxListTile, {
			props: { item: { thumbnail: testThumbnail, ...testItem } }
		} );
		expect( wrapper.vm.thumbnailBackgroundImage ).toBe( 'url(https://example.org/item/thumbnail.jpg)' );
	} );

	it( 'computes background-image value without thumbnail', () => {
		const wrapper = mount( CdxListTile, { props: { item: testItem } } );
		expect( wrapper.vm.thumbnailBackgroundImage ).toBe( '' );
	} );
} );
