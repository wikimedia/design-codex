<template>
	<cdx-menu-item
		v-bind="menuItem"
		:show-thumbnail="true"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	thumbnail: {
		mimetype: 'image/jpeg',
		size: null,
		width: 200,
		height: 150,
		duration: null,
		url: '//upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
	},
	id: 'menu-item-with-thumbnail'
};

export default defineComponent( {
	name: 'MenuItemWithThumbnail',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
