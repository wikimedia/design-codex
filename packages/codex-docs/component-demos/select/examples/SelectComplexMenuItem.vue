<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		default-label="Choose an option"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxSelect, MenuItemData } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconBook, cdxIconClock } from '@wikimedia/codex-icons';

const menuItems: MenuItemData[] = [
	{
		value: 'camera',
		label: 'Camera',
		description: 'optical device for recording or transmitting photographic images or videos',
		icon: cdxIconCamera
	},
	{
		value: 'book',
		label: 'Book',
		description: 'written text that can be published in printed or electronic form',
		icon: cdxIconBook
	},
	{
		value: 'clock',
		label: 'Clock',
		description: 'instrument that measures the passage of time',
		icon: cdxIconClock
	}
];

export default defineComponent( {
	name: 'SelectComplexMenuItems',
	components: { CdxSelect },
	data() {
		return {
			menuItems,
			selection: null,
			menuConfig: {
				boldLabel: true,
				hideDescriptionOverflow: true
			}
		};
	}
} );
</script>
