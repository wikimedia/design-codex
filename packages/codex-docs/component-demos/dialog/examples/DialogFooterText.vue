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

		<template #footer-text>
			Optional dialog footer text can <a href="#">contain links</a>
			and <strong>basic formatting</strong>,
			<em>but other content should not be used here.</em>
		</template>
	</cdx-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import {
	CdxButton,
	CdxDialog,
	PrimaryDialogAction,
	DialogAction
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogFooterText',
	components: {
		CdxButton,
		CdxDialog
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
			onPrimaryAction
		};
	}
} );
</script>
