<template>
	<div>
		<cdx-text-input v-model="inputValue" aria-label="TextInput with initial value demo" />
		<br>
		<cdx-button @click="resetInput">
			Reset
		</cdx-button>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputInitialValue',
	components: { CdxButton, CdxTextInput },
	setup() {
		// Set up a reactive reference to track the input value, and set it to
		// the initial value of the input.
		const initialValue = 'Initial value';
		const inputValue = ref( initialValue );

		const resetInput = () => {
			inputValue.value = initialValue;
		};

		return {
			inputValue,
			resetInput
		};
	}
} );
</script>
