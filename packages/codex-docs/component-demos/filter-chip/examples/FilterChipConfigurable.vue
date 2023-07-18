<template>
	<cdx-filter-chip
		v-if="!hideChip"
		:remove-button-label="removeButtonLabel"
		:icon="icon"
		:disabled="disabled"
		@remove-chip="hideChip = true"
	>
		<slot />
	</cdx-filter-chip>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxFilterChip } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FilterChipConfigurable',
	components: { CdxFilterChip },
	props: {
		removeButtonLabel: {
			type: String,
			required: true
		},
		icon: {
			type: [ String, Object ],
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const hideChip = ref( false );

		return {
			hideChip
		};
	}
} );
</script>
