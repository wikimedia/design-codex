import { mount } from '@vue/test-utils';
import CdxMenuItem from './MenuItem.vue';
import cdxIcon from '../icon/Icon.vue';
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
const testMenuItemWithLang = {
	id: 'test-menu-item-with-lang',
	value: 'menuItemWithLangValue',
	label: 'Menu item with lang',
	match: '(match)',
	description: 'la descripción en español',
	language: {
		label: 'en',
		match: 'en',
		description: 'es'
	}
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
		[ 'Item with match', { ...testMenuItem, match: '(match)' } ],
		[ 'Item with url', testSearchResult ],
		[ 'Item with icon', { ...testSearchResult, icon: cdxIconTag } ],
		[ 'Item with thumbnail', { ...testSearchResult, thumbnail: testThumbnail }, true ],
		[ 'Item with placeholder thumbnail', testSearchResult, true ],
		[ 'Item with search query', testSearchResult, false, testQuery ],
		[ 'Item with language attributes', testMenuItemWithLang ],
		[ 'Item with language attributes and search query', testMenuItemWithLang, false, 'match' ]
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
	describe( 'When "showThumbnail" is set to true', () => {
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
		it( 'shows a placeholder, if thumbnail property is not set', () => {
			const wrapper = mount( CdxMenuItem, {
				props: { ...testSearchResult, showThumbnail: true }
			} );
			const placeholderIcon = wrapper.findComponent( cdxIcon );
			expect( placeholderIcon.exists() ).toBeTruthy();
		} );
		it( 'shows a placeholder while image is loading', () => {
			const wrapper = mount( CdxMenuItem, {
				props: { ...testSearchResult, thumbnail: testThumbnail, showThumbnail: true }
			} );

			const placeholderIcon = wrapper.findComponent( cdxIcon );
			const thumbail = wrapper.find( '.cdx-menu-item__thumbnail' );
			expect( placeholderIcon.exists() ).toBeTruthy();
			expect( thumbail.exists() ).toBeFalsy();
		} );
		it( 'shows thumbnail when image is loaded', async () => {
			const wrapper = mount( CdxMenuItem, {
				props: { ...testSearchResult, thumbnail: testThumbnail, showThumbnail: true }
			} );
			jest.runAllTimers();
			await wrapper.vm.$nextTick();
			const placeholderIcon = wrapper.findComponent( cdxIcon );
			const thumbail = wrapper.find( '.cdx-menu-item__thumbnail' );
			expect( placeholderIcon.exists() ).toBeFalsy();
			expect( thumbail.exists() ).toBeTruthy();
		} );
	} );
	it( 'emits change event on main mouse button mousedown', async () => {
		const wrapper = mount( CdxMenuItem, {
			props: { ...testSearchResult }
		} );
		await wrapper.trigger( 'mousedown' );
		expect( wrapper.emitted( 'change' ) ).toBeTruthy();
		expect( wrapper.emitted( 'change' )?.[ 0 ] ).toEqual( [ 'active', true ] );
	} );
	it( 'does nothing on right click', async () => {
		const wrapper = mount( CdxMenuItem, {
			props: { ...testSearchResult }
		} );
		await wrapper.trigger( 'mousedown', { button: 2 } );
		expect( wrapper.emitted( 'change' ) ).toBeFalsy();
	} );
} );
