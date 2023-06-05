<template>
	<fieldset class="cdx-docs-legend-demo">
		<cdx-label :is-legend="true">
			Notifications
			<template #description>
				Choose how often you'd like to receive notifications
			</template>
		</cdx-label>
		<cdx-radio
			v-for="radio in radios"
			:key="'radio-' + radio.value"
			v-model="radioValue"
			name="radio-group"
			:input-value="radio.value"
		>
			{{ radio.label }}
		</cdx-radio>
	</fieldset>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxRadio, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'LegendWithDescription',
	components: { CdxRadio, CdxLabel },
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

<style lang="less">
.cdx-docs-legend-demo {
	// Remove <fieldset> border and padding.
	border: 0;
	padding: 0;
}
</style>
