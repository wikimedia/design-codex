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
	{ label: 'Contact Owner', value: 'contact' },
	{ label: 'Delete Instrument', value: 'delete', action: 'destructive' },
	{ label: 'Edit Configuration', value: 'edit' },
	{ label: 'Turn Instrument Off', value: 'turn off' },
	{ label: 'View Phab Ticket', value: 'view' }
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
