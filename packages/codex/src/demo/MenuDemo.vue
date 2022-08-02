<template>
	<section id="cdx-menu">
		<h2>Menu</h2>
		<div class="cdx-docs-input-with-menu">
			<cdx-text-input
				v-model="selectedValue"
				class="cdx-docs-input-with-menu__input"
				:aria-expanded="expanded"
				@click="onClick"
				@blur="expanded = false"
				@keydown="onKeydown"
			/>
			<cdx-menu
				ref="menu"
				v-model:selected="selectedValue"
				v-model:expanded="expanded"
				:menu-items="menuItems"
			/>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxMenu, CdxTextInput } from '../lib';
const menu = ref<InstanceType<typeof CdxMenu>>();
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

function onClick(): void {
	expanded.value = true;
}
</script>
