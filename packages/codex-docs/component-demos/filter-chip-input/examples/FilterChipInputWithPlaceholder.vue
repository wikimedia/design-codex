<template>
	<cdx-filter-chip-input
		v-model:input-chips="exampleChips"
		remove-button-label="Remove"
		placeholder="Enter one or more items"
	/>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { CdxFilterChipInput, FilterChipInputItem } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FilterChipInputWithPlaceholder',
	components: {
		CdxFilterChipInput
	},
	setup() {
		const exampleChips: Ref<FilterChipInputItem[]> = ref( [] );

		return {
			exampleChips
		};
	}
} );
</script>
