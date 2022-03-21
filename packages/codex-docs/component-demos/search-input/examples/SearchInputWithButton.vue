<template>
	<div>
		<cdx-search-input
			v-model="inputValue"
			button-label="Search"
			@update:model-value="onUpdateModelValue"
			@submit-click="onSubmit"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputWithButton',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref<string|number>( '' );

		function onUpdateModelValue( value: string|number ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted wth value: ', value );
		}

		function onSubmit( value: string|number ) {
			// eslint-disable-next-line no-console
			console.log( 'submit-click event emitted with value ', value );
		}

		return {
			inputValue,
			onUpdateModelValue,
			onSubmit
		};
	}
} );
</script>
