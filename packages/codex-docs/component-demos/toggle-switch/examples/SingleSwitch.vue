<template>
	<div>
		<p class="cdx-docs-demo-text">
			Toggle switch value: {{ switchValue }}
		</p>

		<cdx-toggle-switch
			v-model="switchValue"
			@update:model-value="onUpdate"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleSwitch',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		const onUpdate = ( value: boolean ) => {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event: ' + value );
		};

		return {
			switchValue,
			onUpdate
		};
	}
} );
</script>
