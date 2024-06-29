<template>
	<div>
		<cdx-typeahead-search
			id="typeahead-search-default"
			form-action="https://en.wikipedia.org/w/index.php"
			:use-button="true"
			:initial-input-value="initialInputValue"
			:search-results="searchResults"
			:search-footer-url="searchFooterUrl"
			:show-thumbnail="true"
			:highlight-query="true"
			placeholder="Search Wikipedia"
			@input="onInput"
		>
			<template #search-footer-text="{ searchQuery }">
				Search Wikipedia for pages containing
				<strong class="cdx-typeahead-search__search-footer__query">
					{{ searchQuery }}
				</strong>
			</template>
		</cdx-typeahead-search>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTypeaheadSearch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TypeaheadSearchInitialValue',
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
		const searchResults = ref( [] );
		const searchFooterUrl = ref( '' );
		const currentSearchTerm = ref( '' );

		function onInput( value ) {
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
			function adaptApiResponse( pages ) {
				return pages.map( ( { id, key, title, description, thumbnail } ) => ( {
					label: title,
					value: id,
					description: description,
					url: `https://en.wikipedia.org/wiki/${ encodeURIComponent( key ) }`,
					thumbnail: thumbnail ? {
						url: thumbnail.url,
						width: thumbnail.width,
						height: thumbnail.height
					} : undefined
				} ) );
			}

			fetch(
				`https://en.wikipedia.org/w/rest.php/v1/search/title?q=${ encodeURIComponent( value ) }&limit=10&`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					if ( currentSearchTerm.value === value ) {
						searchResults.value = data.pages && data.pages.length > 0 ?
							adaptApiResponse( data.pages ) :
							[];

						searchFooterUrl.value = `https://en.wikipedia.org/w/index.php?title=Special%3ASearch&fulltext=1&search=${ encodeURIComponent( value ) }`;

					}
				} ).catch( () => {
					searchResults.value = [];
					searchFooterUrl.value = '';
				} );
		}

		return {
			searchResults,
			searchFooterUrl,
			onInput
		};
	}
} );
</script>
