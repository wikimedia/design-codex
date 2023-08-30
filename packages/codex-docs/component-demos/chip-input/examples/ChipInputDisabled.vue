<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
		remove-button-label="Remove"
		:disabled="true"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipInputDisabled',
	components: {
		CdxChipInput
	},
	setup() {
		const exampleChips = ref( [
			{ value: 'chip 1' },
			{ value: 'chip 2' } ]
		);

		return {
			exampleChips
		};
	}
} );
</script>
