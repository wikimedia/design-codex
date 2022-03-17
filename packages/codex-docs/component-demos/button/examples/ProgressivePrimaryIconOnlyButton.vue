<template>
	<cdx-button action="progressive" type="primary">
		<cdx-icon :icon="cdxIconCheckAll" icon-label="Mark all as read" />
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconCheckAll } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ProgressivePrimaryIconOnlyButton',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconCheckAll
		};
	}
} );
</script>
