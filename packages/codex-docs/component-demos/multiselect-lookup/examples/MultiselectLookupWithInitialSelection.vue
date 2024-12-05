<template>
	<cdx-multiselect-lookup
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup with initial selection demo"
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
	name: 'MultiselectLookupWithInitialSelection',
	components: { CdxMultiselectLookup },
	setup() {
		const chips = ref( [
			{ label: 'carrot', value: 'Q81' },
			{ label: 'eggplant', value: 'Q7540' }
		] );
		const selection = ref( [ 'Q81', 'Q7540' ] );
		const menuItems = ref( [] );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
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
			menuConfig,
			onInput
		};
	}
} );
</script>
