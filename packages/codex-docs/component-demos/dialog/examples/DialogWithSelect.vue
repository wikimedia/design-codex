<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="Dialog with expandable menus"
			:use-close-button="true"
			:default-action="defaultAction"
			@default="open = false"
		>
			<cdx-select
				v-model:selected="selected"
				:menu-items="menuItems"
				default-label="Select an option with a really really really long title"
			/>

			<br>
			<br>

			<cdx-combobox
				v-model:selected="inputValue"
				:menu-items="menuItems"
				default-label="Select an option with a really really really long title"
			/>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, CdxSelect, CdxCombobox } from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogWithSelect',
	components: {
		CdxButton,
		CdxDialog,
		CdxSelect,
		CdxCombobox
	},
	setup() {
		const open = ref( false );

		const defaultAction = {
			label: 'Close'
		};
		const menuItems = [
			{ label: 'Option A', value: 'a' },
			{ label: 'Option B', value: 'b' },
			{ label: 'Option C', value: 'c' },
			{ label: 'Option D', value: 'd' }
		];
		const selected = ref( null );
		const inputValue = ref( 'a' );
		return {
			open,
			defaultAction,
			menuItems,
			selected,
			inputValue
		};
	}
} );
</script>
