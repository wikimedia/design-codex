<template>
	<cdx-multiselect-lookup
		id="cdx-demo-vegetables-basic"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="MultiselectLookup basic demo"
		@input="onInput"
		@update:selected="onUpdateSelected"
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
	name: 'MultiselectLookupBasic',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
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

		function onUpdateSelected() {
			// eslint-disable-next-line no-console
			console.log( 'Current selection:', selection.value.join( ', ' ) );
		}

		return {
			chips,
			selection,
			menuItems,
			menuConfig,
			onInput,
			onUpdateSelected
		};
	}
} );
</script>
