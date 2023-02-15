<template>
	<section id="cdx-text-input">
		<h2>TextInput</h2>
		<cdx-text-input
			v-model="inputValue"
			clearable
			aria-label="TextInput demo"
		/>
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
