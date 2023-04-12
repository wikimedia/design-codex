<template>
	<section id="cdx-text-area">
		<h2>TextArea</h2>
		<cdx-text-area
			v-model="textareaValue"
			placeholder="Start typing..."
		/>
		<p>
			Textarea value: {{ textareaValue }}
		</p>
	</section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CdxTextArea } from '../lib-wip';

const textareaValue = ref( '' );
</script>
