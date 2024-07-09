<template>
	<cdx-field
		:is-fieldset="true"
	>
		<template #label>
			Expiration
		</template>
		<template #description>
			When do you want the block to expire?
		</template>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-with-custom-input-demo"
			:input-value="radio.value"
		>
			{{ radio.label }}
			<template v-if="radio.value === 'other'" #custom-input>
				<cdx-text-input
					v-model="otherInputValue"
					aria-label="TextInput custom input"
					placeholder="Custom duration..."
					:disabled="radioValue !== 'other'"
				/>
			</template>
		</cdx-radio>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxField, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadiosWithCustomInput',
	components: { CdxRadio, CdxField, CdxTextInput },
	setup() {
		const radioValue = ref( 'preset' );
		const radios = [
			{
				label: 'Preset duration',
				value: 'preset'
			},
			{
				label: 'Specific date and time',
				value: 'specific'
			},
			{
				label: 'Other duration',
				value: 'other'
			}
		];
		const otherInputValue = ref( '' );

		return {
			radioValue,
			radios,
			otherInputValue
		};
	}
} );
</script>
