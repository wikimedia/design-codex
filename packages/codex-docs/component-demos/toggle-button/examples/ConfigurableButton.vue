<template>
	<div>
		<cdx-toggle-button
			v-model="buttonValue"
			:disabled="disabled"
		>
			<slot />
		</cdx-toggle-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxToggleButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ConfigurableButton',
	components: { CdxToggleButton },
	props: {
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const buttonValue = ref( false );

		return {
			buttonValue
		};
	}
} );
</script>
