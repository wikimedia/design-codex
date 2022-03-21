<template>
	<div>
		<cdx-search-input
			v-model="inputValue"
			placeholder="Search"
			@update:model-value="onUpdateModelValue"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputDefault',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref<string|number>( '' );

		function onUpdateModelValue( value: string|number ) {
			// eslint-disable-next-line no-console
			console.log( 'update:modelValue event emitted wth value: ', value );
		}

		return {
			inputValue,
			onUpdateModelValue
		};
	}
} );
</script>
