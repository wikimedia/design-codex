<template>
	<cdx-toggle-button-group
		v-model="selectedValue"
		:buttons="buttons"
	>
		<template #default="{ button, selected }">
			{{ button.label }}
			<span v-if="selected">
				({{ button.value }})
			</span>
		</template>
	</cdx-toggle-button-group>
	<p>
		Selected value:
		{{ selectedValue ?? '(null)' }}
	</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleButtonGroup, ButtonGroupItem } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToggleButtonGroupWithSlot',
	components: {
		CdxToggleButtonGroup
	},
	setup() {
		const buttons: ButtonGroupItem[] = [
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
