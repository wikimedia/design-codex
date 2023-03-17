<template>
	<cdx-button weight="quiet">
		<cdx-icon :icon="cdxIconDownload" /> Download
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconDownload } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'QuietButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconDownload
		};
	}
} );
</script>
