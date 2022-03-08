<template>
	<div>
		<cdx-lookup
			v-model="selection"
			class="cdx-docs-lookup-custom-menu-item"
			:menu-items="menuItems"
			@new-input="onInput"
		>
			<template #menu-item="{ menuItem }">
				<p class="cdx-docs-lookup-custom-menu-item__label">
					{{ menuItem.label || menuItem.value }}
				</p>
				<p
					v-if="menuItem.description"
					class="cdx-docs-lookup-custom-menu-item__description"
				>
					{{ menuItem.description }}
				</p>
			</template>
		</cdx-lookup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxLookup, MenuItemData } from '@wikimedia/codex';
import vegetableItems from './data';

export default defineComponent( {
	name: 'LookupCustomMenuItem',
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
			onInput
		};
	}
} );
</script>

<style lang="less" scoped>
.cdx-docs-lookup-custom-menu-item {
	p {
		margin: 0;
	}

	&__label {
		font-weight: bold;
	}

	&__description {
		font-size: 0.875em;
		line-height: 1.25;
	}
}
</style>
