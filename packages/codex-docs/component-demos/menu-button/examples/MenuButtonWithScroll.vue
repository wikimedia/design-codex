<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		aria-label="More actions"
	>
		<cdx-icon :icon="cdxIconEllipsis" />
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

const menuConfig = { visibleItemLimit: 5 };
const menuItems = [
	{ label: 'New file', value: 'new' },
	{ label: 'Open file', value: 'open' },
	{ label: 'Save file', value: 'save' },
	{ label: 'Edit', value: 'edit' },
	{ label: 'Cut', value: 'cut' },
	{ label: 'Copy', value: 'copy' },
	{ label: 'Paste', value: 'paste' },
	{ label: 'Download as PDF', value: 'download' },
	{ label: 'Printable version', value: 'print' },
	{ label: 'Share', value: 'share' }
];

export default defineComponent( {
	name: 'MenuButtonWithScroll',
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
