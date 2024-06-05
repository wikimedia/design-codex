<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
	>
		More options
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton } from '@wikimedia/codex';

const menuItems = [
	{ label: 'Edit', value: 'edit' },
	{ label: 'Download', value: 'download' },
	{ label: 'Print', value: 'print', disabled: true },
	{ label: 'Share', value: 'share' },
	{ label: 'Delete', value: 'delete', action: 'destructive' }
];

export default defineComponent( {
	name: 'MenuButtonBasic',
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
