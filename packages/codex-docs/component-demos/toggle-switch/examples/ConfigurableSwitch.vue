<template>
	<div>
		<cdx-toggle-switch
			v-if="$slots.default"
			v-model="switchValue"
			:disabled="disabled"
		>
			<slot />
		</cdx-toggle-switch>
		<cdx-toggle-switch
			v-else
			v-model="switchValue"
			:disabled="disabled"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleSwitch } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ConfigurableSwitch',
	components: { CdxToggleSwitch },
	props: {
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const switchValue = ref( false );

		return {
			switchValue
		};
	}
} );
</script>
