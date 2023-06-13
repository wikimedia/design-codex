<template>
	<div>
		<cdx-text-area
			v-model="textareaValue"
			aria-label="TextArea with icons"
			placeholder="Start typing..."
			:start-icon="cdxIconNotBright"
			:end-icon="cdxIconInfoFilled"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxTextArea } from '@wikimedia/codex';
import { cdxIconNotBright, cdxIconInfoFilled } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'TextAreaWithIcons',
	components: { CdxTextArea },
	setup() {
		// Reactive reference to the textarea value
		const textareaValue = ref( '' );

		return {
			textareaValue,
			cdxIconNotBright,
			cdxIconInfoFilled
		};
	}
} );
</script>
