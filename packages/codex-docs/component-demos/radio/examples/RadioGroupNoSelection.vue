<template>
	<div role="radiogroup" aria-labelledby="cdx-demo-radio-group-no-selection-label">
		<cdx-label id="cdx-demo-radio-group-no-selection-label">
			Radio group demo with no initial selection
		</cdx-label>

		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-no-selection"
			:input-value="radio.value"
			:disabled="radio.disabled"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadioGroupNoSelection',
	components: { CdxRadio, CdxLabel },
	setup() {
		const radioValue = ref( '' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1'
			},
			{
				label: 'Radio 2',
				value: 'radio-2'
			},
			{
				label: 'Radio 3',
				value: 'radio-3'
			}
		];

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			radioValue,
			radios,
			onUpdate
		};
	}
} );
</script>
