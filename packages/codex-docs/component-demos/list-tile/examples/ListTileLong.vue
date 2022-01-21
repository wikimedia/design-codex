<template>
	<div>
		<cdx-list-tile
			:item="item"
			search-query="Donaudampfschiffahrtselektrizit"
			:highlight-query="true"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxListTile } from '@wikimedia/codex';

// See https://phabricator.wikimedia.org/T280982.
const item = {
	value: 2201357,
	label: 'Donaudampfschiffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft',
	url: 'https://en.wikipedia.org/wiki/Donaudampfschiffahrtselektrizit%C3%A4tenhauptbetriebswerkbauunterbeamtengesellschaft',
	description: 'Arguably the longest German word',
	thumbnail: null
};

export default defineComponent( {
	name: 'ListTileLong',
	components: { CdxListTile },
	setup() {
		return {
			item
		};
	}
} );
</script>
