<template>
	<div>
		<p class="cdx-docs-demo-text">
			Selected value: {{ selection }}
		</p>

		<cdx-combobox
			v-model:selected="selection"
			:menu-items="menuItems"
			placeholder="Type or choose an option"
			:start-icon="icon"
			:clearable="true"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxCombobox, MenuItemData } from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';

const menuItems: MenuItemData[] = [
	{ label: 'a', value: 'a' },
	{ label: 'b', value: 'b' },
	{ label: 'c', value: 'c' }
];

export default defineComponent( {
	name: 'ComboBoxClearableStartIcon',
	components: { CdxCombobox },

	data() {
		return {
			menuItems,
			selection: '',
			icon: cdxIconSearch
		};
	}
} );
</script>
