<template>
	<cdx-lookup
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Lookup configurable demo"
		:status="status"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupConfigurable',
	components: { CdxLookup },
	setup() {
		const selection = ref( null );
		const menuItems = ref( [] );
		const status = ref( 'default' );

		/**
		 * Filter items on input.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
			}
		}

		return {
			selection,
			menuItems,
			onInput,
			status
		};
	}
} );
</script>
