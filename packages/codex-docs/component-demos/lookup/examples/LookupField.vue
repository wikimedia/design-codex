<template>
	<cdx-field>
		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			@input="onInput"
			@load-more="onLoadMore"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup>
		<template #label>
			Item lookup
		</template>
		<template #description>
			Search Wikidata items
		</template>
		<template #help-text>
			Start typing the name of a Wikidata item to see suggestions
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LookupField',
	components: { CdxLookup, CdxField },
	setup() {
		const selection = ref( null );
		const menuItems = ref( [] );
		const currentSearchTerm = ref( '' );

		/**
		 * Get search results.
		 *
		 * @param {string} searchTerm
		 * @param {number} offset Optional result offset
		 *
		 * @return {Promise}
		 */
		function fetchResults( searchTerm, offset ) {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				search: searchTerm
			} );
			if ( offset ) {
				params.set( 'continue', String( offset ) );
			}
			return fetch( `https://www.wikidata.org/w/api.php?${params.toString()}` )
				.then( ( response ) => response.json() );
		}

		/**
		 * Handle lookup input.
		 *
		 * TODO: this should be debounced.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Do nothing if we have no input.
			if ( !value ) {
				menuItems.value = [];
				return;
			}

			fetchResults( value )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value !== value ) {
						return;
					}

					// Reset the menu items if there are no results.
					if ( !data.search || data.search.length === 0 ) {
						menuItems.value = [];
						return;
					}

					// Build an array of menu items.
					const results = data.search.map( ( result ) => {
						return {
							label: result.label,
							value: result.id,
							description: result.description
						};
					} );

					// Update menuItems.
					menuItems.value = results;
				} )
				.catch( () => {
					// On error, set results to empty.
					menuItems.value = [];
				} );
		}

		function deduplicateResults( results ) {
			const seen = new Set( menuItems.value.map( ( result ) => result.value ) );
			return results.filter( ( result ) => !seen.has( result.value ) );
		}

		function onLoadMore() {
			if ( !currentSearchTerm.value ) {
				return;
			}

			fetchResults( currentSearchTerm.value, menuItems.value.length )
				.then( ( data ) => {
					if ( !data.search || data.search.length === 0 ) {
						return;
					}

					const results = data.search.map( ( result ) => {
						return {
							label: result.label,
							value: result.id,
							description: result.description
						};
					} );

					// Update menuItems.
					const deduplicatedResults = deduplicateResults( results );
					menuItems.value.push( ...deduplicatedResults );
				} );
		}

		const menuConfig = {
			visibleItemLimit: 6
		};

		return {
			selection,
			menuItems,
			menuConfig,
			onInput,
			onLoadMore
		};
	}
} );
</script>
