<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" search-query="felis margarita" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
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
