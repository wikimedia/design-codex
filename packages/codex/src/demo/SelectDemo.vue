<template>
	<section id="cdx-select">
		<h2>Select</h2>
		<cdx-select
			v-model:selected="selection"
			:menu-items="options"
			default-label="Choose an option"
		/>
		<p>Selected value: {{ selection || '(none)' }}</p>

		<h3>CSS-only select</h3>
		<select class="cdx-select">
			<option value="">
				Choose an option
			</option>
			<option value="a">
				Option A
			</option>
			<option value="b">
				Option B
			</option>
			<option value="c">
				Option C
			</option>
			<option value="d" disabled>
				Option D
			</option>
		</select>
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
