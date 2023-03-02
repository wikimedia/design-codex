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
			<cdx-button type="quiet" aria-label="settings">
				<cdx-icon :icon="cdxIconSettings" />
			</cdx-button>
		</template>
	</cdx-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import {
	CdxButton,
	CdxDialog,
	CdxIcon,
	PrimaryDialogAction,
	DialogAction
} from '@wikimedia/codex';

import { cdxIconSettings } from '@wikimedia/codex-icons';

export default defineComponent( {
	name: 'DialogFooterButton',
	components: {
		CdxButton,
		CdxDialog,
		CdxIcon
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

		return {
			open,
			primaryAction,
			defaultAction,
			onPrimaryAction,
			cdxIconSettings
		};
	}
} );
</script>
