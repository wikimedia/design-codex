<template>
	<div>
		<cdx-info-chip :icon="cdxIconCamera">
			Photos
		</cdx-info-chip>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxInfoChip } from '@wikimedia/codex';
import { cdxIconCamera } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ChipWithIcon',
	components: {
		CdxInfoChip
	},
	setup() {
		return {
			cdxIconCamera
		};
	}
} );
</script>
