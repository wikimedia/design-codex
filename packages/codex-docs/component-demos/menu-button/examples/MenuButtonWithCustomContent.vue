<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		toggle-button-label="Open and close the menu"
	>
		More options
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton } from '@wikimedia/codex';

const menuItems = [
	{ label: 'Edit', value: 'edit' },
	{ label: 'Delete', value: 'delete', action: 'destructive' },
	{ label: 'Download', value: 'download' },
	{ label: 'Print', value: 'print', disabled: true },
	{ label: 'Share', value: 'share' }
];

export default defineComponent( {
	name: 'MenuButtonWithCustomContent',
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
