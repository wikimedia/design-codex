<template>
	<section id="cdx-combobox">
		<h2>Combobox</h2>
		<div class="cdx-demo__content__sectioning">
			<cdx-combobox
				v-model:selected="selection"
				:menu-items="options"
				placeholder="Type or choose an option"
				:disabled="false"
			/>
		</div>
		<div class="cdx-demo__content__sectioning">
			<cdx-combobox
				v-model:selected="selection"
				:menu-items="options"
				placeholder="Type or choose an option"
				:disabled="false"
				:clearable="true"
			/>
		</div>
		<div class="cdx-demo__content__sectioning">
			<cdx-combobox
				v-model:selected="selection"
				:menu-items="options"
				placeholder="Type or choose an option"
				:disabled="false"
				:end-icon="cdxIconEdit"
			/>
		</div>
		<div class="cdx-demo__content__sectioning">
			<cdx-combobox
				v-model:selected="selection"
				:menu-items="options"
				placeholder="Type or choose an option"
				:disabled="false"
				clearable
				:end-icon="cdxIconEdit"
			/>
		</div>
		<div class="cdx-demo__content__sectioning">
			<cdx-combobox
				v-model:selected="selection"
				:menu-items="options"
				placeholder="Type or choose an option"
				:disabled="false"
				clearable
				:start-icon="cdxIconSearch"
				:end-icon="cdxIconEdit"
			/>
		</div>
		<p>Selected value: {{ selection || '(none)' }}</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxCombobox, MenuItemData } from '../lib';
import { cdxIconEdit, cdxIconSearch } from '@wikimedia/codex-icons';

const options: MenuItemData[] = [
	{ label: 'Apple', value: 'a' },
	{ label: 'Banana', value: 'b' },
	{ label: 'Canteloupe', value: 'c', disabled: true }
];

const selection = ref( 'a' );
</script>
