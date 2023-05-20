<template>
	<cdx-button weight="quiet" @click="onClick">
		<cdx-icon :icon="cdxIconDownload" /> Download
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconDownload } from '@wikimedia/codex-icons';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'QuietButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		const onClick = getEventLogger<Event>( 'click' );

		return {
			cdxIconDownload,
			onClick
		};
	}
} );
</script>
