<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		toggle-button-label="Open and close the menu"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconShare, cdxIconDownload, cdxIconTrash, cdxIconPrinter } from '@wikimedia/codex-icons';

const menuConfig = { visibleItemLimit: 4 };
const menuItems = [
	{ label: 'Edit', value: 'edit', icon: cdxIconEdit },
	{ label: 'Delete', value: 'delete', icon: cdxIconTrash, action: 'destructive' },
	{ label: 'Download', value: 'download', icon: cdxIconDownload },
	{ label: 'Print', value: 'print', icon: cdxIconPrinter, disabled: true },
	{ label: 'Share', value: 'share', icon: cdxIconShare }
];

export default defineComponent( {
	name: 'MenuButtonAndMenuItemsWithIconsAndScroll',
	components: { CdxMenuButton },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems,
			menuConfig
		};
	}
} );
</script>
