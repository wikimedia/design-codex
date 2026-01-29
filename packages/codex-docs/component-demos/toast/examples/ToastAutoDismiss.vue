<template>
	<div class="cdx-docs-toast-auto-dismiss">
		<cdx-button :disabled="showToast" @click="showToast = true">
			Show toast
		</cdx-button>
		<cdx-toast
			v-if="showToast"
			type="success"
			:auto-dismiss="5000"
			@user-dismissed="showToast = false"
			@auto-dismissed="showToast = false"
		>
			Success! This toast will disappear in 5 seconds
		</cdx-toast>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxToast, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToastAutoDismiss',
	components: { CdxToast, CdxButton },
	data() {
		return {
			showToast: false
		};
	}
} );
</script>
