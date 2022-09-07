import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { CdxTypeaheadSearch, CdxMenuItem, CdxSearchInput } from '../../lib';
import { DebounceInterval, PendingDelay } from '../../constants';
import { SearchResult } from '../../types';

const propsData = {
	buttonLabel: 'Search',
	placeholder: 'Search Wikipedia',
	formAction: '/w/index.php',
	searchResults: [],
	searchResultsLabel: 'Search results',
	id: 'foo'
};

const defaultSlot = [
	'<input type="hidden" name="title" value="Special:Search">'
];
const searchFooterTextSlot = `
	<template #search-footer-text="{ searchQuery }">
		Search Wikipedia for pages containing
		<strong class="cdx-typeahead-search__search-footer__query">
			{{ searchQuery }}
		</strong>
	</template>
`;

const searchResults : SearchResult[] = [
	{
		value: 8399891,
		label: 'Co',
		url: 'https://en.wikipedia.org/wiki/CO',
		description: null,
		thumbnail: null
	},
	{
		value: 5921,
		label: 'Color',
		url: 'https://en.wikipedia.org/wiki/Color',
		description: 'visual perception of light wavelengths',
		thumbnail: {
			width: 200,
			height: 150,
			url: '//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
		}
	}
];

const searchFooterUrl = 'https://foo.org/search?query=Co';

describe( 'TypeaheadSearch initial state', () => {
	type Case = [
		msg: string,
		props: {
			id: string;
			searchResults: SearchResult[],
			formAction: string;
			buttonLabel: string;
			searchResultsLabel: string
			placeholder?: string;
			autoExpandWidth?: boolean;
			showThumbnail?: boolean;
		}
	];

	const cases: Case[] = [
		[ 'Default', propsData ],
		[ 'With `autoExpandWidth` true and `showThumbnail` true', { ...propsData, autoExpandWidth: true, showThumbnail: true } ],
		[ 'With `autoExpandWidth` true and `showThumbnail` false', { ...propsData, autoExpandWidth: true, showThumbnail: false } ]
	];

	test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );

		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'handles user focus with no input', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );

		const input = wrapper.find( '.cdx-text-input__input' );
		await input.trigger( 'focus' );
		expect( wrapper.find( '.cdx-typeahead-search' ).classes() ).not.toContain( 'cdx-typeahead-search--expanded' );
		expect( wrapper.vm.expanded ).toBeFalsy();
	} );

	it( 'handles user focus with input', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: { initialInputValue: 'foo', ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		wrapper.vm.searchQuery = 'foo';

		const input = wrapper.find( '.cdx-text-input__input' );
		await input.trigger( 'focus' );
		expect( wrapper.find( '.cdx-typeahead-search' ).classes() ).toContain( 'cdx-typeahead-search--expanded' );
		expect( wrapper.vm.expanded ).toStrictEqual( true );

		await input.trigger( 'blur' );
		expect( wrapper.find( '.cdx-typeahead-search' ).classes() ).not.toContain( 'cdx-typeahead-search--expanded' );
		expect( wrapper.vm.expanded ).toBeFalsy();
	} );

	it( 'Does nothing on arrow keydown if menu is closed', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );

		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.find( '.cdx-menu-item--highlighted' ).exists() ).toBe( false );
	} );

	it( 'Closes menu on tab', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		wrapper.vm.searchQuery = 'foo';
		wrapper.vm.expanded = true;
		await wrapper.find( 'input' ).trigger( 'keydown', { key: 'Tab' } );
		expect( wrapper.vm.expanded ).toBeFalsy();
	} );

	it( 'Follows default behavior on space keydown if menu is open', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: { initialInputValue: 'foo', ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		wrapper.vm.searchQuery = 'foo';
		wrapper.vm.expanded = true;
		await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Sets expanded to true when new results come in based on user input', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: { initialInputValue: 'Co', ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		await wrapper.find( '.cdx-text-input__input' ).trigger( 'focus' );
		const searchInput = wrapper.findComponent( CdxSearchInput );
		// This will set `pending` to true.
		await searchInput.vm.$emit( 'update:modelValue', 'a' );
		expect( wrapper.vm.expanded ).toStrictEqual( false );

		await wrapper.setProps( { searchResults } );
		expect( wrapper.vm.expanded ).toStrictEqual( true );
	} );

	it( 'Sets expanded to true when new results are empty', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: { initialInputValue: 'Co', ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		await wrapper.find( '.cdx-text-input__input' ).trigger( 'focus' );
		const searchInput = wrapper.findComponent( CdxSearchInput );
		// This will set `pending` to true.
		await searchInput.vm.$emit( 'update:modelValue', 'a' );
		expect( wrapper.vm.expanded ).toStrictEqual( false );

		await wrapper.setProps( { searchResults: [] } );
		expect( wrapper.vm.expanded ).toStrictEqual( true );
	} );

	it( 'calls SearchInput focus method', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		const searchInput = wrapper.findComponent( CdxSearchInput );
		searchInput.vm.focus = jest.fn();
		await wrapper.vm.focus();
		expect( searchInput.vm.focus ).toHaveBeenCalled();
	} );
} );

describe( 'TypeaheadSearch, when mounted', () => {
	it( 'emits a input event when there is an initialInputValue', () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: { initialInputValue: 'foo', ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );

		expect( wrapper.emitted( 'input' )?.[ 0 ] ).toEqual( [ 'foo' ] );
	} );
} );

describe( 'TypeaheadSearch, with search results', () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let wrapper: VueWrapper<any>;
	let input: DOMWrapper<Element>;
	let inputElement: HTMLInputElement;
	const oldLocation = window.location;
	const assignMock = jest.fn();

	beforeEach( async () => {
		jest.useFakeTimers( 'modern' );

		wrapper = mount( CdxTypeaheadSearch, {
			// Add in an initial input value so we don't have to simulate entering input.
			props: { initialInputValue: 'Co', searchFooterUrl, showThumbnail: true, ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );

		jest.advanceTimersByTime( DebounceInterval );
		await wrapper.setProps( { searchResults } );

		input = wrapper.find( '.cdx-text-input__input' );
		inputElement = input.element as HTMLInputElement;

		// eslint-disable-next-line
		delete (window as any).location;
		// eslint-disable-next-line
		(window as any).location = { assign: assignMock };
	} );

	afterEach( () => {
		jest.useRealTimers();
		window.location = oldLocation;
	} );

	it( 'matches the snapshot', () => {
		expect( wrapper.element ).toMatchSnapshot();
	} );

	it( 'responds when the user clicks a search result', async () => {
		await input.trigger( 'focus' );
		expect( wrapper.vm.expanded ).toStrictEqual( true );

		const searchResultComponent = wrapper.findComponent( CdxMenuItem );
		await searchResultComponent.trigger( 'click' );

		expect( wrapper.vm.expanded ).toBeFalsy();
		expect( inputElement.value ).toBe( searchResults[ 0 ].label );
		expect( wrapper.emitted( 'search-result-click' )?.[ 0 ] ).toEqual( [ {
			searchResult: searchResults[ 0 ],
			index: 0,
			numberOfResults: 2
		} ] );
	} );

	it( 'responds when the user clicks search footer', async () => {
		await input.trigger( 'focus' );
		expect( wrapper.vm.expanded ).toStrictEqual( true );

		const searchFooter = wrapper.find( '.cdx-typeahead-search__search-footer' );
		await searchFooter.trigger( 'click' );

		expect( wrapper.vm.expanded ).toBeFalsy();
		expect( inputElement.value ).toBe( 'Co' );
		expect( wrapper.emitted( 'search-result-click' )?.[ 0 ] ).toEqual( [ {
			searchResult: null,
			index: 2,
			numberOfResults: 2
		} ] );
	} );

	it( 'responds when form is submitted with no selection', async () => {
		await wrapper.find( 'form' ).trigger( 'submit' );

		expect( wrapper.emitted( 'submit' )?.[ 0 ] ).toEqual( [ {
			searchResult: null,
			index: -1,
			numberOfResults: 2
		} ] );
	} );

	it( 'responds when form is submitted with a selection', async () => {
		await input.trigger( 'focus' );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		await input.trigger( 'keydown', { key: 'Enter' } );
		await wrapper.find( 'form' ).trigger( 'submit' );

		expect( wrapper.emitted( 'submit' )?.[ 0 ] ).toEqual( [ {
			searchResult: searchResults[ 0 ],
			index: 0,
			numberOfResults: 2
		} ] );
	} );

	it( 'properly sets input value when navigating with arrow keys', async () => {
		await input.trigger( 'focus' );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.vm.inputValue ).toBe( 'Color' );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		expect( wrapper.vm.inputValue ).toBe( 'Co' );
	} );

	it( 'responds on enter keydown on search footer', async () => {
		await input.trigger( 'focus' );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		await input.trigger( 'keydown', { key: 'Enter' } );

		expect( assignMock ).toHaveBeenCalledTimes( 1 );
	} );

	it( 'clears selection when input value changes', async () => {
		await input.trigger( 'focus' );
		await input.trigger( 'keydown', { key: 'ArrowDown' } );
		await input.trigger( 'keydown', { key: 'Enter' } );
		expect( wrapper.vm.selection ).toBe( searchResults[ 0 ].value );

		await input.setValue( 'C' );
		jest.advanceTimersByTime( DebounceInterval );

		expect( wrapper.vm.selection ).toBe( null );
	} );

	it( 'closes menu when input is cleared', async () => {
		await input.trigger( 'focus' );
		expect( wrapper.vm.expanded ).toStrictEqual( true );
		await input.setValue( '' );
		jest.advanceTimersByTime( DebounceInterval );
		expect( wrapper.vm.expanded ).toBeFalsy();
	} );
} );

describe( 'TypeaheadSearch, with no results', () => {
	it( 'matches the snapshot', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			// Add in an initial input value so we don't have to simulate entering input.
			props: { initialInputValue: 'Co', searchFooterUrl, showThumbnail: true, ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot,
				'search-no-results-text': 'No results found'
			}
		} );
		await wrapper.setProps( { searchResults: [] } );

		expect( wrapper.element ).toMatchSnapshot();
	} );
} );

describe( 'TypeaheadSearch pending state behavior', () => {
	beforeEach( () => {
		jest.useFakeTimers( 'modern' );
	} );

	afterEach( () => {
		jest.useRealTimers();
	} );

	it( 'Shows pending and expands menu when slot is populated and input is focused', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot,
				'search-results-pending': 'Loading...'
			}
		} );

		await wrapper.find( '.cdx-text-input__input' ).trigger( 'focus' );
		const searchInput = wrapper.findComponent( CdxSearchInput );
		await searchInput.vm.$emit( 'update:modelValue', 'a' );

		jest.advanceTimersByTime( PendingDelay );

		expect( wrapper.vm.showPending ).toBe( true );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Shows pending but do not expand menu when slot is populated and input is not focused', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot,
				'search-results-pending': 'Loading...'
			}
		} );

		const searchInput = wrapper.findComponent( CdxSearchInput );
		await searchInput.vm.$emit( 'update:modelValue', 'a' );

		jest.advanceTimersByTime( PendingDelay );

		expect( wrapper.vm.showPending ).toBe( true );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Expands menu when showPending is true and input becomes focused', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot,
				'search-results-pending': 'Loading...'
			}
		} );

		const searchInput = wrapper.findComponent( CdxSearchInput );
		await searchInput.vm.$emit( 'update:modelValue', 'a' );

		jest.advanceTimersByTime( PendingDelay );

		expect( wrapper.vm.showPending ).toBe( true );
		expect( wrapper.vm.expanded ).toBe( false );

		await wrapper.find( '.cdx-text-input__input' ).trigger( 'focus' );
		expect( wrapper.vm.expanded ).toBe( true );
	} );

	it( 'Does nothing when slot is not populated', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		await wrapper.find( '.cdx-text-input__input' ).trigger( 'focus' );
		const searchInput = wrapper.findComponent( CdxSearchInput );
		await searchInput.vm.$emit( 'update:modelValue', 'a' );

		jest.advanceTimersByTime( PendingDelay );

		expect( wrapper.vm.showPending ).toBe( false );
		expect( wrapper.vm.expanded ).toBe( false );
	} );

	it( 'Never shows pending when search results come in faster than delay', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot,
				'search-results-pending': 'Loading...'
			}
		} );

		const searchInput = wrapper.findComponent( CdxSearchInput );
		await searchInput.vm.$emit( 'update:modelValue', 'a' );
		await wrapper.setProps( { searchResults } );

		expect( wrapper.vm.showPending ).toBe( false );

		jest.advanceTimersByTime( PendingDelay );

		expect( wrapper.vm.showPending ).toBe( false );
	} );
} );
