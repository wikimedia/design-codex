<template>
	<ul role="listbox">
		<cdx-menu-item
			v-bind="menuItem"
			search-query="Co"
			:highlight-query="true"
		/>
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
	id: 'menu-item-highlight-query'
};

export default defineComponent( {
	name: 'MenuItemHighlightQuery',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
