<template>
	<section id="cdx-toggle-button-group">
		<h2>ToggleButtonGroup</h2>
		<cdx-toggle-button-group
			v-model="selectedValue"
			:buttons="buttons"
		/>
		<p>
			Selected value:
			{{ selectedValue ?? '(null)' }}
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxToggleButtonGroup, ButtonGroupItem } from '../lib';
const buttons: ButtonGroupItem[] = [
	{ value: 1, label: 'One' },
	{ value: 2, label: 'Two' },
	{ value: 3, label: 'Three' },
	{ value: 4, label: 'Four' },
	{ value: 5, label: 'Five' }
];

// Initializing to null indicates that this is a single-select group
const selectedValue = ref( null );
</script>
