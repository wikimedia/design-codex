<template>
	<div class="cdx-docs-input-with-menu-and-footer">
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
			<template #default="{ menuItem }">
				{{ menuItem.label }} (value: {{ menuItem.value }})
			</template>
		</cdx-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxMenu, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuCustomItemDisplay',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const selectedValue = ref<string|number>( '' );
		const expanded = ref( false );
		const menuItems = [
			{ label: 'One', value: 1 },
			{ label: 'Two', value: 2, disabled: true },
			{ label: 'Three', value: 3 },
			{ label: 'Four', value: 4 }
		];

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
.cdx-docs-input-with-menu-and-footer {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensure the menu will align with the input.
	position: relative;
}
</style>
