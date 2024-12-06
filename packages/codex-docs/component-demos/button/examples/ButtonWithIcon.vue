<template>
	<cdx-button @click="onClick">
		<cdx-icon :icon="cdxIconDownload" /> Download
	</cdx-button>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconDownload } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		function onClick() {
			// eslint-disable-next-line no-console
			console.log( 'click event emitted' );
		}

		return {
			cdxIconDownload,
			onClick
		};
	}
} );
</script>
