<template>
	<section id="cdx-lookup">
		<h2>Lookup</h2>
		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup demo"
			@input="onInput"
		/>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxLookup, MenuItemData, MenuConfig } from '../lib';
import vegetableItems from 'codex-docs/component-demos/lookup/examples/data';

const selection = ref<string|null>( null );
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
