<template>
	<cdx-button>
		<cdx-icon :icon="cdxIconPrevious" icon-label="Back" />
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconPrevious } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'IconOnlyButton',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconPrevious
		};
	}
} );
</script>
