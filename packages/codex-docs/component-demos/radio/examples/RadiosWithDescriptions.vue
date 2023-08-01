<template>
	<cdx-field :is-fieldset="true">
		<template #label>
			Search completion
		</template>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group-descriptions"
			:input-value="radio.value"
		>
			{{ radio.label }}
			<template #description>
				{{ radio.description }}
			</template>
		</cdx-radio>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadiosWithDescriptions',
	components: { CdxRadio, CdxField },
	setup() {
		const radioValue = ref( 'default' );
		const radios = [
			{
				label: 'Default (recommended)',
				description: 'Corrects up to two typos. Removes redirects that are very similar to the main title.',
				value: 'default'
			},
			{
				label: 'Strict mode (advanced)',
				description: 'No typo correction. No accent folding. Strict matching.',
				value: 'strict'
			}
		];

		return {
			radioValue,
			radios
		};
	}
} );
</script>
