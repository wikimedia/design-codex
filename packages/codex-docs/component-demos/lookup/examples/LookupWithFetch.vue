<template>
	<div>
		<cdx-lookup
			v-model="selection"
			:menu-items="menuItems"
			@new-input="onInput"
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
		const selection = ref( '' );
		const menuItems = ref<MenuItemData[]>( [] );
		const currentSearchTerm = ref( '' );

		// TODO: this should be debounced.
		function onInput( value: string ) {
			// Internally track the current search term.
			currentSearchTerm.value = value;

			// Do nothing if we have no input.
			if ( !value || value === '' ) {
				return;
			}

			fetch(
				`https://www.wikidata.org/w/api.php?origin=*&action=wbsearchentities&format=json&search=${encodeURIComponent( value )}&language=en&limit=10&props=url`
			).then( ( resp ) => resp.json() )
				.then( ( data: SearchData ) => {
					// Make sure this data is still relevant first.
					if ( currentSearchTerm.value === value ) {
						// Build an array of menu items.
						const results: MenuItemData[] = [];
						if ( data.search && data.search.length > 0 ) {
							data.search.forEach( ( result ) => {
								results.push( {
									label: result.label,
									value: result.id,
									description: result.description
								} );
							} );
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
			onInput
		};
	}
} );
</script>
