<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="moon" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 'Q405',
	label: 'Σελήνη',
	match: '(moon)',
	description: 'ο μοναδικός φυσικός δορυφόρος της Γης',
	language: {
		label: 'el',
		match: 'en',
		description: 'el'
	},
	id: 'menu-item-multiple-langs'
};

export default defineComponent( {
	name: 'MenuItemMultipleLangs',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
