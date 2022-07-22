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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup, ButtonGroupItem } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiValueToggleButtonGroup',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons: ButtonGroupItem[] = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four' },
			{ value: 5, label: 'Five' }
		];

		// Initializing to an array indicates that this is a multi-select group
		const selectedValue = ref( [] );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
