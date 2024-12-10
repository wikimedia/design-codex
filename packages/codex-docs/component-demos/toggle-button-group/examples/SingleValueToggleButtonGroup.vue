<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
		:disabled="disabled"
		@update:model-value="onUpdate"
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
	props: {
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
			{ value: 3, label: 'Three' },
			{ value: 4, label: 'Four' },
			{ value: 5, label: 'Five' }
		];

		// Initializing to null indicates that this is a single-select group
		const selectedValue = ref( null );

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			buttons,
			selectedValue,
			onUpdate
		};
	}
} );
</script>
