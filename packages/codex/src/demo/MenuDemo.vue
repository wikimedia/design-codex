<template>
	<section id="cdx-menu">
		<h2>Menu</h2>
		<div class="cdx-docs-input-with-menu">
			<cdx-text-input
				ref="input"
				v-model="selectedValue"
				class="cdx-docs-input-with-menu__input"
				role="combobox"
				:aria-expanded="expanded"
				@click="expanded = true"
				@blur="expanded = false"
				@keydown="onKeydown"
			/>
			<cdx-menu
				ref="menu"
				v-model:selected="selectedValue"
				v-model:expanded="expanded"
				:menu-items="menuItems"
				:visible-item-limit="visibleItemLimit || null"
			/>
			<label for="cdx-menu-limit-items-input">
				Number of visible items in Menu (empty or 0 for show all):
			</label>
			<input
				id="cdx-menu-limit-items-input"
				v-model="visibleItemLimit"
				type="number"
			>
		</div>

		<h3>With menu groups</h3>
		<p>This menu has the following groups/items:</p>
		<ol>
			<li>A group of 3 items with a description and icon (items 1-3)</li>
			<li>An individual menu item (item 4)</li>
			<li>A group of 2 items with a description (items 5-6)</li>
			<li>A group of 2 items (items 7-8)</li>
			<li>2 individual menu items (item 9-10)</li>
			<li>A group of 2 items with a hidden label (items 11-12)</li>
			<li>A group of 2 items with a hidden label (items 13-14)</li>
		</ol>
		<div class="cdx-docs-input-with-menu">
			<cdx-text-input
				ref="inputWithGroups"
				v-model="selectedValue"
				class="cdx-docs-input-with-menu__input"
				role="combobox"
				:aria-expanded="expandedWithGroups"
				@click="expandedWithGroups = true"
				@blur="expandedWithGroups = false"
				@keydown="onKeydownWithGroups"
			/>
			<cdx-menu
				ref="menuWithGroups"
				v-model:selected="selectedWithGroups"
				v-model:expanded="expandedWithGroups"
				:menu-items="menuItemsWithGroups"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { Ref, ComponentPublicInstance, ref } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '../lib';
import { cdxIconGlobe } from '@wikimedia/codex-icons';

const menu = ref<InstanceType<typeof CdxMenu>>();
const input = ref<InstanceType<typeof CdxTextInput>>();
useFloatingMenu( input as Ref<ComponentPublicInstance>, menu );

const selectedValue = ref<string|number>( '' );
const expanded = ref( false );
const menuItems = [
	{ label: 'One', value: '1' },
	{ label: 'Two', value: '2', disabled: true },
	{ label: 'Three', value: '3' },
	{ label: 'Four', value: '4' }
];

function onKeydown( e: KeyboardEvent ) {
	// Delegate key events to the menu
	menu.value?.delegateKeyNavigation( e );
}
const visibleItemLimit = ref<number|''>( '' );

const menuWithGroups = ref<InstanceType<typeof CdxMenu>>();
const inputWithGroups = ref<InstanceType<typeof CdxTextInput>>();
useFloatingMenu( inputWithGroups as Ref<ComponentPublicInstance>, menuWithGroups );

const selectedWithGroups = ref<string|number>( '' );
const expandedWithGroups = ref( false );
const menuItemsWithGroups = [
	{
		label: 'Group A',
		description: 'Description for group A',
		icon: cdxIconGlobe,
		items: [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2', disabled: true },
			{ label: 'Three', value: '3' }
		]
	},
	{ label: 'Four', value: '4' },
	{
		label: 'Group B',
		description: 'Description for group B',
		items: [
			{ label: 'Five', value: '5' },
			{ label: 'Six', value: '6' }
		]
	},
	{
		label: 'Group C',
		items: [
			{ label: 'Seven', value: '7' },
			{ label: 'Eight', value: '8' }
		]
	},
	{ label: 'Nine', value: '9' },
	{ label: 'Ten', value: '10' },
	{
		label: 'Group D',
		hideLabel: true,
		items: [
			{ label: 'Eleven', value: '11' },
			{ label: 'Twelve', value: '12' }
		]
	},
	{
		label: 'Group E',
		hideLabel: true,
		items: [
			{ label: 'Thirteen', value: '13' },
			{ label: 'Fourteen', value: '14' }
		]
	}
];
function onKeydownWithGroups( e: KeyboardEvent ) {
	// Delegate key events to the menu
	menuWithGroups.value?.delegateKeyNavigation( e );
}
</script>
