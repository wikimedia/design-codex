<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Help options"
	>
		<cdx-icon :icon="cdxIconHelp" />
	</cdx-menu-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconHelp } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Keyboard shortcuts', value: 'keyboard' },
	{ label: 'Leave feedback', value: 'feedback' },
	{ label: 'Read the user guide', value: 'read' }
];

export default defineComponent( {
	name: 'MenuButtonWithIconOnly',
	components: { CdxMenuButton, CdxIcon },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems,
			cdxIconHelp
		};
	}
} );
</script>
