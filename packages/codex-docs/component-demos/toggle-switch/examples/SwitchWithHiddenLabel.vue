<template>
	<div>
		<p id="cdx-toggle-switch-hidden-label-description">
			Use the toggle switch to show hidden content.
		</p>
		<cdx-toggle-switch
			v-model="switchValue"
			:hide-label="true"
			aria-describedby="cdx-toggle-switch-hidden-label-description"
		>
			Show hidden content
		</cdx-toggle-switch>

		<p v-show="switchValue">
			Here is the hidden content
		</p>
	</div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SwitchWithHiddenLabel',
	components: { CdxToggleSwitch },
	setup() {
		const switchValue = ref( false );

		return {
			switchValue
		};
	}
} );
</script>
