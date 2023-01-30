<template>
	<div>
		<cdx-info-chip>
			This is really really really really really
			really really really really really really
			long text
		</cdx-info-chip>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxInfoChip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipWithLongText',
	components: {
		CdxInfoChip
	}
} );
</script>
