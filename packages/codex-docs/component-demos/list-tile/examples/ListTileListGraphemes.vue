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
import searchResults from './searchResultsGraphemes';

// This demo serves to demonstrate how the highlighting mechanism in the ListTileLabel component
// handles languages with characters represented by more than one Unicode scalar values.
//
// See https://phabricator.wikimedia.org/T277256 and https://phabricator.wikimedia.org/T35242 for
// details.
export default defineComponent( {
	name: 'ListTileListGraphemes',
	components: { CdxListTile },
	setup() {
		return {
			searchResults,
			searchQuery: 'ইতাল'
		};
	}
} );
</script>
