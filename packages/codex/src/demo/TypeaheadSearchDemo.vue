<template>
	<section id="cdx-typeahead-search">
		<h2>TypeaheadSearch</h2>
		<div>
			<cdx-typeahead-search
				id="typeahead-search-wikipedia"
				form-action="https://en.wikipedia.org/w/index.php"
				button-label="Search"
				search-results-label="Search results"
				:search-results="searchResults"
				:search-footer-url="searchFooterUrl"
				:show-thumbnail="true"
				:highlight-query="true"
				:auto-expand-width="true"
				placeholder="Search Wikipedia"
				@input="onInput"
				@search-result-click="onEvent( 'search-result-click', $event )"
				@submit="onEvent( 'submit', $event )"
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
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxTypeaheadSearch, SearchResult, SearchResultClickEvent } from '../lib';
import { RestResult } from 'codex-docs/component-demos/typeahead-search/examples/types';
import { getMultiEventLogger } from 'codex-docs/src/utils/getEventLogger';

const searchResults = ref<SearchResult[]>( [] );
const searchFooterUrl = ref( '' );
const currentSearchTerm = ref( '' );
const onEvent = getMultiEventLogger<string|SearchResultClickEvent>();

function onInput( value: string ) {
	onEvent( 'input', value );

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
			url: `https://en.wikipedia.org/wiki/${encodeURIComponent( key )}`,
			thumbnail: thumbnail ? {
				url: thumbnail.url,
				width: thumbnail.width ?? undefined,
				height: thumbnail.height ?? undefined
			} : undefined
		} ) );
	}

	fetch(
		`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent( value )}&limit=10&`
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
				searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${encodeURIComponent( value )}`;

			}
		} ).catch( () => {
			// On error, reset search results and search footer URL.
			searchResults.value = [];
			searchFooterUrl.value = '';
		} );
}
</script>
