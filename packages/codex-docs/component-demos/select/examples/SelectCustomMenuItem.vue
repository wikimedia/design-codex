<template>
	<cdx-select
		v-model:selected="selection"
		:menu-items="menuItems"
		default-label="Choose an option"
	>
		<template #menu-item="{ menuItem }">
			<cdx-icon v-if="menuItem.icon" :icon="menuItem.icon" />
		</template>
	</cdx-select>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxSelect, CdxIcon } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconBook, cdxIconClock } from '@wikimedia/codex-icons';

const menuItems = [
	{
		value: 'camera',
		label: 'Camera',
		icon: cdxIconCamera
	},
	{
		value: 'book',
		label: 'Book',
		icon: cdxIconBook
	},
	{
		value: 'clock',
		label: 'Clock',
		icon: cdxIconClock
	}
];

export default defineComponent( {
	name: 'SelectCustomMenuItem',
	components: { CdxSelect, CdxIcon },
	data() {
		return {
			menuItems,
			selection: null
		};
	}
} );
</script>
