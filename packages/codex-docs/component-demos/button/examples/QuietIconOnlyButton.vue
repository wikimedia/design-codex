<template>
	<cdx-button type="quiet">
		<cdx-icon :icon="cdxIconHelp" icon-label="Help" />
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconHelp } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'QuietIconOnlyButton',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconHelp
		};
	}
} );
</script>
