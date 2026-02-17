<template>
	<div class="cdx-docs-toast-with-action">
		<cdx-button :disabled="showToast" @click="showToast = true">
			Show toast
		</cdx-button>
		<cdx-toast
			v-if="showToast"
			type="notice"
			action-button-label="Undo"
			:auto-dismiss="false"
			@user-dismissed="showToast = false"
			@auto-dismissed="showToast = false"
			@action-button-click="handleUndo"
		>
			Changes saved
		</cdx-toast>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxToast, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToastWithAction',
	components: { CdxToast, CdxButton },
	data() {
		return {
			showToast: false
		};
	},
	methods: {
		handleUndo() {
			// eslint-disable-next-line no-console
			console.log( 'Undo action' );
			this.showToast = false;
		}
	}
} );
</script>
