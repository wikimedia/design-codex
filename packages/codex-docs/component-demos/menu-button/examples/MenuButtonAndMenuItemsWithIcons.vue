<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		toggle-button-label="Open and close the menu"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton } from '@wikimedia/codex';
import { cdxIconFunction, cdxIconLiteral, cdxIconInstance } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Function call', value: 'function call', icon: cdxIconFunction },
	{ label: 'Literal String', value: 'literal string', icon: cdxIconLiteral },
	{ label: 'Reference', value: 'reference', icon: cdxIconInstance }
];

export default defineComponent( {
	name: 'MenuButtonAndMenuItemsWithIcons',
	components: { CdxMenuButton },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems
		};
	}
} );
</script>
