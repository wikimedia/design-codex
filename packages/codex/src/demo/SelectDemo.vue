<template>
	<section id="cdx-select">
		<h2>Select</h2>
		<cdx-select
			v-model:selected="selection"
			:menu-items="options"
			default-label="Choose an option"
		/>
		<p>Selected value: {{ selection || '(none)' }}</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxSelect, MenuItemData } from '../lib';

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true }
];
const selection = ref<string|null>( null );
</script>
