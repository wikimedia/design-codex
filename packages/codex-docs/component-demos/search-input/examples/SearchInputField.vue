<template>
	<cdx-field>
		<cdx-search-input
			v-model="inputValue"
			button-label="Search"
		/>
		<template #label>
			Search articles
		</template>
		<template #description>
			Find Wikipedia articles
		</template>
		<template #help-text>
			If there is an article matching your search term, you will be taken directly to that
			article. Otherwise, you will be taken to the search page.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxSearchInput, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SearchInputField',
	components: { CdxSearchInput, CdxField },
	setup() {
		const inputValue = ref( '' );

		return {
			inputValue
		};
	}
} );
</script>
