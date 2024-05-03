<template>
	<section id="cdx-checkbox">
		<h2>Checkboxes</h2>
		<cdx-checkbox
			v-for="option in options"
			:key="option.value"
			v-model="multiSelection"
			:input-value="option.value"
			name="fruit"
		>
			{{ option.label }}
		</cdx-checkbox>
		<p>Selected values: {{ multiSelection.join( ', ' ) || '(none)' }}</p>

		<h3>CSS-only checkboxes</h3>
		<span class="cdx-checkbox">
			<input
				id="checkbox-group-css-only-1"
				class="cdx-checkbox__input"
				type="checkbox"
			>
			<span class="cdx-checkbox__icon" />
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-1">
				Checkbox 1
			</label>
		</span>
		<span class="cdx-checkbox">
			<input
				id="checkbox-group-css-only-2"
				class="cdx-checkbox__input"
				type="checkbox"
				checked
			>
			<span class="cdx-checkbox__icon" />
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-2">
				Checkbox 2 (initially selected)
			</label>
		</span>
		<span class="cdx-checkbox">
			<input
				id="checkbox-group-css-only-3"
				class="cdx-checkbox__input"
				type="checkbox"
			>
			<span class="cdx-checkbox__icon" />
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-3">
				Checkbox 3, which has a very long label that spans onto a second
				line to demonstrate what happens when text wraps
			</label>
		</span>
		<span class="cdx-checkbox">
			<input
				id="checkbox-group-css-only-4"
				class="cdx-checkbox__input"
				type="checkbox"
				indeterminate
			>
			<span class="cdx-checkbox__icon" />
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-4">
				Checkbox 4 (initially indeterminate)
			</label>
		</span>
		<span class="cdx-checkbox">
			<input
				id="checkbox-group-css-only-5"
				class="cdx-checkbox__input"
				type="checkbox"
				disabled
			>
			<span class="cdx-checkbox__icon" />
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-5">
				Checkbox 5 (disabled)
			</label>
		</span>
		<span class="cdx-checkbox">
			<input
				id="checkbox-group-css-only-6"
				class="cdx-checkbox__input"
				type="checkbox"
				checked
				disabled
			>
			<span class="cdx-checkbox__icon" />
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-6">
				Checkbox 6 (initially selected, disabled)
			</label>
		</span>
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
