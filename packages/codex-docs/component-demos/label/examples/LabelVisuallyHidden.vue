<template>
	<div>
		<cdx-label input-id="sort-order-select" :visually-hidden="true">
			Sort results
		</cdx-label>
		<cdx-select
			id="sort-order-select"
			v-model:selected="selection"
			:menu-items="menuItems"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxSelect, CdxLabel } from '@wikimedia/codex';
export default defineComponent( {
	name: 'LabelVisuallyHidden',
	components: { CdxSelect, CdxLabel },
	data() {
		return {
			menuItems: [
				{ label: 'Sort by: latest', value: 'recency' },
				{ label: 'Sort by: alphabetical', value: 'alphabetical' }
			],
			selection: 'recency'
		};
	}
} );
</script>
