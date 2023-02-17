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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'SingleSwitch',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		const onUpdate = getEventLogger<boolean>( 'update:modelValue' );

		return {
			switchValue,
			onUpdate
		};
	}
} );
</script>
