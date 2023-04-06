<template>
	<section id="cdx-text-area">
		<h2>TextArea</h2>
		<cdx-text-area
			v-model="inputValue"
			placeholder="Start typing..."
		/>
		<p>
			Input value: {{ inputValue }}
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxTextArea } from '../lib-wip';

const inputValue = ref( '' );
</script>
