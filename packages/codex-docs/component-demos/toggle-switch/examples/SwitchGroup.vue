<template>
	<div role="group" aria-labelledby="cdx-demo-switch-group-label">
		<cdx-label id="cdx-demo-switch-group-label">
			ToggleSwitch group demo
		</cdx-label>

		<cdx-toggle-switch
			v-for="toggleSwitch in toggleSwitches"
			:key="'switch-' + toggleSwitch.value"
			v-model="toggleSwitchValue"
			:input-value="toggleSwitch.value"
			:align-switch="true"
		>
			{{ toggleSwitch.label }}
		</cdx-toggle-switch>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch, CdxLabel } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchGroup',
	components: { CdxToggleSwitch, CdxLabel },
	setup() {
		const toggleSwitchValue = ref( [ 'switch-1' ] );
		const toggleSwitches = [
			{
				label: 'Toggle switch 1',
				value: 'switch-1'
			},
			{
				label: 'Toggle switch 2 with a longer label',
				value: 'switch-2'
			},
			{
				label: 'Toggle switch 3',
				value: 'switch-3'
			}
		];

		return {
			toggleSwitchValue,
			toggleSwitches
		};
	}
} );
</script>
