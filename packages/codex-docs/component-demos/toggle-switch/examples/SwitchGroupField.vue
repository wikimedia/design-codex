<template>
	<cdx-field :is-fieldset="true">
		<cdx-toggle-switch
			v-for="toggleSwitch in toggleSwitches"
			:key="'switch-' + toggleSwitch.value"
			v-model="fieldValue"
			:input-value="toggleSwitch.value"
			:align-switch="true"
		>
			{{ toggleSwitch.label }}
		</cdx-toggle-switch>
		<template #label>
			Editing options
		</template>
		<template #description>
			General option for editing
		</template>
		<template #help-text>
			Visit Special:Preferences for more editing options.
		</template>
	</cdx-field>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchGroupField',
	components: { CdxToggleSwitch, CdxField },
	setup() {
		const fieldValue = ref( [ 'wikilove' ] );
		const toggleSwitches = [
			{
				label: 'Enable section editing by right clicking on section titles',
				value: 'rightClickTitle'
			},
			{
				label: 'Edit pages on double click',
				value: 'doubleClick'
			},
			{
				label: 'Enable showing appreciation for other users with the WikiLove tab',
				value: 'wikilove'
			}
		];

		return {
			fieldValue,
			toggleSwitches
		};
	}
} );
</script>
