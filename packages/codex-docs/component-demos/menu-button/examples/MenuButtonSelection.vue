<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		aria-label="Choose an option"
		@update:selected="onSelect"
	>
		<cdx-icon :icon="cdxIconEllipsis" />
	</cdx-menu-button>
	<cdx-message
		v-if="isMessageVisible"
		type="notice"
		:auto-dismiss="true"
		:display-time="3000"
		:fade-in="true"
	>
		{{ messageContent }}
	</cdx-message>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton, CdxMessage, CdxIcon } from '@wikimedia/codex';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';

const isMessageVisible = ref( false );
const messageContent = ref( '' );
const menuItems = [
	{ label: 'Edit Configuration', value: 'edit configuration' },
	{ label: 'View Phab Ticket', value: 'view phab ticket' },
	{ label: 'Contact Owner', value: 'contact owner' },
	{ label: 'Turn Instrument Off', value: 'turn instrument off' },
	{ label: 'Delete Instrument', value: 'delete instrument', action: 'destructive' }
];

export default defineComponent( {
	name: 'MenuButtonSelection',
	components: { CdxMenuButton, CdxMessage, CdxIcon },
	setup() {
		const selection = ref( null );

		function onSelect( newSelection ) {
			// Trigger a temporary message that shows the current selection.
			messageContent.value = `You chose ${ newSelection }.`;
			isMessageVisible.value = true;

			setTimeout( () => {
				// Auto-dismiss the message.
				isMessageVisible.value = false;
			}, 3000 );

			selection.value = null;
		}

		return {
			selection,
			menuItems,
			isMessageVisible,
			messageContent,
			onSelect,
			cdxIconEllipsis
		};
	}
} );
</script>
