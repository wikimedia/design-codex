<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';

const menuItem = {
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
