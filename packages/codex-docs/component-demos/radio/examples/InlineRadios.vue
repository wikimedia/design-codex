<template>
	<cdx-field :is-fieldset="true" :hide-label="true">
		<template #label>
			Inline Radio group demo
		</template>
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
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InlineRadios',
	components: { CdxRadio, CdxField },
	setup() {
		const radioValue = ref( 'radio-1' );
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
