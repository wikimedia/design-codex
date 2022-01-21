<template>
	<ol>
		<li v-for="result in searchResults" :key="result.value">
			<cdx-list-tile
				:item="result"
				:search-query="searchQuery"
				:highlight-query="true"
			/>
		</li>
	</ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxListTile } from '@wikimedia/codex';
import searchResults from './searchResults';

export default defineComponent( {
	name: 'ListTileList',
	components: { CdxListTile },
	setup() {
		return {
			searchResults,
			searchQuery: 'Co'
		};
	}
} );
</script>
