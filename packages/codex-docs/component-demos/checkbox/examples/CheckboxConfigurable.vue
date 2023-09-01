<template>
	<div>
		<cdx-checkbox
			v-model="checkboxValue"
			input-value="checkbox"
			:status="status"
			:disabled="disabled"
			:indeterminate="indeterminate"
			@update:model-value="onUpdate"
		>
			Checkbox
		</cdx-checkbox>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';

export default defineComponent( {
	name: 'CheckboxConfigurable',
	components: { CdxCheckbox },
	props: {
		status: {
			type: String,
			default: 'default'
		},
		disabled: {
			type: Boolean,
			default: false
		},
		indeterminate: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const checkboxValue = ref( false );

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			checkboxValue,
			onUpdate
		};
	}
} );
</script>
