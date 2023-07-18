<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="Disabled TextArea"
			disabled
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaWithDisabled',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( 'The text area is disabled.' );

		return {
			textareaValue
		};
	}
} );
</script>
