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

		<h3>Checkbox with custom input</h3>
		<cdx-checkbox
			v-for="checkbox in checkboxes"
			:key="checkbox.value"
			v-model="customSelection"
			:input-value="checkbox.value"
			name="games"
		>
			{{ checkbox.label }}
			<template v-if="checkbox.value === 'other'" #custom-input>
				<cdx-text-input
					v-model="customInputValue"
					:disabled="!customSelection.includes( 'other' )"
					aria-label="TextInput custom input"
					placeholder="Start typing..."
				/>
			</template>
		</cdx-checkbox>
		<p>
			Selected values: {{ customSelection.join( ', ' ) || '(none)' }},
			Other value: {{ customSelection.includes( 'other' ) ? customInputValue : '(none)' }}
		</p>

		<h3>CSS-only checkboxes</h3>
		<div class="cdx-checkbox">
			<input
				id="checkbox-group-css-only-1"
				class="cdx-checkbox__input"
				type="checkbox"
			>
			<span class="cdx-checkbox__icon" />
			<label class="cdx-checkbox__label" for="checkbox-group-css-only-1">
				Checkbox 1
			</label>
		</div>
		<div class="cdx-checkbox">
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
		</div>
		<div class="cdx-checkbox">
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
		</div>
		<div class="cdx-checkbox">
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
		</div>
		<div class="cdx-checkbox">
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
		</div>
		<div class="cdx-checkbox">
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
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxCheckbox, MenuItemData, CdxTextInput } from '../lib';

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true }
];

const multiSelection = ref<string[]>( [] );

// Checkbox with custom input
const customSelection = ref<string[]>( [] );
const customInputValue = ref( '' );
const checkboxes: MenuItemData[] = [
	{ label: 'Chess', value: 'chess' },
	{ label: 'Checkers', value: 'checkers' },
	{ label: 'Cards', value: 'cards' },
	{ label: 'Other', value: 'other' }
];
</script>
