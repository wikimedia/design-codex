<template>
	<div>
		<cdx-checkbox
			v-for="checkbox in checkboxes"
			:key="'checkbox-' + checkbox.value"
			v-model="checkboxValue"
			:input-value="checkbox.value"
			:inline="true"
			@update:model-value="onUpdate"
		>
			{{ checkbox.label }}
		</cdx-checkbox>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InlineCheckboxes',
	components: { CdxCheckbox },
	setup() {
		const checkboxValue = ref( [ 'checkbox-1' ] );
		const checkboxes = [
			{
				label: 'Checkbox 1',
				value: 'checkbox-1'
			},
			{
				label: 'Checkbox 2',
				value: 'checkbox-2'
			}
		];

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			checkboxValue,
			checkboxes,
			onUpdate
		};
	}
} );
</script>
