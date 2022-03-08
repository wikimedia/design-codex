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
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupNoResults',
	components: { CdxLookup },
	setup() {
		const selection = ref( '' );
		const menuItems = ref<MenuItemData[]>( [] );
		const noResults = ref( false );

		function onInput( value: string ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
				noResults.value = menuItems.value.length === 0;
			} else {
				noResults.value = false;
			}
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
