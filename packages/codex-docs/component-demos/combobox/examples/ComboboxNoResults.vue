<template>
	<div>
		<cdx-combobox
			v-model="selection"
			:menu-items="menuItems"
			placeholder="Type or choose an option"
		>
			<template v-if="menuItems.length < 1" #footer>
				Sorry, no options to display.
			</template>
		</cdx-combobox>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox, MenuItemData } from '@wikimedia/codex';

const menuItems: MenuItemData[] = [];

export default defineComponent( {
	name: 'ComboboxNoResults',
	components: { CdxCombobox },

	data() {
		return {
			menuItems,
			selection: ''
		};
	}
} );
</script>
