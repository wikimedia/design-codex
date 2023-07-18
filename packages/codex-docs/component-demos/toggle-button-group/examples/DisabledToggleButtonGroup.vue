<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
		:disabled="true"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
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
