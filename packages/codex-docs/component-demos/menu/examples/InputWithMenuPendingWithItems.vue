<template>
	<div class="cdx-docs-input-with-menu-pending">
		<cdx-text-input
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-pending__input"
			:aria-expanded="expanded"
			@click="expanded = true"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			class="cdx-docs-menu-pending"
			:menu-items="menuItems"
			:show-pending="true"
		>
			<template #pending>
				Loading results...
			</template>
		</cdx-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxMenu, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuPendingWithItems',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const selectedValue = ref<string|number>( '' );
		const expanded = ref( false );
		const menuItems = [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2', disabled: true },
			{ label: 'Three', value: '3' },
			{ label: 'Four', value: '4' }
		];

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param e The keyboard event
		 */
		function onKeydown( e: KeyboardEvent ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			menu.value?.delegateKeyNavigation( e );
		}

		return {
			menu,
			selectedValue,
			expanded,
			menuItems,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-pending {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensure the menu will align with the input.
	position: relative;

	&__input [ aria-expanded='true' ] {
		border-bottom-left-radius: @border-radius-sharp;
		border-bottom-right-radius: @border-radius-sharp;
	}
}
</style>
