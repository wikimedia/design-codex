<template>
	<div>
		<cdx-search-input
			v-model="inputValue"
			button-label="Search"
			aria-label="SearchInput with Button demo"
			@update:model-value="onEvent( 'update:modelValue', $event )"
			@submit-click="onEvent( 'submit-click', $event )"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxSearchInput } from '@wikimedia/codex';
import { getMultiEventLogger } from '../../../src/utils/getEventLogger';

export default defineComponent( {
	name: 'SearchInputWithButton',
	components: { CdxSearchInput },
	setup() {
		// Set up a reactive reference to track the input value.
		const inputValue = ref<string|number>( '' );

		const onEvent = getMultiEventLogger<string|number>();

		return {
			inputValue,
			onEvent
		};
	}
} );
</script>
