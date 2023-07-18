<template>
	<cdx-menu-item
		v-bind="menuItem"
		:bold-label="true"
	/>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
	value: 5921,
	label: 'Color',
	description: 'visual perception of light wavelengths',
	id: 'menu-item-with-description'
};

export default defineComponent( {
	name: 'MenuItemWithDescription',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
