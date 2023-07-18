<template>
	<cdx-filter-chip-input
		v-model:input-chips="exampleChips"
		:remove-button-label="removeButtonLabel"
		:status="status"
		:disabled="disabled"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxFilterChipInput } from '@wikimedia/codex';

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
			type: String,
			default: 'default'
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const exampleChips = ref( [
			{ value: 'chip 1' },
			{ value: 'chip 2' }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
