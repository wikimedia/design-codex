<template>
	<cdx-lookup-multiselect
		v-model:input-chips="chips"
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="LookupMultiselect configurable demo"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup-multiselect>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxLookupMultiselect } from '@wikimedia/codex';
import vegetableItems from '../../lookup/examples/data.json';

export default defineComponent( {
	name: 'LookupMultiselectConfigurable',
	components: {
		CdxLookupMultiselect
	},
	setup() {
		const chips = ref( [] );
		const selection = ref( [] );
		const menuItems = ref( [] );

		function onInput( value ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
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
