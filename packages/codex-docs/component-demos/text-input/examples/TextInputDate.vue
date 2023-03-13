<template>
	<div>
		<p>Input value: {{ inputValue }}</p>

		<cdx-text-input
			v-model="inputValue"
			aria-label="TextInput date demo"
			input-type="date"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputDate',
	components: { CdxTextInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref<string | number>( '' );

		return {
			inputValue
		};
	}
} );
</script>
