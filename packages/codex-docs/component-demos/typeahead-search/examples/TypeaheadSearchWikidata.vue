<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-wikidata"
			form-action="https://www.wikidata.org/w/index.php"
			button-label="Search"
			search-results-label="Search results"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:highlight-query="true"
			:hide-thumbnail="true"
			placeholder="Search Wikidata"
			@new-input="onNewInput"
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

/* eslint-disable no-console */
export default defineComponent( {
	name: 'TypeaheadSearchWikidata',
	components: { CdxTypeaheadSearch },
	setup() {
		const searchResults = ref<SearchResult[]>( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function onNewInput( value: string ) {
			console.log( '"new-input" event emitted with value: ' + value );

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
			function adaptApiResponse( pages: Result[] ): SearchResult[] {
				return pages.map( ( { id, label, url, match, description } ) => ( {
					// If an alias matched the search query, show it next to the
					// item's label.
					label: match.type === 'alias' ? label + ` (${match.text})` : label,
					value: id,
					description,
					url
				} ) );
			}

			fetch(
				`https://www.wikidata.org/w/api.php?origin=*&action=wbsearchentities&format=json&search=${encodeURIComponent( value )}&language=en&uselang=en&type=item`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
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
				} ).catch( () => {
					// On error, reset search results and search footer URL.
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		function onSearchResultClick( event: SearchResultClickEvent ) {
			console.log( '"search-result-click" event emitted with value:' );
			console.log( event );
		}

		function onSubmit( event: SearchResultClickEvent ) {
			console.log( '"submit" event emitted with value:' );
			console.log( event );
		}

		return {
			searchResults,
			searchFooterUrl,
			onNewInput,
			onSearchResultClick,
			onSubmit
		};
	}
} );
/* eslint-enable no-console */
</script>
