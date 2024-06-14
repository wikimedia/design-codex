<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
		placeholder="Enter one or more items"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipInputWithPlaceholder',
	components: {
		CdxChipInput
	},
	setup() {
		const exampleChips = ref( [] );

		return {
			exampleChips
		};
	}
} );
</script>
