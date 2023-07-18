<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	>
		<template #label="{ selectedMenuItem, defaultLabel }">
			<span v-if="selectedMenuItem">
				<span>You have selected: {{ selectedMenuItem.label }}</span>
			</span>
			<span v-else>
				{{ defaultLabel }}
			</span>
		</template>
	</cdx-select>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect } from '@wikimedia/codex';

export default defineComponent( {
	name: 'SelectCustomLabel',
	components: { CdxSelect },
	data() {
		return {
			menuItems: [
				{ label: 'Option A', value: 'a' },
				{ label: 'Option B', value: 'b' },
				{ label: 'Option C', value: 'c' },
				{ label: 'Option D', value: 'd', disabled: true }
			],
			selection: null
		};
	}
} );
</script>
