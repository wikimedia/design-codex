<template>
	<section id="cdx-checkbox">
		<h2>Checkboxes</h2>
		<cdx-checkbox
			v-for="option in options"
			:key="option.value"
			v-model="multiSelection"
			:input-value="option.value"
		>
			{{ option.label }}
		</cdx-checkbox>
		<p>Selected values: {{ multiSelection.join( ', ' ) || '(none)' }}</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxCheckbox, MenuItemData } from '../lib';

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true }
];

const multiSelection = ref<string[]>( [] );
</script>
