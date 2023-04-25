<template>
	<cdx-button weight="quiet" aria-label="Help">
		<cdx-icon :icon="cdxIconHelp" @click="onClick" />
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconHelp } from '@wikimedia/codex-icons';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'QuietIconOnlyButton',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		const onClick = getEventLogger<Event>( 'click' );

		return {
			cdxIconHelp,
			onClick
		};
	}
} );
</script>
