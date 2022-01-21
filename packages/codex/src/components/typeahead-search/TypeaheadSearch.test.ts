import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import { CdxTypeaheadSearch, CdxListTile } from '../../lib';
import { DebounceInterval } from '../../constants';

const propsData = {
	buttonLabel: 'Search',
	placeholder: 'Search Wikipedia',
	formAction: '/w/index.php',
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

const searchResults = [
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
			mimetype: 'image/jpeg',
			width: 200,
			height: 150,
			url: '//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
		}
	}
];

const searchFooterUrl = 'https://foo.org/search?query=Co';

describe( 'TypeaheadSearch initial state', () => {
	it( 'matches the snapshot', () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: propsData,
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
		expect( wrapper.find( '.cdx-typeahead-search' ).classes() ).toContain( 'cdx-typeahead-search--active' );
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
		expect( wrapper.find( '.cdx-typeahead-search' ).classes() ).not.toContain( 'cdx-typeahead-search--active' );
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
		expect( wrapper.vm.state.highlighted.value ).toBe( null );
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

	it( 'Sets expanded to true if there are options and the input value does not match the selection', async () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: { initialInputValue: 'Co', ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );
		await wrapper.find( '.cdx-text-input__input' ).trigger( 'focus' );
		await wrapper.setProps( { searchResults } );
		expect( wrapper.vm.expanded ).toStrictEqual( true );
	} );
} );

describe( 'TypeaheadSearch, when mounted', () => {
	it( 'emits a new-input event when there is an initialInputValue', () => {
		const wrapper = mount( CdxTypeaheadSearch, {
			props: { initialInputValue: 'foo', ...propsData },
			slots: {
				default: defaultSlot,
				searchFooterText: searchFooterTextSlot
			}
		} );

		expect( wrapper.emitted( 'new-input' )?.[ 0 ] ).toEqual( [ 'foo' ] );
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
			props: { initialInputValue: 'Co', searchFooterUrl, ...propsData },
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

		const searchResultComponent = wrapper.findComponent( CdxListTile );
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
		expect( wrapper.vm.state.selected.value ).toBe(
			wrapper.vm.computedSearchResults[ 0 ]
		);

		await wrapper.get( 'input' ).setValue( 'C' );
		expect( wrapper.vm.state.selected.value ).toBe( null );
	} );

	it( 'closes menu when input is cleared', async () => {
		await input.trigger( 'focus' );
		expect( wrapper.vm.expanded ).toStrictEqual( true );
		await wrapper.get( 'input' ).setValue( '' );
		expect( wrapper.vm.expanded ).toBeFalsy();
	} );
} );
