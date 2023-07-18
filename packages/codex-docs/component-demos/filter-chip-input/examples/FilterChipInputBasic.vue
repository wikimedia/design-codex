<template>
	<cdx-filter-chip-input
		v-model:input-chips="exampleChips"
		remove-button-label="Remove"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxFilterChipInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FilterChipInputBasic',
	components: {
		CdxFilterChipInput
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
