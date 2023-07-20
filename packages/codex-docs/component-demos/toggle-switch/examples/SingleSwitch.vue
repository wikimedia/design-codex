<template>
	<div>
		<p class="cdx-docs-demo-text">
			Toggle switch value: {{ switchValue }}
		</p>

		<cdx-toggle-switch v-model="switchValue" @update:model-value="onUpdate">
			Show details
		</cdx-toggle-switch>

		<p v-show="switchValue">
			Here are the details
		</p>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleSwitch',
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
