<template>
	<div>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="inline-radios"
			:input-value="radio.value"
			:inline="true"
			@update:model-value="onUpdate"
		>
			{{ radio.label }}
		</cdx-radio>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InlineRadios',
	components: { CdxRadio },
	setup() {
		const radioValue = ref( 'radio-2' );
		const radios = [
			{
				label: 'Radio 1',
				value: 'radio-1'
			},
			{
				label: 'Radio 2',
				value: 'radio-2'
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
