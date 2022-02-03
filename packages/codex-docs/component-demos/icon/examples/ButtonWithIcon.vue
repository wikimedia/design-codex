<template>
	<cdx-button action="progressive" type="primary">
		<cdx-icon :icon="cdxIconArrowNext" /> Continue
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconArrowNext } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconArrowNext
		};
	}
} );
</script>
