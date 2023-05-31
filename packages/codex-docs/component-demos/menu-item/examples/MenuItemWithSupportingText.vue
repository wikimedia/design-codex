<template>
	<cdx-menu-item
		v-bind="menuItem"
		search-query="corn"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMenuItem, MenuItemDataWithId } from '@wikimedia/codex';

const menuItem : MenuItemDataWithId = {
	value: 20656228,
	label: 'Maize',
	supportingText: '(redirected from Corn)',
	url: 'https://en.wikipedia.org/wiki/Maize',
	description: 'Genus of grass cultivated as a food crop',
	thumbnail: {
		width: 147,
		height: 200,
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg/147px-Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg'
	},
	id: 'menu-item-with-supporting-text'
};

export default defineComponent( {
	name: 'MenuItemWithSupportingText',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
