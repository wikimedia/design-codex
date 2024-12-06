<template>
	<cdx-toggle-switch v-model="switchValue" @update:model-value="onUpdate">
		<slot />
		<template #description>
			<slot name="description" />
		</template>
	</cdx-toggle-switch>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchConfigurable',
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
