<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
		:status="status"
		:disabled="disabled"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipInputConfigurable',
	components: {
		CdxChipInput
	},
	props: {
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
