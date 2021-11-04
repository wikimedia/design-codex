<template>
	<div>
		<p>Input value: {{ inputValue }}</p>

		<CdxTextInput v-model="inputValue" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CdxTextInput from 'vue-components/src/components/text-input/TextInput.vue';

export default defineComponent( {
	name: 'TextInputDefault',
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
