<template>
	<cdx-button action="progressive">
		<cdx-icon :icon="cdxIconAdd" /> Add new
	</cdx-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxButton, CdxIcon } from '@wikimedia/codex';
import { cdxIconAdd } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ProgressiveButtonWithIcon',
	components: {
		CdxButton,
		CdxIcon
	},
	setup() {
		return {
			cdxIconAdd
		};
	}
} );
</script>
