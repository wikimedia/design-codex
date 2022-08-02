<template>
	<section id="cdx-text-input">
		<h2>Text Inputs</h2>
		<cdx-text-input v-model="inputValue" clearable />
		<p>
			Input value: {{ inputValue }}
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxTextInput } from '../lib';

const inputValue = ref<string>();
</script>
