<template>
	<cdx-field>
		<cdx-select
			v-model:selected="selection"
			:menu-items="menuItems"
			default-label="Choose an option"
		/>
		<template #label>
			Search interface
		</template>
		<template #description>
			Select a search interface to use by default
		</template>
		<template #help-text>
			Special:Search is better for searching text-based items like articles.
			Special:MediaSearch provides a better interface for searching files.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect, CdxField } from '@wikimedia/codex';
export default defineComponent( {
	name: 'SelectField',
	components: { CdxSelect, CdxField },
	data() {
		return {
			menuItems: [
				{ label: 'Special:Search', value: 'search' },
				{ label: 'Special:MediaSearch', value: 'mediasearch' }
			],
			selection: null
		};
	}
} );
</script>
