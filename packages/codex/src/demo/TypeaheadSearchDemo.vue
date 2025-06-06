<template>
	<section id="cdx-typeahead-search">
		<h2>TypeaheadSearch</h2>
		<div>
			<cdx-typeahead-search
				id="typeahead-search-wikipedia"
				form-action="https://en.wikipedia.org/w/index.php"
				:use-button="true"
				:search-results="searchResults"
				:search-footer-url="searchFooterUrl"
				:show-thumbnail="true"
				:highlight-query="true"
				:auto-expand-width="true"
				placeholder="Search Wikipedia"
				@input="onInput"
				@search-result-click="onSearchResultClick"
				@submit="onSubmit"
			>
				<template #default>
					<input
						type="hidden"
						name="language"
						value="en"
					>
					<input
						type="hidden"
						name="title"
						value="Special:Search"
					>
				</template>
				<template #search-footer-text="{ searchQuery }">
					Search Wikipedia for pages containing
					<strong class="cdx-typeahead-search__search-footer__query">
						{{ searchQuery }}
					</strong>
				</template>
			</cdx-typeahead-search>
		</div>

		<h3>Mobile view version</h3>
		<div>
			<cdx-typeahead-search
				id="typeahead-search-wikipedia-mobile"
				form-action="https://en.wikipedia.org/w/index.php"
				:use-button="true"
				:search-results="searchResults"
				:search-footer-url="searchFooterUrl"
				:show-thumbnail="true"
				:highlight-query="true"
				:auto-expand-width="true"
				:is-mobile-view="true"
				placeholder="Search Wikipedia"
				@input="onInput"
				@search-result-click="onSearchResultClick"
				@submit="onSubmit"
			>
				<template #default>
					<input
						type="hidden"
						name="language"
						value="en"
					>
					<input
						type="hidden"
						name="title"
						value="Special:Search"
					>
				</template>
				<template #search-footer-text="{ searchQuery }">
					Search Wikipedia for pages containing
					<strong class="cdx-typeahead-search__search-footer__query">
						{{ searchQuery }}
					</strong>
				</template>
			</cdx-typeahead-search>
		</div>

		<h3>Show empty query results version</h3>
		<div>
			<cdx-typeahead-search
				id="typeahead-search-wikipedia-empty"
				form-action="https://en.wikipedia.org/w/index.php"
				:use-button="true"
				:search-results="emptySearchResults"
				:search-footer-url="searchFooterUrl"
				:show-thumbnail="true"
				:highlight-query="true"
				:auto-expand-width="false"
				:show-empty-query-results="true"
				placeholder="Search Wikipedia"
				@input="onInput"
				@search-result-click="onSearchResultClick"
				@submit="onSubmit"
			>
				<template #default>
					<input
						type="hidden"
						name="language"
						value="en"
					>
					<input
						type="hidden"
						name="title"
						value="Special:Search"
					>
				</template>
				<template #search-footer-text="{ searchQuery }">
					Search Wikipedia for pages containing
					<strong class="cdx-typeahead-search__search-footer__query">
						{{ searchQuery }}
					</strong>
				</template>
			</cdx-typeahead-search>
		</div>

		<h3>CSS-only version</h3>
		<div
			class="cdx-typeahead-search cdx-typeahead-search--show-thumbnail
				cdx-typeahead-search--auto-expand-width"
		>
			<div class="cdx-search-input cdx-search-input--has-end-button">
				<div class="cdx-search-input__input-wrapper">
					<div class="cdx-text-input cdx-text-input--has-start-icon">
						<input
							class="cdx-text-input__input"
							type="search"
							placeholder="Search Wikipedia"
						>
						<span class="cdx-text-input__icon cdx-text-input__start-icon" />
					</div>
				</div>
				<button class="cdx-button cdx-search-input__end-button">
					Search
				</button>
			</div>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxTypeaheadSearch, SearchResult, SearchResultClickEvent } from '../lib';

interface RestResult {
	id: number;
	key: string;
	title: string;
	description?: string;
	thumbnail?: {
		url: string;
		width?: number | null;
		height?: number | null;
	} | null;
}

const searchResults = ref<SearchResult[]>( [] );
const searchFooterUrl = ref( '' );
const currentSearchTerm = ref( '' );
const emptySearchResults = [ {
	description: 'Overview and topical guide to the free online crowdsourced encyclopedia',
	id: 33965883,
	key: 'Outline_of_Wikipedia',
	label: 'Outline of Wikipedia',
	thumbnail: {
		url: '//upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/60px-Wikipedia-logo-v2.svg.png',
		width: 60,
		height: 55
	},
	title: 'Outline of Wikipedia',
	url: 'http://localhost:8080/w/index.php?title=Special%3ASearch&search=Outline+of+Wikipedia&wprov=acrw1_0',
	value: 33965883
}, {
	description: '',
	id: 14072,
	key: 'History_of_Wikipedia',
	label: 'History of Wikipedia',
	thumbnail: {
		url: '//upload.wikimedia.org/wikipedia/commons/thumb/2/2…/60px-First_preserved_Main_Page_of_Wikipedia.jpeg',
		width: 60,
		height: 73
	},
	title: 'History of Wikipedia',
	url: 'http://localhost:8080/w/index.php?title=Special%3ASearch&search=History+of+Wikipedia&wprov=acrw1_1',
	value: 14072
}, {
	description: 'Electronic reference about the Earth',
	id: 4889994,
	key: 'Encyclopedia_of_Earth',
	label: 'Encyclopedia of Earth',
	thumbnail: {
		url: '//upload.wikimedia.org/wikipedia/commons/thumb/7/77/EoEarth.jpg/60px-EoEarth.jpg',
		width: 60,
		height: 66
	},
	title: 'Encyclopedia of Earth',
	url: 'http://localhost:8080/w/index.php?title=Special%3ASearch&search=Encyclopedia+of+Earth&wprov=acrw1_2',
	value: 4889994
} ];

function onInput( value: string ) {
	// eslint-disable-next-line no-console
	console.log( 'input event emitted with value:', value );

	// Internally track the current search term.
	currentSearchTerm.value = value;

	// Unset search results and the search footer URL if there is no value.
	if ( !value || value === '' ) {
		searchResults.value = [];
		searchFooterUrl.value = '';
		return;
	}

	/**
	 * Format search results for consumption by TypeaheadSearch.
	 *
	 * @param pages
	 * @return
	 */
	function adaptApiResponse( pages: RestResult[] ): SearchResult[] {
		return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
			label: title,
			value: id,
			description: description,
			url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
			thumbnail: thumbnail ? {
				url: thumbnail.url,
				width: thumbnail.width ?? undefined,
				height: thumbnail.height ?? undefined
			} : undefined
		} ) );
	}

	fetch(
		`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
	).then( ( resp ) => resp.json() )
		.then( ( data: { pages: RestResult[] } ) => {
			// Make sure this data is still relevant first.
			if ( currentSearchTerm.value === value ) {
				// If there are results, format them into an array of
				// SearchResults to be passed into TypeaheadSearch for
				// display as a menu of suggestions.
				searchResults.value = data.pages && data.pages.length > 0 ?
					adaptApiResponse( data.pages ) :
					[];

				// Set the search footer URL to a link to the search
				// page for the current search query.
				searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

			}
		} ).catch( () => {
			// On error, reset search results and search footer URL.
			searchResults.value = [];
			searchFooterUrl.value = '';
		} );
}

function onSearchResultClick( value: SearchResultClickEvent ) {
	// eslint-disable-next-line no-console
	console.log( 'search-result-click event emitted with value:', value );
}

function onSubmit( value: SearchResultClickEvent ) {
	// eslint-disable-next-line no-console
	console.log( 'submit event emitted with value:', value );
}
</script>
