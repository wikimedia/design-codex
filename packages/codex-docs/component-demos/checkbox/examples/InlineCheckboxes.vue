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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxCheckbox } from '@wikimedia/codex';
import getEventLogger from '../../../src/utils/getEventLogger';

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

		const onUpdate = getEventLogger<string>( 'update:modelValue' );

		return {
			checkboxValue,
			checkboxes,
			onUpdate
		};
	}
} );
</script>
