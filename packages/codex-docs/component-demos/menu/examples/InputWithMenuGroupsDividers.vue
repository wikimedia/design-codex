<template>
	<div class="cdx-docs-input-with-menu-groups">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, computed, useId } from 'vue';
import { CdxMenu, CdxTextInput, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuGroupsDividers',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menuItems = [
			{
				label: 'Group A',
				hideLabel: true,
				items: [
					{ label: 'One', value: '1' },
					{ label: 'Two', value: '2', disabled: true },
					{ label: 'Three', value: '3' }
				]
			},
			{
				label: 'Group B',
				hideLabel: true,
				items: [
					{ label: 'Four', value: '4' },
					{ label: 'Five', value: '5' },
					{ label: 'Six', value: '6' },
					{ label: 'Seven', value: '7' }
				]
			}
		];

		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useId();

		useFloatingMenu( input, menu );

		/**
		 * Delegate most keydowns on the text input to the Menu component. This
		 * allows the Menu component to enable keyboard navigation of the menu.
		 *
		 * @param {KeyboardEvent} e The keyboard event
		 */
		function onKeydown( e ) {
			// The menu component enables the space key to open and close the
			// menu. However, for text inputs with menus, the space key should
			// always insert a new space character in the input.
			if ( e.key === ' ' ) {
				return;
			}

			// Delegate all other key events to the Menu component.
			if ( menu.value ) {
				menu.value.delegateKeyNavigation( e );
			}
		}

		function onClick() {
			expanded.value = true;
		}

		return {
			input,
			menu,
			selectedValue,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-groups {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
