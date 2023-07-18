<template>
	<cdx-field>
		<cdx-combobox
			v-model:selected="selection"
			:menu-items="menuItems"
		/>
		<template #label>
			Input type
		</template>
		<template #description>
			What kind of data does the function accept?
		</template>
		<template #help-text>
			Choose a type from the menu or enter a custom type.
		</template>
	</cdx-field>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxCombobox, CdxField } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ComboboxField',
	components: { CdxCombobox, CdxField },
	setup() {
		const selection = ref( '' );
		const menuItems = [
			{ value: 'boolean' },
			{ value: 'function' },
			{ value: 'object' },
			{ value: 'string' }
		];

		return {
			selection,
			menuItems
		};
	}
} );
</script>
