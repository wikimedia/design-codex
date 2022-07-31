<template>
	<cdx-menu-item
		v-bind="menuItem"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMenuItem, MenuItemDataWithId } from '@wikimedia/codex';

const menuItem : MenuItemDataWithId = {
	value: 5921,
	label: 'Color',
	id: 'menu-item-default'
};

export default defineComponent( {
	name: 'MenuItemDefault',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
