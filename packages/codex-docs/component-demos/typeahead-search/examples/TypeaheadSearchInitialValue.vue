<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-default"
			form-action="https://en.wikipedia.org/w/index.php"
			button-label="Search"
			search-results-label="Search results"
			:initial-input-value="initialInputValue"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:show-thumbnail="true"
			:highlight-query="true"
			placeholder="Search Wikipedia"
			@new-input="onNewInput"
		>
			<template #search-no-results-text>
				No pages found with this title
			</template>
			<template #search-footer-text="{ searchQuery }">
				Search Wikipedia for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch, SearchResult } from '@wikimedia/codex';
import { RestResult } from './types';

export default defineComponent( {
	name: 'TypeaheadSearchWikipedia',
	components: { CdxTypeaheadSearch },
	props: {
		/**
		 * For demo purposes, the initial input value "Color" has been passed in
		 * as a prop.
		 */
		initialInputValue: {
			type: String,
			default: ''
		}
	},
	setup() {
		const searchResults = ref<SearchResult[]>( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function onNewInput( value: string ) {
			currentSearchTerm.value = value;

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
					if ( currentSearchTerm.value === value ) {
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${encodeURIComponent( value )}`;

					}
				} ).catch( () => {
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onNewInput
		};
	}
} );
</script>
