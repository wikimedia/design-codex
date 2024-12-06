<template>
	<div role="radiogroup" aria-labelledby="cdx-demo-radio-group-label">
		<cdx-label id="cdx-demo-radio-group-label">
			Radio group demo
		</cdx-label>

		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group"
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
	name: 'RadioGroup',
	components: { CdxRadio, CdxLabel },
	setup() {
		const radioValue = ref( 'radio-2' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1',
				disabled: false
			},
			{
				label: 'Radio 2 (initially selected)',
				value: 'radio-2',
				disabled: false
			},
			{
				label: 'Radio 3, which has a very long label that spans onto a second line to demonstrate what happens when text wraps',
				value: 'radio-3',
				disabled: false
			},
			{
				label: 'Radio 4 (disabled)',
				value: 'radio-4',
				disabled: true
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
