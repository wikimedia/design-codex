<template>
	<div>
		<cdx-chip>
			This is really really really really really
			really really really really really really
			long text
		</cdx-chip>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxChip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipWithLongText',
	components: {
		CdxChip
	}
} );
</script>
