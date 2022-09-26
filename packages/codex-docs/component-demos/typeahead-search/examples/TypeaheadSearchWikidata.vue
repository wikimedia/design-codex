<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-wikidata"
			form-action="https://www.wikidata.org/w/index.php"
			search-results-label="Search results"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:highlight-query="true"
			placeholder="Search Wikidata"
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
				Search Wikidata for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch, SearchResult, SearchResultClickEvent } from '@wikimedia/codex';
import { Result } from './types';
import { getMultiEventLogger } from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'TypeaheadSearchWikidata',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref<SearchResult[]>( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		const onEvent = getMultiEventLogger<string|SearchResultClickEvent>();

		async function fetchResults(
			searchTerm: string
		): Promise<{ search: Result[] }> {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				uselang: 'en',
				type: 'item',
				search: searchTerm
			} );
			const response = await fetch( `https://www.wikidata.org/w/api.php?${params.toString()}` );
			return response.json();
		}

		/**
		 * Format search results for consumption by TypeaheadSearch.
		 *
		 * @param pages
		 * @return
		 */
		function adaptApiResponse( pages: Result[] ): SearchResult[] {
			return pages.map( ( { id, label, url, match, description, display = {} } ) => ( {
				value: id,
				label,
				match: match.type === 'alias' ? `(${match.text})` : '',
				description,
				url,
				language: {
					label: display?.label?.language,
					match: match.type === 'alias' ? match.language : undefined,
					description: display?.description?.language
				}
			} ) );
		}

		async function onInput( value: string ) {
			onEvent( 'input', value );

			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Unset search results and the search footer URL if there is no value.
			if ( !value || value === '' ) {
				searchResults.value = [];
				searchFooterUrl.value = '';
				return;
			}

			try {
				const data = await fetchResults( value );

				// Make sure this data is still relevant first.
				if ( currentSearchTerm.value === value ) {
					// If there are results, format them into an array of
					// SearchResults to be passed into TypeaheadSearch for
					// display as a menu of search results.
					searchResults.value = data.search && data.search.length > 0 ?
						adaptApiResponse( data.search ) :
						[];

					// Set the search footer URL to a link to the search
					// page for the current search query.
					searchFooterUrl.value = `https://www.wikidata.org/w/index.php?search=${encodeURIComponent( value )}&title=Special%3ASearch&fulltext=1`;
				}
			} catch ( _e ) {
				// On error, reset search results and search footer URL.
				searchResults.value = [];
				searchFooterUrl.value = '';
			}

		}

		return {
			searchResults,
			searchFooterUrl,
			onInput,
			onEvent
		};
	}
} );
</script>
