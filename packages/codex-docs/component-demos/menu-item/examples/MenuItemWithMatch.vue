<template>
	<cdx-menu-item
		v-bind="menuItem"
		search-query="felis margarita"
	/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMenuItem, MenuItemDataWithId } from '@wikimedia/codex';

const menuItem : MenuItemDataWithId = {
	value: 'Q175329',
	label: 'sand cat',
	match: '(Felis margarita)',
	description: 'species of the only cat living foremost in true deserts',
	id: 'menu-item-with-match'
};

export default defineComponent( {
	name: 'MenuItemWithMatch',
	components: { CdxMenuItem },
	setup() {
		return {
			menuItem
		};
	}
} );
</script>
