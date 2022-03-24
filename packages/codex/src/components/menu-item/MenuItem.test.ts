import { mount } from '@vue/test-utils';
import CdxMenuItem from './MenuItem.vue';
import { MenuItemDataWithId, SearchResultWithId } from '../../types';
import { cdxIconTag } from '@wikimedia/codex-icons';

const testMenuItem = {
	id: 'test-menu-item',
	value: 'menuItemValue'
};
const testMenuItemLabel = 'Test menu item';
const testSearchResult = {
	id: 'test-search-result',
	value: 'searchResultValue',
	description: 'Test search result',
	url: 'https://example.org/test'
};
const testQuery = 'Test search';
const testThumbnail = {
	mimetype: 'image/jpeg',
	width: 200,
	height: 150,
	url: 'https://example.org/test/thumbnail.jpg'
};

describe( 'matches the snapshot', () => {
	type Case = [
		msg: string,
		item: MenuItemDataWithId|SearchResultWithId,
		showThumbnail?: boolean,
		searchQuery?: string,

	];

	const cases: Case[] = [
		[ 'Item without label', testMenuItem ],
		[ 'Item with label', { ...testMenuItem, label: testMenuItemLabel } ],
		[ 'Item with url', testSearchResult ],
		[ 'Item with icon', { ...testSearchResult, icon: cdxIconTag } ],
		[ 'Item with thumbnail', { ...testSearchResult, thumbnail: testThumbnail }, true ],
		[ 'Item with placeholder thumbnail', testSearchResult, true ],
		[ 'Item with search query', testSearchResult, false, testQuery ]
	];

	test.each( cases )(
		'Case %# %s: (%p) => HTML',
		(
			_,
			item,
			showThumbnail = false,
			searchQuery = ''
		) => {
			const wrapper = mount( CdxMenuItem, {
				props: { ...item, showThumbnail, searchQuery }
			} );
			expect( wrapper.element ).toMatchSnapshot();
		} );
} );

// Note that functionality related to being part of a menu (e.g. emitting events related to menu
// state) is tested in the Menu component tests.
describe( 'CdxMenuItem', () => {
	it( 'computes background-image value without thumbnail', () => {
		const wrapper = mount( CdxMenuItem, {
			props: { ...testSearchResult, showThumbnail: true }
		} );
		expect( wrapper.vm.thumbnailBackgroundImage ).toBe( '' );
	} );
	it( 'emits change event on main mouse button mousedown', async () => {
		const wrapper = mount( CdxMenuItem, {
			props: { ...testSearchResult }
		} );
		await wrapper.trigger( 'mousedown' );
		expect( wrapper.emitted( 'change' ) ).toBeTruthy();
		expect( wrapper.emitted( 'change' )?.[ 0 ] ).toEqual( [ 'active' ] );
	} );
	it( 'does nothing on right click', async () => {
		const wrapper = mount( CdxMenuItem, {
			props: { ...testSearchResult }
		} );
		await wrapper.trigger( 'mousedown', { button: 2 } );
		expect( wrapper.emitted( 'change' ) ).toBeFalsy();
	} );
} );
