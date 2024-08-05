<template>
	<section id="cdx-radio">
		<h2>Radios</h2>
		<cdx-radio
			v-for="option in options"
			:key="option.value"
			v-model="selection"
			:input-value="option.value"
			name="fruit"
			:disabled="option.disabled"
		>
			{{ option.label }}
		</cdx-radio>
		<p>Selected value: {{ selection || '(none)' }}</p>

		<h3>Disabled Radios</h3>
		<cdx-radio
			v-for="option in options"
			:key="option.value"
			v-model="disabledSelection"
			:input-value="option.value"
			name="disabled-options"
			:disabled="true"
		>
			{{ option.label }}
		</cdx-radio>

		<h3>Radio with custom input</h3>
		<cdx-radio
			v-for="option in options"
			:key="option.value"
			v-model="customSelection"
			:input-value="option.value"
			name="custom-options"
			:disabled="option.disabled"
		>
			{{ option.label }}
			<template v-if="option.value === 'd'" #custom-input>
				<cdx-select
					v-model:selected="customInputSelection"
					:menu-items="menuItems"
					default-label="Select type"
					:disabled="customSelection !== 'd'"
				/>
			</template>
		</cdx-radio>
		<p>
			Selected value: {{ customSelection || '(none)' }},
			{{ customSelection === 'd' ? customInputSelection : '(none)' }}
		</p>

		<h3>CSS-only version</h3>
		<div class="cdx-radio">
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
		</div>
		<div class="cdx-radio">
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
		</div>
		<div class="cdx-radio">
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
		</div>

		<h4>Disabled radios</h4>
		<div class="cdx-radio">
			<input
				id="radio-group-disabled-1"
				class="cdx-radio__input"
				type="radio"
				name="radio-group-disabled"
			>
			<span class="cdx-radio__icon" />
			<label class="cdx-radio__label" for="radio-group-disabled-1">
				Radio 1
			</label>
		</div>
		<div class="cdx-radio">
			<input
				id="radio-group-disabled-2"
				class="cdx-radio__input"
				type="radio"
				name="radio-group-disabled"
				disabled
			>
			<span class="cdx-radio__icon" />
			<label class="cdx-radio__label" for="radio-group-disabled-2">
				Radio 2 (disabled)
			</label>
		</div>
		<div class="cdx-radio">
			<input
				id="radio-group-disabled-3"
				class="cdx-radio__input"
				type="radio"
				name="radio-group-disabled"
				disabled
				checked
			>
			<span class="cdx-radio__icon" />
			<label class="cdx-radio__label" for="radio-group-disabled-3">
				Radio 3 (disabled and checked)
			</label>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxRadio, MenuItemData, CdxSelect } from '../lib';

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true },
	{ label: 'Dates', value: 'd' }
];

const menuItems: MenuItemData[] = [
	{ label: 'Pitted', value: 'pitted' },
	{ label: 'Unpitted', value: 'unpitted' },
	{ label: 'Pureed', value: 'pureed' }
];

const selection = ref<string>();
const disabledSelection = ref<string>( 'b' );
const customSelection = ref<string>( 'a' );
const customInputSelection = ref( 'pitted' );
</script>
