<template>
	<section id="cdx-multiselect-lookup">
		<h2>MultiselectLookup</h2>
		<cdx-multiselect-lookup
			v-model:input-chips="chips"
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="MultiselectLookup demo"
			@input="onInput"
		/>
		<p class="cdx-docs-demo-text">
			Selected value(s): {{ selection }}
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ChipInputItem, MenuItemData, MenuItemValue, MenuConfig, CdxMultiselectLookup } from '../lib';
import vegetableItems from 'codex-docs/component-demos/lookup/examples/data.json';

const chips = ref<ChipInputItem[]>( [] );
const selection = ref<MenuItemValue[]>( [] );
const menuItems = ref<MenuItemData[]>( [] );

const menuConfig: MenuConfig = {
	boldLabel: true
};

function onInput( value: string ) {
	if ( value ) {
		menuItems.value = vegetableItems.filter( ( item ) => item.label.includes( value ) );
	}
}
</script>
