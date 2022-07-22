<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
		:disabled="true"
	/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup, ButtonGroupItem } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons: ButtonGroupItem[] = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four', disabled: true },
			{ value: 5, label: 'Five' }
		];

		const selectedValue = ref( null );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
