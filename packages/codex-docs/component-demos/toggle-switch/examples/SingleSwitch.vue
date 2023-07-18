<template>
	<div>
		<p class="cdx-docs-demo-text">
			Toggle switch value: {{ switchValue }}
		</p>

		<cdx-toggle-switch
			v-model="switchValue"
			aria-label="ToggleSwitch demo"
			@update:model-value="onUpdate"
		/>
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
