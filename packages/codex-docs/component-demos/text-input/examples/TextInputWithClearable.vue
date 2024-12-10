<template>
	<cdx-text-input
		v-model="inputValue"
		:clearable="true"
		aria-label="Clearable TextInput demo"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputWithClearable',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
