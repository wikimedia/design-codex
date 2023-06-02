<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea default demo"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaDefault',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue
		};
	}
} );
</script>
