<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>
	<cdx-dialog
		v-model:open="open"
		title="Delete all changes?"
		close-button-label="Close"
		:stacked-actions="true"
		:primary-action="primaryAction"
		:default-action="defaultAction"
		@primary="onPrimaryAction"
		@default="open = false"
	/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog, PrimaryDialogAction, DialogAction } from '@wikimedia/codex';
export default defineComponent( {
	name: 'DialogStackedActions',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );
		const primaryAction: PrimaryDialogAction = {
			label: 'Delete all changes and start over',
			actionType: 'destructive'
		};
		const defaultAction: DialogAction = {
			label: 'Cancel'
		};
		function onPrimaryAction() {
			// eslint-disable-next-line no-console
			console.log( 'Primary action taken' );
			open.value = false;
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
