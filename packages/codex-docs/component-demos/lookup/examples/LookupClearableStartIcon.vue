<template>
	<div>
		<cdx-lookup
			v-model="selection"
			:menu-items="menuItems"
			:clearable="true"
			:start-icon="cdxIconSearch"
			@new-input="onInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuItemData } from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupClearableStartIcon',
	components: { CdxLookup },
	setup() {
		const selection = ref( '' );
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
			onInput,
			cdxIconSearch
		};
	}
} );
</script>
