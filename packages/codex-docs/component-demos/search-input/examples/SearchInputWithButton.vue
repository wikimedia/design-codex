<template>
	<cdx-search-input
		v-model="inputValue"
		:use-button="true"
		aria-label="SearchInput with Button demo"
		@update:model-value="onEvent( 'update:modelValue', $event )"
		@submit-click="onEvent( 'submit-click', $event )"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputWithButton',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		/**
		 * @param {string} eventName
		 * @param {string} value
		 */
		const onEvent = function ( eventName, value ) {
			// eslint-disable-next-line no-console
			console.log( eventName + ' event emitted with value: ' + value );
		};

		return {
			inputValue,
			onEvent
		};
	}
} );
</script>
