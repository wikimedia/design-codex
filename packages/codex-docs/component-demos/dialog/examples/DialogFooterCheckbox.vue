<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<cdx-dialog
		v-model:open="open"
		title="Save changes"
		close-button-label="Close"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@primary="onPrimaryAction"
		@default="open = false"
	>
		<p>Do you want to save your changes?</p>

		<template #footer-optional>
			<cdx-checkbox
				v-model="optionalDialogCheckboxState"
				:inline="true"
			>
				Don't show again
			</cdx-checkbox>
		</template>
	</cdx-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import {
	CdxButton,
	CdxDialog,
	CdxCheckbox,
	PrimaryDialogAction,
	DialogAction
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogFooterCheckbox',
	components: {
		CdxButton,
		CdxDialog,
		CdxCheckbox
	},
	setup() {
		const open = ref( false );

		const primaryAction: PrimaryDialogAction = {
			label: 'Save',
			actionType: 'progressive'
		};

		const defaultAction: DialogAction = {
			label: 'Cancel'
		};

		function onPrimaryAction() {
			open.value = false;
			// eslint-disable-next-line no-console
			console.log( 'Primary action taken' );
		}

		const optionalDialogCheckboxState = ref( false );

		return {
			open,
			primaryAction,
			defaultAction,
			onPrimaryAction,
			optionalDialogCheckboxState
		};
	}
} );
</script>
