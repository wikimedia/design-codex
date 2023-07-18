<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	/>
	<p>
		Selected values:
		{{ selectedValue.join( ', ' ) || '(none)' }}
	</p>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MaximumToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'First button' },
			{ value: 2, label: 'Second button' },
			{ value: 3, label: 'Third button with a long label' },
			{ value: 4, label: 'Fourth button with a long label' },
			{ value: 5, label: 'Fifth button' }
		];

		const selectedValue = ref( [] );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
