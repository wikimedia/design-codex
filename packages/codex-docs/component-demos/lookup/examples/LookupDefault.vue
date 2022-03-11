<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-lookup
			v-model="selection"
			:menu-items="menuItems"
			:menu-config="menuConfig"
			@new-input="onInput"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuItemData, MenuConfig } from '@wikimedia/codex';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupDefault',
	components: { CdxLookup },
	setup() {
		const selection = ref( '' );
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

		return {
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>
