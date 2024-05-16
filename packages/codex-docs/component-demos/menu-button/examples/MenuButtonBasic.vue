<template>
	<cdx-menu-button
		v-model:selected="selection"
		:menu-items="menuItems"
		toggle-button-label="Open and close the menu"
	/>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxMenuButton } from '@wikimedia/codex';

const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' },
	{ label: 'Four', value: '4', action: 'destructive' },
	{ label: 'Five', value: '5', disabled: true }
];

export default defineComponent( {
	name: 'MenuButtonBasic',
	components: { CdxMenuButton },
	setup() {
		const selection = ref( null );
		return {
			selection,
			menuItems
		};
	}
} );
</script>
