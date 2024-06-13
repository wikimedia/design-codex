<template>
	<div class="cdx-docs-multiselect-menu">
		<cdx-chip-input
			ref="chipInput"
			v-model:input-chips="chips"
			class="cdx-docs-multiselect-menu__input"
			role="combobox"
			:aria-expanded="expanded"
			:aria-controls="menuId"
			:aria-activedescendant="activeDescendant"
			remove-button-label="Remove"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
			@update:input-chips="handleChipChange"
		/>
		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			@update:selected="handleSelection"
		/>
	</div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxMenu, CdxChipInput, useGeneratedId, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MultiselectMenu',
	components: {
		CdxChipInput,
		CdxMenu
	},
	setup() {
		const chipInput = ref();
		const menu = ref();
		useFloatingMenu( chipInput, menu );

		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useGeneratedId( 'menu' );

		const menuItems = [
			{ value: 'red' },
			{ value: 'orange' },
			{ value: 'yellow' },
			{ value: 'green' },
			{ value: 'blue' },
			{ value: 'indigo' },
			{ value: 'violet' }
		];

		const chips = ref( [] );
		const selectedValue = ref( [] );

		function handleChipChange( newChips ) {
			selectedValue.value = newChips.map( ( chip ) => chip.value );
		}

		function handleSelection( newSelected ) {
			chips.value = newSelected.map( ( value ) => {
				return { value };
			} );
		}

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
			chipInput,
			menu,
			expanded,
			activeDescendant,
			menuId,
			menuItems,
			chips,
			selectedValue,
			handleChipChange,
			handleSelection,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-multiselect-menu {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensures the menu will align with the input.
	position: relative;
}
</style>
