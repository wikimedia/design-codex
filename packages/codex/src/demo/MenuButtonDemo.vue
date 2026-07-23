<template>
	<section id="cdx-menu-button">
		<h2>Menu Button</h2>
		<div class="cdx-docs-menu-button">
			<cdx-menu-button
				v-model:selected="selected"
				:menu-items="menuItems"
				:menu-config="menuConfig"
				aria-label="Change option value"
			>
				<cdx-icon :icon="cdxIconEllipsis" />
			</cdx-menu-button>
			<p>
				Selected: {{ selected }}
			</p>
		</div>
		<h3>MenuButton with group and a footer</h3>
		<div class="cdx-docs-menu-button">
			<cdx-menu-button
				v-model:selected="selectedWithGroup"
				:menu-items="menuItemsWithGroup"
				:menu-config="menuConfig"
				:footer="footer"
				aria-label="Change option value"
			>
				<template #default>
					<cdx-icon :icon="cdxIconEllipsis" />
				</template>
				<template #menu-item="{ menuItem }">
					<!-- Custom template just for the footer item. -->
					<template v-if="menuItem.value === 'menu-footer'">
						Footer item with value: {{ menuItem.value }}
					</template>
				</template>
			</cdx-menu-button>
			<p>
				Selected: {{ selectedWithGroup }}
			</p>
		</div>
		<h3>MenuButton with multiselect</h3>
		<div class="cdx-docs-menu-button">
			<cdx-menu-button
				v-model:selected="selectedWithMulti"
				:menu-items="menuItemsWithMulti"
				aria-label="Change option value"
			>
				<template #default>
					<cdx-icon :icon="cdxIconEllipsis" />
				</template>
			</cdx-menu-button>
			<p>
				Selected: {{ selectedWithMulti }}
			</p>
		</div>
		<h3>MenuButton with load more</h3>
		<div class="cdx-docs-menu-button">
			<cdx-menu-button
				v-model:selected="selectedLoadMore"
				:menu-items="menuItemsLoadMore"
				:menu-config="menuConfigLoadMore"
				@load-more="onLoadMore"
			>
				Vegetables
			</cdx-menu-button>
			<p>
				Selected: {{ selectedLoadMore }}
			</p>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxMenuButton, CdxIcon } from '../lib-wip';
import { cdxIconEllipsis } from '@wikimedia/codex-icons';
import { MenuItemValue } from '../types';
import vegetableItems from 'codex-docs/component-demos/lookup/examples/data.json';

const selected = ref<string|number|null>( null );
const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2' },
	{ label: 'Three', value: '3' }
];
const menuConfig = {};

// MenuButton with group
const selectedWithGroup = ref<string|number|null>( null );
const menuItemsWithGroup = [
	{
		label: 'Group A',
		items: [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2', disabled: true },
			{ label: 'Three', value: '3' }
		]
	},
	{
		label: 'Group B',
		items: [
			{ label: 'Four', value: '4' },
			{ label: 'Five', value: '5' },
			{ label: 'Six', value: '6' },
			{ label: 'Seven', value: '7' }
		]
	}
];

// MenuButton with multiselect
const selectedWithMulti = ref<MenuItemValue[]>( [] );
const menuItemsWithMulti = [
	{ label: 'English', value: 'en' },
	{ label: 'Spanish', value: 'es' },
	{ label: 'French', value: 'fr' },
	{ label: 'German', value: 'de' },
	{ label: 'Russian', value: 'ru' }
];

const footer = ref( { label: 'Menu Footer', value: 'menu-footer' } );

// MenuButton with load more
const selectedLoadMore = ref<string|number|null>( null );
const batchSize = 4;
const menuItemsLoadMore = ref( vegetableItems.slice( 0, batchSize ) );
const menuItemsOffset = ref( batchSize );
const menuConfigLoadMore = {
	visibleItemLimit: batchSize
};

function onLoadMore() {
	const endIndex = menuItemsOffset.value + batchSize;
	menuItemsLoadMore.value = vegetableItems.slice( 0, endIndex );
	menuItemsOffset.value += batchSize;
}
</script>
