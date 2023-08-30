<template>
	<cdx-chip-input
		v-model:input-chips="exampleChips"
		remove-button-label="Remove"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxChipInput } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconArticle } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'ChipInputWithIcons',
	components: {
		CdxChipInput
	},
	setup() {
		const exampleChips = ref( [
			{ value: 'Camera', icon: cdxIconCamera },
			{ value: 'Article', icon: cdxIconArticle }
		] );

		return {
			exampleChips
		};
	}
} );
</script>
