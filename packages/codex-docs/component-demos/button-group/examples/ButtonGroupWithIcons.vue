<template>
	<cdx-button-group
		:buttons="buttons"
		@click="onClick"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButtonGroup } from '@wikimedia/codex';
import { cdxIconEdit, cdxIconSpeechBubble, cdxIconCheck, cdxIconDownload, cdxIconTrash } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonGroupWithIcons',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'edit', label: 'Edit', icon: cdxIconEdit },
			{ value: 'talk', label: 'Discuss', icon: cdxIconSpeechBubble },
			{ value: 'save', label: 'Done', icon: cdxIconCheck },
			{ value: 'download', label: 'Download', icon: cdxIconDownload },
			{ value: 'delete', label: 'Delete', icon: cdxIconTrash }
		];

		function onClick( value ) {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted with value:', value );
		}

		return {
			buttons,
			onClick
		};
	}
} );
</script>
