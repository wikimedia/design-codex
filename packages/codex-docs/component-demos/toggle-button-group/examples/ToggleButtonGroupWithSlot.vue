<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	>
		<template #default="{ button }">
			{{ button.label }}
			<span>
				(value: {{ button.value }})
			</span>
		</template>
	</cdx-toggle-button-group>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToggleButtonGroupWithSlot',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons = [
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' }
		];

		const selectedValue = ref( 2 );

		return {
			buttons,
			selectedValue
		};
	}
} );
</script>
