<template>
	<cdx-menu
		v-model:selected="selection"
		:expanded="true"
		:menu-items="searchResults"
		:show-thumbnail="true"
		:search-query="searchQuery"
		:highlight-query="true"
	/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxMenu } from '@wikimedia/codex';
import searchResults from './searchResults';

export default defineComponent( {
	name: 'MenuItems',
	components: { CdxMenu },
	setup() {
		const selection = ref( '' );
		return {
			selection,
			searchResults,
			searchQuery: 'Co'
		};
	}
} );
</script>
