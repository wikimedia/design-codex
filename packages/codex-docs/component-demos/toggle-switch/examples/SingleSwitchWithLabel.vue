<template>
	<div>
		<cdx-toggle-switch v-model="switchValue">
			Show details
		</cdx-toggle-switch>

		<p v-show="switchValue">
			Here are the details
		</p>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleSwitchWithLabel',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		return {
			switchValue
		};
	}
} );
</script>
