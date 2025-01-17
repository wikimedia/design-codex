<template>
	<div class="cdx-demo-group-buttons">
		<!-- <cdx-button aria-label="More" @click="onClick">
			<cdx-icon :icon="cdxIconEllipsis" />
		</cdx-button> -->
		<cdx-menu-button
			v-model:selected="selection"
			:menu-items="menuItems"
			aria-label="More options"
		>
			<cdx-icon :icon="cdxIconEllipsis" />
		</cdx-menu-button>
		<cdx-button>
			<cdx-icon :icon="cdxIconDownload" /> Download
		</cdx-button>
		<cdx-button action="progressive" weight="primary">
			<cdx-icon :icon="cdxIconAdd" /> New item
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxIcon, CdxMenuButton } from '@wikimedia/codex';
import { cdxIconAdd, cdxIconCheck, cdxIconDownload, cdxIconEdit, cdxIconEllipsis, cdxIconSpeechBubble } from '@wikimedia/codex-icons';

const menuItems = [
	{ label: 'Edit', value: 'edit', icon: cdxIconEdit },
	{ label: 'Discuss', value: 'discuss', icon: cdxIconSpeechBubble },
	{ label: 'Done', value: 'done', icon: cdxIconCheck }
];

export default defineComponent( {
	name: 'GroupOfButtons',
	components: {
		CdxButton,
		CdxIcon,
		CdxMenuButton
	},
	setup() {
		const selection = ref( null );
		return {
			cdxIconAdd,
			cdxIconDownload,
			selection,
			menuItems,
			cdxIconEllipsis
		};
	}
} );
</script>
