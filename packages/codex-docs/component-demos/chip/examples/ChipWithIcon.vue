<template>
	<div>
		<cdx-chip :icon="cdxIconCamera">
			Photos
		</cdx-chip>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxChip } from '@wikimedia/codex';
import { cdxIconCamera } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ChipWithIcon',
	components: {
		CdxChip
	},
	setup() {
		return {
			cdxIconCamera
		};
	}
} );
</script>
