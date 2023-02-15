<template>
	<div>
		<cdx-lookup
			v-model:selected="selection"
			:menu-items="menuItems"
			aria-label="Lookup with placeholder"
			placeholder="Start typing a vegetable name..."
			@input="onInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuItemData } from '@wikimedia/codex';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupWithPlaceholder',
	components: { CdxLookup },
	setup() {
		const selection = ref<string|null>( null );
		const menuItems = ref<MenuItemData[]>( [] );

		function onInput( value: string ) {
			if ( value ) {
				menuItems.value = vegetableItems.filter( ( item ) =>
					item.label.includes( value )
				);
			}
		}

		return {
			selection,
			menuItems,
			onInput
		};
	}
} );
</script>
