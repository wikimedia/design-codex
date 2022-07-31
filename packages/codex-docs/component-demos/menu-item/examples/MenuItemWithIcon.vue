<template>
	<cdx-menu-item
		v-bind="menuItem"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMenuItem, MenuItemDataWithId } from '@wikimedia/codex';
import { cdxIconTag } from '@wikimedia/codex-icons';

const menuItem : MenuItemDataWithId = {
	value: 5921,
	label: 'Color',
	description: 'visual perception of light wavelengths',
	icon: cdxIconTag,
	id: 'menu-item-with-icon'
};

export default defineComponent( {
	name: 'MenuItemWithIcon',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
