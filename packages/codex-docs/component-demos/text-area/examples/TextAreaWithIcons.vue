<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with icons"
			:start-icon="cdxIconSpeechBubbles"
			:end-icon="cdxIconInfoFilled"
		/>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';
import { cdxIconSpeechBubbles, cdxIconInfoFilled } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextAreaWithIcons',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue,
			cdxIconSpeechBubbles,
			cdxIconInfoFilled
		};
	}
} );
</script>
