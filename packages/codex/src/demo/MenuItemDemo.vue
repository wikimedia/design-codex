<template>
	<section id="cdx-menu-item">
		<h2>Menu Item</h2>
		<ul role="listbox">
			<cdx-menu-item v-bind="menuItem" />
		</ul>
	</section>
</template>

<script lang="ts" setup>
import { CdxMenuItem, MenuItemDataWithId } from '../lib';

const menuItem : MenuItemDataWithId = {
	value: 5921,
	label: 'Color',
	id: 'menu-item-default'
};
</script>
