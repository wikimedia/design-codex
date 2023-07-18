<template>
	<div>
		<cdx-combobox
			v-model:selected="selection"
			:menu-items="menuItems"
			placeholder="Type or choose an option"
		>
			<template #menu-item="{ menuItem }">
				<cdx-icon v-if="menuItem.icon" :icon="menuItem.icon" />
			</template>
		</cdx-combobox>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCombobox, CdxIcon } from '@wikimedia/codex';
import { cdxIconCamera, cdxIconBook, cdxIconClock } from '@wikimedia/codex-icons';

const menuItems = [
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
