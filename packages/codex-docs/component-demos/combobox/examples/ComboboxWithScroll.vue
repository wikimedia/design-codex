<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';

const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' },
	{ label: 'Four', value: '4' },
	{ label: 'Five', value: '5' },
	{ label: 'Six', value: '6' },
	{ label: 'Seven', value: '7' },
	{ label: 'Eight', value: '8' },
	{ label: 'Nine', value: '9' },
	{ label: 'Ten', value: '10' },
	{ label: 'Eleven', value: '11' },
	{ label: 'Twelve', value: '12' }
];

export default defineComponent( {
	name: 'ComboboxWithScroll',
	components: { CdxCombobox },

	data() {
		return {
			menuConfig: {
				visibleItemLimit: 6
			},
			menuItems,
			selection: ''
		};
	}
} );
</script>
