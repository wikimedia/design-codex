<template>
	<div>
		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup with fetched results demo"
			@input="onInput"
			@load-more="onLoadMore"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuConfig, MenuItemData } from '@wikimedia/codex';
import { SearchData } from './types';

export default defineComponent( {
	name: 'LookupWithFetch',
	components: { CdxLookup },
	setup() {
		const selection = ref<string|null>( null );
		const menuItems = ref<MenuItemData[]>( [] );
		const currentSearchTerm = ref( '' );

		async function fetchResults( searchTerm: string, offset?: number ): Promise<SearchData> {
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
				params.set( 'continue', `${offset}` );
			}
			const response = await fetch( `https://www.wikidata.org/w/api.php?${params.toString()}` );
			return response.json();
		}

		// TODO: this should be debounced.
		async function onInput( value: string ) {
			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Do nothing if we have no input.
			if ( !value || value === '' ) {
				menuItems.value = [];
				return;
			}

			try {
				const data = await fetchResults( value );

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
				const results = data.search.map( ( result ): MenuItemData => {
					return {
						label: result.label,
						value: result.id,
						description: result.description
					};
				} );

				// Update menuItems.
				menuItems.value = results;
			} catch ( e ) {
				// On error, set results to empty.
				menuItems.value = [];
			}
		}

		function deduplicateResults( results: MenuItemData[] ): MenuItemData[] {
			const seen = new Set( menuItems.value.map( ( result ) => result.value ) );
			return results.filter( ( result ) => !seen.has( result.value ) );
		}

		async function onLoadMore() {
			if ( !currentSearchTerm.value ) {
				return;
			}

			const data = await fetchResults( currentSearchTerm.value, menuItems.value.length );

			if ( !data.search || data.search.length === 0 ) {
				return;
			}

			const results = data.search.map( ( result ): MenuItemData => {
				return {
					label: result.label,
					value: result.id,
					description: result.description
				};
			} );
			// Update menuItems.
			const deduplicatedResults = deduplicateResults( results );
			menuItems.value.push( ...deduplicatedResults );
		}

		const menuConfig: MenuConfig = {
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
