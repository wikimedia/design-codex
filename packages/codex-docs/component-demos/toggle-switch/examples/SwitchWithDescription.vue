<template>
	<p class="cdx-docs-demo-text">
		Toggle switch value: {{ switchValue }}
	</p>

	<cdx-toggle-switch v-model="switchValue" @update:model-value="onUpdate">
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

		function onUpdate( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value:', value );
		}

		return {
			switchValue,
			onUpdate
		};
	}
} );
</script>
