<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
	>
		<template #default>
			<slot />
		</template>
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton } from '@wikimedia/codex';

const menuItems = [
	{ label: 'Edit Configuration', value: 'edit' },
	{ label: 'View Phab Ticket', value: 'view' },
	{ label: 'Contact Owner', value: 'contact' },
	{ label: 'Turn Instrument Off', value: 'turn off' },
	{ label: 'Delete Instrument', value: 'delete', action: 'destructive' }
];

export default defineComponent( {
	name: 'MenuButtonConfigDemo',
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
