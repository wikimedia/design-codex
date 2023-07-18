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

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenu } from '@wikimedia/codex';
import searchResults from './searchResultsGraphemes.json';

// This demo serves to demonstrate how the highlighting mechanism in the
// SearchResultTitle component handles languages with characters represented by
// more than one Unicode scalar values.
//
// See https://phabricator.wikimedia.org/T277256 and
// https://phabricator.wikimedia.org/T35242 for details.
export default defineComponent( {
	name: 'MenuItemsGraphemes',
	components: { CdxMenu },
	setup() {
		const selection = ref( '' );
		return {
			selection,
			searchResults,
			searchQuery: 'ইতাল'
		};
	}
} );
</script>
