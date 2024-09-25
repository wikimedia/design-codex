<template>
	<section id="cdx-lookup-multiselect">
		<h2>LookupMultiselect</h2>
		<cdx-lookup-multiselect
			v-model:input-chips="chips"
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="LookupMultiselect demo"
			@input="onInput"
		/>
		<p class="cdx-docs-demo-text">
			Selected value(s): {{ selection }}
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ChipInputItem, MenuItemData, MenuItemValue, MenuConfig } from '../lib';
// eslint-disable-next-line no-restricted-imports
import { CdxLookupMultiselect } from '../components-wip/index';
import vegetableItems from 'codex-docs/component-demos/lookup/examples/data.json';

const chips = ref<ChipInputItem[]>( [] );
const selection = ref<MenuItemValue[]>( [] );
const menuItems = ref<MenuItemData[]>( [] );

const menuConfig: MenuConfig = {
	boldLabel: true
};

function onInput( value: string ) {
	if ( value ) {
		menuItems.value = vegetableItems.filter( ( item ) =>
			item.label.includes( value )
		);
	}
}
</script>
