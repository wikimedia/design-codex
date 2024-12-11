<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';

const menuItems = [
	{ label: 'a', value: 'a' },
	{ label: 'b', value: 'b' },
	{ label: 'c', value: 'c' }
];

export default defineComponent( {
	name: 'ComboBoxConfigurable',
	components: { CdxCombobox },

	data() {
		return {
			menuItems,
			selection: ''
		};
	}
} );
</script>
