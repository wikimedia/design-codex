<template>
	<div>
		<cdx-combobox
			v-model:selected="selection"
			:menu-items="menuItems"
			placeholder="Type or choose an option"
		>
			<template #no-results>
				Sorry, no options to display.
			</template>
		</cdx-combobox>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxCombobox } from '@wikimedia/codex';

const menuItems = [];

export default defineComponent( {
	name: 'ComboboxNoResults',
	components: { CdxCombobox },

	data() {
		return {
			menuItems,
			selection: ''
		};
	}
} );
</script>
