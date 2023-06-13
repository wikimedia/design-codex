<template>
	<section id="cdx-text-area">
		<h2>TextArea</h2>
		<cdx-text-area
			v-model="textareaValue"
			:start-icon="cdxIconNotBright"
			:end-icon="cdxIconInfoFilled"
			placeholder="Start typing..."
			aria-label="Textarea demo"
		/>
		<p>
			Textarea value: {{ textareaValue }}
		</p>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CdxTextArea } from '../lib-wip';
import { cdxIconNotBright, cdxIconInfoFilled } from '@wikimedia/codex-icons';

const textareaValue = ref( '' );
</script>
