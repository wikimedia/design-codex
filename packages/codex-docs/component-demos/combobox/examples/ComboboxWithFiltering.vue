<template>
	<cdx-combobox
		v-model:selected="selection"
		:menu-items="menuItems"
		:menu-config="menuConfig"
		class="cdx-demo-combobox-with-filtering"
		aria-label="Favorite vegetable"
		placeholder="Enter a vegetable"
		@input="onInput"
	>
		<template #no-results>
			No results found.
		</template>
	</cdx-combobox>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';
import vegetableItems from './data.json';

export default defineComponent( {
	name: 'ComboboxWithFiltering',
	components: { CdxCombobox },
	setup() {
		const selection = ref( '' );
		const menuItems = ref( vegetableItems );

		const menuConfig = {
			boldLabel: true,
			visibleItemLimit: 6
		};

		/**
		 * Filter items on input.
		 *
		 * @param {InputEvent} event
		 */
		function onInput( event ) {
			if ( event.target ) {
				// If there's a value in the input, set menu items to matching items.
				menuItems.value = vegetableItems.filter( ( item ) => item.value.includes(
					event.target.value
				) );
			} else {
				// Otherwise, reset menu items to include all items.
				menuItems.value = vegetableItems;
			}
		}

		return {
			selection,
			menuItems,
			menuConfig,
			onInput
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-combobox-with-filtering {
	min-width: @size-2800;
}
</style>
