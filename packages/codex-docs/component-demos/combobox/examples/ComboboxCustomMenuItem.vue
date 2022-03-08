<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-combobox
			v-model="selection"
			:menu-items="menuItems"
			placeholder="Type or choose an option"
		>
			<template #menu-item="{ menuItem }">
				<cdx-icon v-if="menuItem.icon" :icon="menuItem.icon" />
			</template>
		</cdx-combobox>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox, CdxIcon, MenuItemData } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconBook, cdxIconClock } from '@wikimedia/codex-icons';

const menuItems: MenuItemData[] = [
	{ value: 'camera', icon: cdxIconCamera },
	{ value: 'book', icon: cdxIconBook },
	{ value: 'clock', icon: cdxIconClock }
];

export default defineComponent( {
	name: 'ComboboxCustomMenuItem',
	components: { CdxCombobox, CdxIcon },

	data() {
		return {
			menuItems,
			selection: ''
		};
	}
} );
</script>
