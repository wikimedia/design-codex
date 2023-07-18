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

<script>
import { defineComponent } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';
import { cdxIconSearch } from '@wikimedia/codex-icons';

const menuItems = [
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
