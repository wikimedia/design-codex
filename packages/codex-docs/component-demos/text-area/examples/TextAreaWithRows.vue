<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with rows"
			rows="8"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaWithRows',
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
