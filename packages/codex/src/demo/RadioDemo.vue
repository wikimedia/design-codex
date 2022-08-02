<template>
	<section id="cdx-radio">
		<h2>Radios</h2>
		<cdx-radio
			v-for="option in options"
			:key="option.value"
			v-model="selection"
			:input-value="option.value"
		>
			{{ option.label }}
		</cdx-radio>
		<p>Selected value: {{ selection || '(none)' }}</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxRadio, MenuItemData } from '../lib';

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true }
];
const selection = ref<string>();
</script>
