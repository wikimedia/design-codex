<template>
	<section id="cdx-search-input">
		<h2>Search Input</h2>
		<div>
			<cdx-search-input
				v-model="inputValue"
				placeholder="Search"
				@update:model-value="onUpdateModelValue"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxSearchInput } from '../lib';
import getEventLogger from 'codex-docs/src/utils/getEventLogger';
const inputValue = ref<string|number>( '' );
const onUpdateModelValue = getEventLogger<string|number>( 'update:modelValue' );
</script>
