<template>
	<section id="cdx-lookup">
		<h2>Lookup</h2>
		<cdx-lookup
			v-model:selected="selection"
			v-model:input-value="inputValue"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			aria-label="Lookup demo"
			@input="onInput"
			@update:input-value="onUpdateInputValue"
			@update:selected="onUpdateSelected"
		/>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>
	</section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CdxLookup, MenuItemData, MenuConfig } from '../lib';
import vegetableItems from 'codex-docs/component-demos/lookup/examples/data.json';

const inputValue = ref( '' );
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

		// eslint-disable-next-line no-console
		console.log( `@input: ${ value }` );
	}
}

function onUpdateInputValue( value: string ) {
	if ( value ) {
		// eslint-disable-next-line no-console
		console.log( `@input-value: ${ value }` );
	}
}

function onUpdateSelected( value: string ) {
	if ( value ) {
		// eslint-disable-next-line no-console
		console.log( `@update:selected: ${ value }` );
	}
}
</script>
