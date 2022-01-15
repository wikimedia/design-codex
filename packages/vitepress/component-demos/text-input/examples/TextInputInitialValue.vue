<template>
	<div>
		<p>Input value: {{ inputValue }}</p>

		<cdx-text-input v-model="inputValue" />

		<cdx-button @click="resetInput">
			Reset
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CdxButton from 'vue-components/src/components/button/Button.vue';
import CdxTextInput from 'vue-components/src/components/text-input/TextInput.vue';

export default defineComponent( {
	name: 'TextInputInitialValue',
	components: { CdxButton, CdxTextInput },
	setup() {
		// Set up a reactive reference to track the input value, and set it to
		// the initial value of the input.
		const initialValue = 'Initial value';
		const inputValue = ref<string | number>( initialValue );

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
