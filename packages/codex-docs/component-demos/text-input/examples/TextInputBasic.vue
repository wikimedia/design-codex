<template>
	<cdx-text-input
		v-model="inputValue"
		aria-label="TextInput basic usage demo"
		@update:model-value="onEvent( 'update:modelValue', $event )"
		@input="onEvent( 'input', $event )"
		@change="onEvent( 'change', $event )"
		@focus="onEvent( 'focus', $event )"
		@blur="onEvent( 'blur', $event )"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'TextInputBasic',
	components: { CdxTextInput },
	setup() {
		const inputValue = ref( '' );

		/**
		 * @param {string} eventName
		 * @param {Event|string} event
		 */
		const onEvent = function ( eventName, event ) {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value:', event );
		};

		return {
			inputValue,
			onEvent
		};
	}
} );
</script>
