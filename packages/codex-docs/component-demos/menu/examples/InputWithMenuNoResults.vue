<template>
	<div class="cdx-docs-input-with-menu-no-results">
		<cdx-text-input
			v-model="selectedValue"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		>
			<template #no-results>
				No results found
			</template>
		</cdx-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxMenu, CdxTextInput, MenuItemData } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuNoResults',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const selectedValue = ref<string|number>( '' );
		const expanded = ref( false );
		const menuItems: MenuItemData[] = [];

		function onKeydown( e: KeyboardEvent ) {
			// Delegate key events to the menu
			menu.value?.delegateKeyNavigation( e );
		}

		function onClick(): void {
			expanded.value = true;
		}

		return {
			menu,
			selectedValue,
			expanded,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
.cdx-docs-input-with-menu-no-results {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensure the menu will align with the input.
	position: relative;
}
</style>
