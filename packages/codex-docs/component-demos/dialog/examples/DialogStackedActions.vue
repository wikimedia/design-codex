<template>
	<cdx-button @click="open = true">
		Open dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="Delete all changes?"
			:use-close-button="true"
			:stacked-actions="true"
			:primary-action="primaryAction"
			:default-action="defaultAction"
			@primary="onPrimaryAction"
			@default="open = false"
		/>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { CdxButton, CdxDialog } from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogStackedActions',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );

		const primaryAction = {
			label: 'Delete all changes and start over',
			actionType: 'destructive'
		};
		const defaultAction = {
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
