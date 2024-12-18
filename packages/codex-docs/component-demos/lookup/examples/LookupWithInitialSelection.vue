<template>
	<cdx-lookup
		v-model:selected="selection"
		v-model:input-value="inputValue"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Lookup demo with initial selection"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-lookup>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxLookup } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'LookupWithInitialSelection',
	components: { CdxLookup },
	setup() {
		const selection = ref( 'Q81' );
		const inputValue = ref( 'carrot' );
		const menuItems = computed( () => vegetableItems.filter(
			( item ) => item.label.includes( inputValue.value )
		) );

		const menuConfig = {
			boldLabel: true
		};

		return {
			selection,
			inputValue,
			menuItems,
			menuConfig
		};
	}
} );
</script>
