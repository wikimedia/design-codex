<template>
	<div>
		<cdx-search-input
			v-model="inputValue"
			aria-label="SearchInput default demo"
			placeholder="Search"
			@update:model-value="onUpdateModelValue"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';
import getEventLogger from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'SearchInputDefault',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref<string|number>( '' );

		const onUpdateModelValue = getEventLogger<string|number>( 'update:modelValue' );

		return {
			inputValue,
			onUpdateModelValue
		};
	}
} );
</script>
