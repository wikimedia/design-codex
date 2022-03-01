<template>
	<div>
		<p class="cdx-docs-demo-text">
			Checkbox group value: {{ checkboxValue }}
		</p>

		<cdx-checkbox
			v-for="checkbox in checkboxes"
			:key="'checkbox-' + checkbox.value"
			v-model="checkboxValue"
			:input-value="checkbox.value"
			:disabled="checkbox.disabled"
			:indeterminate="true"
			@update:model-value="onUpdate"
		>
			{{ checkbox.label }}
		</cdx-checkbox>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';

export default defineComponent( {
	name: 'IndeterminateState',
	components: { CdxCheckbox },
	setup() {
		const checkboxValue = ref( [ 'checkbox-2', 'checkbox-4' ] );
		const checkboxes = [
			{
				label: 'Checkbox 1',
				value: 'checkbox-1',
				disabled: false
			},
			{
				label: 'Checkbox 2 (initially selected)',
				value: 'checkbox-2',
				disabled: false
			},
			{
				label: 'Checkbox 3 (disabled)',
				value: 'checkbox-3',
				disabled: true
			},
			{
				label: 'Checkbox 4 (initially selected, disabled)',
				value: 'checkbox-4',
				disabled: true
			}
		];

		const onUpdate = ( value: string ): void => {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event: ' + value );
		};

		return {
			checkboxValue,
			checkboxes,
			onUpdate
		};
	}
} );
</script>
