<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
	>
		<cdx-icon :icon="cdxIconHelp" />
		Help
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
	name: 'MenuButtonWithIconAndText',
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
