<template>
	<cdx-button>
		<cdx-icon :icon="cdxIconArrowPrevious" /> Go back
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconArrowPrevious } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconArrowPrevious
		};
	}
} );
</script>
