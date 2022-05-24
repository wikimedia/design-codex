<template>
	<div>
		<cdx-combobox
			v-model:selected="selection"
			:menu-items="menuItems"
			:disabled="true"
			placeholder="Type or choose an option"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox, MenuItemData } from '@wikimedia/codex';

const menuItems: MenuItemData[] = [
	{ label: 'a', value: 'a' },
	{ label: 'b', value: 'b' },
	{ label: 'c', value: 'c' }
];

export default defineComponent( {
	name: 'ComboBoxDisabled',
	components: { CdxCombobox },

	data() {
		return {
			menuItems,
			selection: ''
		};
	}
} );
</script>
