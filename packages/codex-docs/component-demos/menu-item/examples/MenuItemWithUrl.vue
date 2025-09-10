<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	url: 'https://en.wikipedia.org/wiki/Color',
	urlNewTab: true,
	description: 'visual perception of light wavelengths',
	id: 'menu-item-with-url'
};

export default defineComponent( {
	name: 'MenuItemWithUrl',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
