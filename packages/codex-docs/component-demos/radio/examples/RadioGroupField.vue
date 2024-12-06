<template>
	<cdx-field :is-fieldset="true">
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-field"
			:input-value="radio.value"
		>
			{{ radio.label }}
		</cdx-radio>
		<template #label>
			Notifications
		</template>
		<template #description>
			Choose how often you'd like to receive notifications
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {
	CdxField,
	CdxRadio
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadioGroupField',
	components: {
		CdxField,
		CdxRadio
	},
	setup() {
		const radioValue = ref( 'daily' );
		const radios = [
			{
				label: 'Daily',
				value: 'daily'
			},
			{
				label: 'Weekly',
				value: 'weekly'
			},
			{
				label: 'Monthly',
				value: 'monthly'
			}
		];

		return {
			radioValue,
			radios
		};
	}
} );
</script>
