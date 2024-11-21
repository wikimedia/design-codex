<template>
	<cdx-multiselect-lookup
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="MultiselectLookup configurable demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-multiselect-lookup>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMultiselectLookup } from '@wikimedia/codex';
import vegetableItems from '../../lookup/examples/data.json';

export default defineComponent( {
	name: 'MultiselectLookupConfigurable',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
			} else {
				menuItems.value = [];
			}
		}

		return {
			chips,
			selection,
			menuItems,
			onInput
		};
	}
} );
</script>
