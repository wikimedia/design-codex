<template>
	<cdx-search-input
		v-model="inputValue"
		aria-label="SearchInput default demo"
		placeholder="Search"
		@update:model-value="onUpdateModelValue"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputDefault',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref( '' );

		const onUpdateModelValue = function ( value ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted with value: ' + value );
		};

		return {
			inputValue,
			onUpdateModelValue
		};
	}
} );
</script>
