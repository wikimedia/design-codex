<template>
	<cdx-search-input
		v-model="inputValue"
		aria-label="SearchInput configurable demo"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputConfigurable',
	components: { CdxSearchInput },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
