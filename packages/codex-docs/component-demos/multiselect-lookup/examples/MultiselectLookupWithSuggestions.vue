<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-suggestions"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup with suggestions demo"
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
	name: 'MultiselectLookupWithSuggestions',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		// Set up an array of initial menu items to show as suggestions.
		const initialMenuItems = [
			{
				label: 'Suggested items',
				items: vegetableItems.slice( 0, 3 )
			}
		];
		const menuItems = ref( initialMenuItems );
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
				// When the input is cleared, show the suggestions again.
				menuItems.value = initialMenuItems;
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
