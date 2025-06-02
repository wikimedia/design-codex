import { DOMWrapper, mount, VueWrapper } from '@vue/test-utils';
import CdxTypeaheadSearch from './TypeaheadSearch.vue';
import CdxMenuItem from '../menu-item/MenuItem.vue';
import CdxSearchInput from '../search-input/SearchInput.vue';
import CdxMenu from '../menu/Menu.vue';
import { DebounceInterval, PendingDelay } from '../../constants';
import { SearchResult } from '../../types';

const propsData = {
	useButton: true,
	placeholder: 'Search Wikipedia',
	formAction: '/w/index.php',
	searchResults: [],
	id: 'foo'
};

const propsDataDeprecated = {
	buttonLabel: 'Search',
	placeholder: 'Search Wikipedia',
	formAction: '/w/index.php',
	searchResults: [],
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
			url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
		}
	}
];

const searchFooterUrl = 'https://foo.org/search?query=Co';

// Jest doesn't support the scrollIntoView method in jsdom, which is used by our Menu component.
// We stub it here to prevent errors.
beforeAll( () => {
	window.HTMLElement.prototype.scrollIntoView = jest.fn();
} );

describe( 'TypeaheadSearch', () => {
	describe( 'initial state', () => {
		type Case = [
			msg: string,
			props: {
				id: string;
				searchResults: SearchResult[],
				formAction: string;
				useButton?: boolean;
				buttonLabel?: string;
				placeholder?: string;
				autoExpandWidth?: boolean;
				showThumbnail?: boolean;
			}
		];

		const cases: Case[] = [
			[ 'Default', propsData ],
			[ 'With `autoExpandWidth` true and `showThumbnail` true', { ...propsData, autoExpandWidth: true, showThumbnail: true } ],
			[ 'With `autoExpandWidth` true and `showThumbnail` false', { ...propsData, autoExpandWidth: true, showThumbnail: false } ],
			[ 'With custom visible button label', { ...propsData, buttonLabel: 'Search Results' } ],
			[ 'With custom visible button label using the deprecated API', { ...propsDataDeprecated, autoExpandWidth: true, showThumbnail: true } ]
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

		describe( 'when the input is focused', () => {
			describe( 'and there is no input', () => {
				it( 'does not expand the menu', async () => {
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
			} );

			describe( 'and there is input', () => {
				it( 'expands the menu', async () => {
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
			} );
		} );

		describe( 'when the ArrowDown key is pressed', () => {
			describe( 'and the menu is closed', () => {
				it( 'does nothing', async () => {
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
			} );
		} );

		describe( 'when the Space key is pressed', () => {
			describe( 'and the menu is closed', () => {
				it( 'does not open the menu', async () => {
					const wrapper = mount( CdxTypeaheadSearch, {
						props: { initialInputValue: 'foo', ...propsData }
					} );
					wrapper.vm.searchQuery = 'foo';

					await wrapper.find( 'input' ).trigger( 'keydown', { key: ' ' } );
					expect( wrapper.vm.expanded ).toBeFalsy();
				} );
			} );

			describe( 'and the menu is open', () => {
				it( 'follows default behavior', async () => {
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
			} );
		} );

		describe( 'when the Tab key is pressed', () => {
			it( 'closes the menu', async () => {
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
		} );

		describe( 'when the user types input', () => {
			describe( 'and results are fetched', () => {
				it( 'sets expanded to true', async () => {
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
			} );

			describe( 'and no results are fetched', () => {
				it( 'sets expanded to true', async () => {
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
			} );
		} );

		describe( 'when the focus method is called', () => {
			it( 'calls the SearchInput focus method', async () => {
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
	} );

	describe( 'when mounted', () => {
		describe( 'and there is an initialInputValue', () => {
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
	} );

	describe( 'with search results', () => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let wrapper: VueWrapper<any>;
		let input: DOMWrapper<Element>;
		let inputElement: HTMLInputElement;
		const oldLocation = window.location;
		const assignMock = jest.fn();

		beforeEach( async () => {
			jest.useFakeTimers();

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
			assignMock.mockReset();
			window.location = oldLocation;
		} );

		it( 'matches the snapshot', () => {
			expect( wrapper.element ).toMatchSnapshot();
		} );

		describe( 'when the user clicks a search result', () => {
			it( 'closes the menu, updates the input, and emits a search-result-click event', async () => {
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
		} );

		describe( 'when the user clicks the search footer', () => {
			it( 'closes the menu, updates the input, and emits a search-result-click event', async () => {
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
		} );

		describe( 'when the form is submitted', () => {
			describe( 'and there is no selection', () => {
				it( 'emits a submit event', async () => {
					await wrapper.find( 'form' ).trigger( 'submit' );

					expect( wrapper.emitted( 'submit' )?.[ 0 ] ).toEqual( [ {
						searchResult: null,
						index: -1,
						numberOfResults: 2
					} ] );
				} );
			} );

			describe( 'and there is a selection', () => {
				it( 'emits a search-result-click event only', async () => {
					await input.trigger( 'focus' );
					await input.trigger( 'keydown', { key: 'ArrowDown' } );
					await input.trigger( 'keydown', { key: 'Enter' } );
					await wrapper.find( 'form' ).trigger( 'submit' );

					expect( wrapper.emitted( 'search-result-click' )?.[ 0 ] ).toEqual( [ {
						searchResult: searchResults[ 0 ],
						index: 0,
						numberOfResults: 2
					} ] );
					expect( wrapper.emitted( 'submit' ) ).toBeUndefined();
					expect( assignMock ).toHaveBeenCalledTimes( 1 );
					expect( assignMock ).toHaveBeenCalledWith( 'https://en.wikipedia.org/wiki/CO' );
				} );
			} );
		} );

		describe( 'when arrow keys are pressed', () => {
			it( 'changes the input value', async () => {
				await input.trigger( 'focus' );
				await input.trigger( 'keydown', { key: 'ArrowDown' } );
				await input.trigger( 'keydown', { key: 'ArrowDown' } );
				expect( wrapper.vm.inputValue ).toBe( 'Color' );
				await input.trigger( 'keydown', { key: 'ArrowDown' } );
				expect( wrapper.vm.inputValue ).toBe( 'Co' );
			} );
		} );

		describe( 'when Enter is pressed on the search footer', () => {
			it( 'goes to the search footer link location', async () => {
				await input.trigger( 'focus' );
				await input.trigger( 'keydown', { key: 'ArrowDown' } );
				await input.trigger( 'keydown', { key: 'ArrowDown' } );
				await input.trigger( 'keydown', { key: 'ArrowDown' } );
				await input.trigger( 'keydown', { key: 'Enter' } );

				expect( assignMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );

		describe( 'when the input value changes', () => {
			it( 'clears selection', async () => {
				await input.trigger( 'focus' );
				await input.trigger( 'keydown', { key: 'ArrowDown' } );
				await input.trigger( 'keydown', { key: 'Enter' } );
				expect( wrapper.vm.selection ).toBe( searchResults[ 0 ].value );

				await input.setValue( 'C' );
				jest.advanceTimersByTime( DebounceInterval );

				expect( wrapper.vm.selection ).toBe( null );
			} );
		} );

		describe( 'when the input is cleared', () => {
			it( 'closes menu', async () => {
				await input.trigger( 'focus' );
				expect( wrapper.vm.expanded ).toStrictEqual( true );
				await input.setValue( '' );
				jest.advanceTimersByTime( DebounceInterval );
				expect( wrapper.vm.expanded ).toBeFalsy();
			} );
		} );
	} );

	describe( 'with no results', () => {
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

	describe( 'pending state behavior', () => {
		beforeEach( () => {
			jest.useFakeTimers();
		} );

		afterEach( () => {
			jest.useRealTimers();
		} );

		describe( 'when the pending slot is populated', () => {
			describe( 'and the input is focused', () => {
				it( 'Shows pending and expands menu', async () => {
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
			} );

			describe( 'and the input is not focused', () => {
				it( 'Shows pending but do not expand menu', async () => {
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
			} );

			describe( 'and search results come in faster than delay', () => {
				it( 'does not shows pending', async () => {
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
		} );

		describe( 'when the pending slot is not populated', () => {
			it( 'does nothing', async () => {
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
		} );

		describe( 'when showPending is true', () => {
			describe( 'and the input is focused', () => {
				it( 'expands menu', async () => {
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
			} );
		} );
	} );

	describe( 'visbleItemLimit prop', () => {
		it( 'passes visbleItemLimit to the Menu component', () => {
			const wrapper = mount( CdxTypeaheadSearch, {
				props: {
					...propsData,
					visibleItemLimit: 3
				}
			} );

			const menuComponent = wrapper.getComponent( CdxMenu );
			expect( menuComponent.props( 'visibleItemLimit' ) ).toEqual( 3 );
		} );
	} );
} );
