<template>
	<cdx-button @click="open = true">
		Open Dialog
	</cdx-button>

	<client-only>
		<cdx-dialog
			v-model:open="open"
			title="Save changes"
			:use-close-button="true"
			:primary-action="primaryAction"
			:default-action="defaultAction"
			@primary="onPrimaryAction"
			@default="open = false"
		>
			<p>Do you want to save your changes?</p>

			<template #footer-text>
				You are not signed in. If you <a href="#">log in</a> or
				<a href="#">create an account</a>, your edits will be attributed to a username.
			</template>
		</cdx-dialog>
	</client-only>
</template>

<script>
import { defineComponent, ref } from 'vue';

import {
	CdxButton,
	CdxDialog
} from '@wikimedia/codex';

export default defineComponent( {
	name: 'DialogBasic',
	components: {
		CdxButton,
		CdxDialog
	},
	setup() {
		const open = ref( false );

		const primaryAction = {
			label: 'Save',
			actionType: 'progressive'
		};

		const defaultAction = {
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
