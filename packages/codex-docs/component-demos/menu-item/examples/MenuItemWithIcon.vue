<template>
	<ul role="listbox">
		<cdx-menu-item v-bind="menuItem" />
	</ul>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMenuItem } from '@wikimedia/codex';
import { cdxIconTag } from '@wikimedia/codex-icons';

const menuItem = {
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
