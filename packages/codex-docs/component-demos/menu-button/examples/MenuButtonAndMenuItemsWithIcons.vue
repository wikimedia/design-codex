<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Change input type"
	>
		<cdx-icon :icon="cdxIconEllipsis" />
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis, cdxIconFunction, cdxIconLiteral, cdxIconInstance } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Function call', value: 'function call', icon: cdxIconFunction },
	{ label: 'Literal String', value: 'literal string', icon: cdxIconLiteral },
	{ label: 'Reference', value: 'reference', icon: cdxIconInstance }
];

export default defineComponent( {
	name: 'MenuButtonAndMenuItemsWithIcons',
	components: { CdxMenuButton, CdxIcon },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems,
			cdxIconEllipsis
		};
	}
} );
</script>
