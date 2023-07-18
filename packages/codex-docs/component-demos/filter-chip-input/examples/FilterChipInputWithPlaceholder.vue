<template>
	<cdx-filter-chip-input
		v-model:input-chips="exampleChips"
		remove-button-label="Remove"
		placeholder="Enter one or more items"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxFilterChipInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'FilterChipInputWithPlaceholder',
	components: {
		CdxFilterChipInput
	},
	setup() {
		const exampleChips = ref( [] );

		return {
			exampleChips
		};
	}
} );
</script>
