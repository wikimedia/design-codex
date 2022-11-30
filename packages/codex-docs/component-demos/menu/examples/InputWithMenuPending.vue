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
			:menu-items="[]"
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
	name: 'InputWithMenuPending',
	components: {
		CdxMenu,
		CdxTextInput
	},
	setup() {
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const selectedValue = ref<string|number>( '' );
		const expanded = ref( false );

		function onKeydown( e: KeyboardEvent ) {
			// Delegate key events to the menu
			menu.value?.delegateKeyNavigation( e );
		}

		return {
			menu,
			selectedValue,
			expanded,
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
