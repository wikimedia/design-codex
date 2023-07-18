<template>
	<cdx-filter-chip
		v-if="showChip"
		remove-button-label="Remove"
		:icon="cdxIconCamera"
		@remove-chip="removeChip"
	>
		Filter Chip Text
	</cdx-filter-chip>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxFilterChip } from '@wikimedia/codex';
import { cdxIconCamera } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'FilterChipWithIcon',
	components: { CdxFilterChip },
	setup() {
		const showChip = ref( true );

		const removeChip = () => {
			showChip.value = false;
		};

		return {
			removeChip,
			showChip,
			cdxIconCamera
		};
	}
} );
</script>
