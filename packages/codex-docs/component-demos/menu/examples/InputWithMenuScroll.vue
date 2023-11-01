<template>
	<div class="cdx-docs-input-with-menu-scroll">
		<cdx-text-input
			ref="input"
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-scroll__input"
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
			:footer="footer"
			:visible-item-limit="itemLimit ? parseInt( `${itemLimit}` ) : null"
		/>
		<div class="cdx-docs-input-with-menu-scroll__items">
			<label for="cdx-docs-input-with-menu-scroll__items-input">
				Number of visible items in Menu (empty or 0 for show all):
			</label>
			<!-- TODO: replace with NumberInput once it exists. -->
			<cdx-text-input
				id="cdx-docs-input-with-menu-scroll__items-input"
				v-model="itemLimit"
				class="cdx-docs-input-with-menu-scroll__items__input"
				type="number"
			/>
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { CdxMenu, CdxTextInput, useGeneratedId, useFloatingMenu } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuScroll',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const input = ref();
		const menu = ref();
		const selectedValue = ref( '' );
		const expanded = ref( false );
		const activeDescendant = computed( () => {
			const highlightedItem = menu.value && menu.value.getHighlightedMenuItem();
			return highlightedItem ? highlightedItem.id : undefined;
		} );
		const menuId = useGeneratedId( 'menu' );
		const menuItems = [
			{ label: 'One', value: '1' },
			{ label: 'Two', value: '2' },
			{ label: 'Three', value: '3' },
			{ label: 'Four', value: '4' },
			{ label: 'Five', value: '5' },
			{ label: 'Six', value: '6' },
			{ label: 'Seven', value: '7' },
			{ label: 'Eight', value: '8' },
			{ label: 'Nine', value: '9' },
			{ label: 'Ten', value: '10' },
			{ label: 'Eleven', value: '11' },
			{ label: 'Twelve', value: '12' }
		];
		const itemLimit = ref( '6' );

		const footer = {
			value: 'menu-footer',
			label: 'Sticky footer item'
		};

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
			footer,
			itemLimit,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-scroll {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensure the menu will align with the input.
	position: relative;

	&__input [ aria-expanded='true' ] {
		border-bottom-left-radius: @border-radius-sharp;
		border-bottom-right-radius: @border-radius-sharp;
	}

	&__items {
		display: flex;
		align-items: center;
		flex-direction: row;
		margin-top: @spacing-100;

		&__input {
			margin-left: @spacing-50;

			input {
				min-width: @size-250;
				width: @size-250;
			}
		}
	}
}
</style>
