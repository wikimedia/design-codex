<template>
	<div>
		<cdx-lookup
			v-model="selection"
			:menu-items="menuItems"
			@new-input="onInput"
		>
			<template v-if="noResults" #footer>
				No results found.
			</template>
		</cdx-lookup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuItemData } from '@wikimedia/codex';
import { Result } from './types';

export default defineComponent( {
	name: 'LookupWithFetch',
	components: { CdxLookup },
	setup() {
		const selection = ref( '' );
		const menuItems = ref<MenuItemData[]>( [] );
		const noResults = ref( false );
		const currentSearchTerm = ref( '' );

		// TODO: this should be debounced.
		function onInput( value: string ) {
			// Reset noResults.
			noResults.value = false;

			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Do nothing if we have no input.
			if ( !value || value === '' ) {
				return;
			}

			fetch(
				`https://www.wikidata.org/w/api.php?origin=*&action=wbsearchentities&format=json&search=${encodeURIComponent( value )}&language=en&limit=10&props=url`
			).then( ( resp ) => resp.json() )
				.then( ( data ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// Build an array of menu items.
						const results: MenuItemData[] = [];
						if ( data.search && data.search.length > 0 ) {
							data.search.forEach( ( result: Result ) => {
								results.push( {
									label: result.label,
									value: result.id,
									description: result.description
								} );
							} );
						}

						// If there are no results, set noResults to true so we
						// can show the "No results found" message via the
						// Lookup component's footer slot.
						if ( results.length === 0 ) {
							noResults.value = true;
						}

						// Update menuItems.
						menuItems.value = results;
					}
				} ).catch( () => {
					// On error, set results to empty.
					menuItems.value = [];
				} );
		}

		return {
			selection,
			menuItems,
			noResults,
			onInput
		};
	}
} );
</script>
