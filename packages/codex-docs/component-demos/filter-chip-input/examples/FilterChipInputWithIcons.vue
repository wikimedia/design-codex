<template>
	<cdx-filter-chip-input
		v-model:input-chips="exampleChips"
		remove-button-label="Remove"
	/>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { CdxFilterChipInput, FilterChipInputItem } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconArticle } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'FilterChipInputWithIcons',
	components: {
		CdxFilterChipInput
	},
	setup() {
		const exampleChips: Ref<FilterChipInputItem[]> = ref( [
			{ value: 'Camera', icon: cdxIconCamera },
			{ value: 'Article', icon: cdxIconArticle }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
