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

		<h3>CSS-only radios</h3>
		<span class="cdx-radio">
			<input
				id="radio-group-css-only-1"
				class="cdx-radio__input"
				type="radio"
				name="radio-group-css-only"
			>
			<span class="cdx-radio__icon" />
			<label class="cdx-radio__label" for="radio-group-css-only-1">
				Radio 1
			</label>
		</span>
		<span class="cdx-radio">
			<input
				id="radio-group-css-only-2"
				class="cdx-radio__input"
				type="radio"
				name="radio-group-css-only"
				checked
			>
			<span class="cdx-radio__icon" />
			<label class="cdx-radio__label" for="radio-group-css-only-2">
				Radio 2 (initially selected)
			</label>
		</span>
		<span class="cdx-radio">
			<input
				id="radio-group-css-only-3"
				class="cdx-radio__input"
				type="radio"
				name="radio-group-css-only"
			>
			<span class="cdx-radio__icon" />
			<label class="cdx-radio__label" for="radio-group-css-only-3">
				Radio 3, which has a very long label that spans onto a second line to
				demonstrate what happens when text wraps
			</label>
		</span>
		<span class="cdx-radio">
			<input
				id="radio-group-css-only-4"
				class="cdx-radio__input"
				type="radio"
				name="radio-group-css-only"
				disabled
			>
			<span class="cdx-radio__icon" />
			<label class="cdx-radio__label" for="radio-group-css-only-4">
				Radio 4 (disabled)
			</label>
		</span>
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
