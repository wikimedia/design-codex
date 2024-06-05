<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Instrument actions"
	>
		<template #default>
			<cdx-icon :icon="cdxIconEllipsis" />
		</template>
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Edit Configuration', value: 'edit' },
	{ label: 'View Phab Ticket', value: 'view' },
	{ label: 'Contact Owner', value: 'contact' },
	{ label: 'Turn Instrument Off', value: 'turn off' },
	{ label: 'Delete Instrument', value: 'delete', action: 'destructive' }
];

export default defineComponent( {
	name: 'MenuButtonBasic',
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
