<template>
	<cdx-field>
		<cdx-chip-input
			v-model:input-chips="exampleChips"
			remove-button-label="remove"
		/>
		<template #label>
			Aliases
		</template>
		<template #description>
			Alternative names help others easily find the function
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxChipInput, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ChipInputField',
	components: { CdxChipInput, CdxField },
	setup() {
		const exampleChips = ref( [] );

		return {
			exampleChips
		};
	}
} );
</script>
