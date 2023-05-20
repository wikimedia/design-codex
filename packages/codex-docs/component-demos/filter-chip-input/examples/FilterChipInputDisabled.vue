<template>
	<cdx-filter-chip-input
		v-model:input-chips="exampleChips"
		remove-button-label="Remove"
		:disabled="true"
	/>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { CdxFilterChipInput, FilterChipInputItem } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FilterChipInputDisabled',
	components: {
		CdxFilterChipInput
	},
	setup() {
		const exampleChips: Ref<FilterChipInputItem[]> = ref( [
			{ value: 'chip 1' },
			{ value: 'chip 2' } ]
		);

		return {
			exampleChips
		};
	}
} );
</script>
