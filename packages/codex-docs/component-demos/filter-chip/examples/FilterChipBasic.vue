<template>
	<cdx-filter-chip
		v-if="showChip"
		remove-button-label="Remove"
		@remove-chip="removeChip"
	>
		Filter Chip Text
	</cdx-filter-chip>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxFilterChip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FilterChipBasic',
	components: { CdxFilterChip },
	setup() {
		const showChip = ref( true );

		const removeChip = () => {
			showChip.value = false;
		};

		return {
			removeChip,
			showChip
		};
	}
} );
</script>
