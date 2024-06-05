<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="Actions"
	>
		<template #default>
			<cdx-icon :icon="cdxIconEllipsis" />
		</template>
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis, cdxIconEdit, cdxIconShare, cdxIconDownload, cdxIconTrash, cdxIconPrinter } from '@wikimedia/codex-icons';

const menuConfig = { visibleItemLimit: 3 };
const menuItems = [
	{ label: 'Edit', value: 'edit', icon: cdxIconEdit },
	{ label: 'Download', value: 'download', icon: cdxIconDownload },
	{ label: 'Print', value: 'print', icon: cdxIconPrinter, disabled: true },
	{ label: 'Share', value: 'share', icon: cdxIconShare },
	{ label: 'Delete', value: 'delete', icon: cdxIconTrash, action: 'destructive' }
];

export default defineComponent( {
	name: 'MenuButtonAndMenuItemsWithIconsAndScroll',
	components: { CdxMenuButton, CdxIcon },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems,
			menuConfig,
			cdxIconEllipsis
		};
	}
} );
</script>
