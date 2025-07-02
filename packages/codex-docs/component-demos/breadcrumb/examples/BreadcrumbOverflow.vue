<template>
	<cdx-breadcrumb
		:items="breadcrumbItems"
		:max-visible="2"
		:truncate-length="12"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxBreadcrumb } from '@wikimedia/codex';

export default defineComponent( {
	name: 'BreadcrumbOverflow',
	components: { CdxBreadcrumb },
	setup() {
		const breadcrumbItems = [
			{ label: 'Wikimedia Open Source', url: 'https://doc.wikimedia.org/' },
			{ label: 'Codex', url: 'https://doc.wikimedia.org/codex/latest' },
			{ label: 'Designing Components', url: 'https://doc.wikimedia.org/codex/latest/contributing/designing-components.html' },
			{ label: 'Visual Style and Interaction', url: '' }
		];

		return {
			breadcrumbItems
		};
	}
} );

</script>
