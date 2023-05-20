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

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { CdxFilterChip } from '@wikimedia/codex';
import { Icon } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'FilterChipConfigurable',
	components: { CdxFilterChip },
	props: {
		removeButtonLabel: {
			type: String,
			required: true
		},
		icon: {
			type: [ String, Object ] as PropType<Icon>,
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
