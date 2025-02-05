<template>
	<cdx-multiselect-lookup
		id="cdx-demo-namespaces-keep-input"
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		:keep-input-on-selection="true"
		aria-label="MultiselectLookup with keep input"
		placeholder="Select namespaces"
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
import namespaces from '../../multiselect-lookup/examples/namespaces.json';

export default defineComponent( {
	name: 'MultiselectLookupWithKeepInput',
	components: {
		CdxMultiselectLookup
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		const menuConfig = {
			visibleItemLimit: 6
		};

		/**
		 * On input, filter the menu items.
		 *
		 * @param {string} value
		 */
		function onInput( value ) {
			if ( value ) {
				const searchValue = value.toLowerCase();
				menuItems.value = namespaces.filter( ( item ) => item.label
					.toLowerCase().includes( searchValue ) );
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
