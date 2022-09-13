<template>
	<div class="cdx-docs-input-with-menu-and-footer">
		<cdx-text-input
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-and-footer__input"
			:aria-expanded="expanded"
			@click="onClick"
			@blur="expanded = false"
			@keydown="onKeydown"
		/>
		<cdx-menu
			ref="menu"
			v-model:selected="selectedValue"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			:visible-item-limit="itemLimit ? parseInt( `${itemLimit}` ) : null"
		>
			<template #default="{ menuItem }">
				{{ menuItem.label }} (value: {{ menuItem.value }})
			</template>
		</cdx-menu>
		<div class="cdx-docs-input-with-menu-and-footer__items">
			<label for="cdx-docs-input-with-menu-and-footer__items-input">
				Number of visible items in Menu (empty or 0 for show all):
			</label>
			<!-- TBD this may have to be replaced by number input once it exists in codex -->
			<cdx-text-input
				id="cdx-docs-input-with-menu-and-footer__items-input"
				v-model="itemLimit"
				class="cdx-docs-input-with-menu-and-footer__items__input"
				type="number"
			/>
		</div>
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
		const itemLimit = ref<number|string>( '' );

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
			itemLimit,
			onKeydown,
			onClick
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-input-with-menu-and-footer {
	// The Menu component is absolutely positioned, so we need `position: relative` here to
	// position the menu relative to this div. This ensure the menu will align with the input.
	position: relative;

	//TODO(T308124): Use existing ".element-with-menu" mixin when available withi the codex build
	&__input [ aria-expanded='true' ] {
		border-bottom-left-radius: @border-radius-sharp;
		border-bottom-right-radius: @border-radius-sharp;
	}

	&__items {
		display: flex;
		align-items: flex-end;
		flex-direction: row;

		&__input {
			width: 2em;
			margin: 8px 8px 0;
		}
	}
}
</style>
