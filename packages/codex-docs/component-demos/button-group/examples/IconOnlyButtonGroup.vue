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
	name: 'IconOnlyButtonGroup',
	components: {
		CdxButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 'edit', label: null, icon: cdxIconEdit, ariaLabel: 'Edit' },
			{ value: 'talk', label: null, icon: cdxIconSpeechBubble, ariaLabel: 'Discuss' },
			{ value: 'save', label: null, icon: cdxIconCheck, ariaLabel: 'Done' },
			{ value: 'download', label: null, icon: cdxIconDownload, ariaLabel: 'Download' },
			{ value: 'delete', label: null, icon: cdxIconTrash, ariaLabel: 'Delete' }
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
