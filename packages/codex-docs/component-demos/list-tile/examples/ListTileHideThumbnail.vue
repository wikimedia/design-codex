<template>
	<div>
		<cdx-list-tile
			:item="item"
			search-query="Co"
			:highlight-query="true"
			:hide-thumbnail="true"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxListTile } from '@wikimedia/codex';

const item = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths'
};

export default defineComponent( {
	name: 'ListTileHideThumbnail',
	components: { CdxListTile },
	setup() {
		return {
			item
		};
	}
} );
</script>
