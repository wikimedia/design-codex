<template>
	<cdx-toggle-switch v-model="switchValue">
		Visual editing mode
		<template #description>
			Turn on to use the visual editor. You can switch back to source mode at any time.
		</template>
	</cdx-toggle-switch>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchWithDescription',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		return {
			switchValue
		};
	}
} );
</script>
