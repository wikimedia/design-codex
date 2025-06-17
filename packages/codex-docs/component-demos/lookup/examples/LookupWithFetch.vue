<template>
	<div>
		<cdx-lookup
			v-model:selected="selection"
			v-model:input-value="inputValue"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup with fetched results demo"
			@update:input-value="onUpdateInputValue"
			@load-more="onLoadMore"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LookupWithFetch',
	components: { CdxLookup },
	setup() {
		// Selected item, defaulting to null.
		const selection = ref( null );
		// Current input value. This is helpful to track so we can fetch results for the current
		// search term, and is bound to the Lookup via v-model.
		// Note that, on selection, the input updates to match the selected item.
		const inputValue = ref( '' );
		// Menu items to show. On input, results will be fetched and provided as menu items. When
		// the input is cleared, the menu items will be reset to an empty array.
		// On selection, since the input updates to match the selected item, the
		// `onUpdateInputValue` method runs and fetches new results based on the selected item.
		const menuItems = ref( [] );
		// Limit the height of the menu and enable scrolling.
		const menuConfig = {
			visibleItemLimit: 6
		};

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
			return fetch( `https://www.wikidata.org/w/api.php?${ params.toString() }` )
				.then( ( response ) => response.json() );
		}

		/**
		 * Handle lookup input.
		 *
		 * TODO: this should be debounced.
		 *
		 * @param {string} value
		 */
		function onUpdateInputValue( value ) {
			// Clear menu items if there is no input.
			if ( !value ) {
				menuItems.value = [];
				return;
			}

			fetchResults( value )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( inputValue.value !== value ) {
						return;
					}

					// Reset the menu items if there are no results.
					if ( !data.search || data.search.length === 0 ) {
						menuItems.value = [];
						return;
					}

					// Build an array of menu items.
					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

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
			if ( !inputValue.value ) {
				return;
			}

			fetchResults( inputValue.value, menuItems.value.length )
				.then( ( data ) => {
					if ( !data.search || data.search.length === 0 ) {
						return;
					}

					const results = data.search.map( ( result ) => ( {
						label: result.label,
						value: result.id,
						description: result.description
					} ) );

					// Update menuItems.
					const deduplicatedResults = deduplicateResults( results );
					menuItems.value.push( ...deduplicatedResults );
				} );
		}

		return {
			selection,
			inputValue,
			menuItems,
			menuConfig,
			onUpdateInputValue,
			onLoadMore
		};
	}
} );
</script>
