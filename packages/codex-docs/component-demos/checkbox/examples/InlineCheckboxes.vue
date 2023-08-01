<template>
	<div>
		<cdx-checkbox
			v-model="checkbox1Value"
			input-value="checkbox-1"
			:inline="true"
			@update:model-value="onUpdate"
		>
			Checkbox 1
		</cdx-checkbox>
		<cdx-checkbox
			v-model="checkbox2Value"
			input-value="checkbox-2"
			:inline="true"
			@update:model-value="onUpdate"
		>
			Checkbox 2
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
		const checkbox1Value = ref( true );
		const checkbox2Value = ref( false );

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			checkbox1Value,
			checkbox2Value,
			onUpdate
		};
	}
} );
</script>
