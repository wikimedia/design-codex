<template>
	<cdx-filter-chip-input
		v-model:input-chips="exampleChips"
		:remove-button-label="removeButtonLabel"
		:status="status"
		:disabled="disabled"
	/>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';
import { CdxFilterChipInput, ValidationStatusType, FilterChipInputItem } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FilterChipInputConfigurable',
	components: {
		CdxFilterChipInput
	},
	props: {
		removeButtonLabel: {
			type: String,
			required: true
		},
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const exampleChips: Ref<FilterChipInputItem[]> = ref( [
			{ value: 'chip 1' },
			{ value: 'chip 2' }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
