<template>
	<section id="cdx-menu-item">
		<h2>Menu Item</h2>
		<cdx-menu-item
			v-bind="menuItem"
		/>
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
