<template>
	<div>
		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			@input="onInput"
		>
			<template #no-results>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuItemData } from '@wikimedia/codex';
import { SearchData } from './types';

export default defineComponent( {
	name: 'LookupWithFetch',
	components: { CdxLookup },
	setup() {
		const selection = ref<string|null>( null );
		const menuItems = ref<MenuItemData[]>( [] );
		const currentSearchTerm = ref( '' );

		async function fetchResults( searchTerm: string ): Promise<SearchData> {
			const params = new URLSearchParams( {
				origin: '*',
				action: 'wbsearchentities',
				format: 'json',
				limit: '10',
				props: 'url',
				language: 'en',
				search: searchTerm
			} );
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
				const results: MenuItemData[] = data.search.map( ( result ) => {
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

		return {
			selection,
			menuItems,
			onInput
		};
	}
} );
</script>
