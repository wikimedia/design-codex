<template>
	<section id="cdx-search-input">
		<h2>SearchInput</h2>
		<div>
			<cdx-search-input
				v-model="inputValue"
				aria-label="SearchInput demo"
				placeholder="Search"
				button-label="Search"
				@update:model-value="onUpdateModelValue"
			/>
		</div>

		<h3>CSS-only version</h3>
		<div class="cdx-search-input cdx-search-input--has-end-button">
			<div class="cdx-search-input__input-wrapper">
				<div class="cdx-text-input cdx-text-input--has-start-icon">
					<input
						class="cdx-text-input__input"
						type="search"
						placeholder="Search"
					>
					<span class="cdx-text-input__icon cdx-text-input__start-icon" />
				</div>
			</div>
			<button class="cdx-button cdx-search-input__end-button">
				Search
			</button>
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
