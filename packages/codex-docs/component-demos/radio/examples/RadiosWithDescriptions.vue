<template>
	<fieldset class="cdx-demo-radios-with-descriptions">
		<legend>Search completion</legend>
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
	</fieldset>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxRadio } from '@wikimedia/codex';

export default defineComponent( {
	name: 'RadiosWithDescriptions',
	components: { CdxRadio },
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

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-radios-with-descriptions {
	&,
	legend {
		// Unset browser styles
		border: 0;
		padding: 0;
	}

	legend {
		margin-bottom: @spacing-25;
		font-weight: @font-weight-bold;
	}
}
</style>
