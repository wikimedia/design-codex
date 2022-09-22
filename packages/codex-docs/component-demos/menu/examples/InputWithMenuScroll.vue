<template>
	<div class="cdx-docs-input-with-menu-scroll">
		<cdx-text-input
			v-model="selectedValue"
			class="cdx-docs-input-with-menu-scroll__input"
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxMenu, CdxTextInput } from '@wikimedia/codex';

export default defineComponent( {
	name: 'InputWithMenuScroll',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const selectedValue = ref( '' );
		const expanded = ref( false );
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
		align-items: flex-end;
		flex-direction: row;
		margin-top: 16px;

		&__input {
			width: 2em;
			margin-left: 8px;
		}
	}
}
</style>
