<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" :show-thumbnail="true" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	description: 'visual perception of light wavelengths',
	thumbnail: {
		url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/64_365_Color_Macro_%285498808099%29.jpg/200px-64_365_Color_Macro_%285498808099%29.jpg'
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
