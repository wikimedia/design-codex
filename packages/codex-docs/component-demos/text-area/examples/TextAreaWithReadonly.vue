<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="Readonly TextArea"
			readonly
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextAreaWithReadonly',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( 'The textarea is readonly.' );

		return {
			textareaValue
		};
	}
} );
</script>
