<template>
	<cdx-toggle-button
		v-model="buttonValue"
		@update:model-value="onUpdate"
	>
		Toggle
	</cdx-toggle-button>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxToggleButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SingleButton',
	components: { CdxToggleButton },
	setup() {
		const buttonValue = ref( false );

		const onUpdate = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			buttonValue,
			onUpdate
		};
	}
} );
</script>
