<template>
	<div class="cdx-docs-toast-basic">
		<cdx-button :disabled="showToast" @click="showToast = true">
			Show toast
		</cdx-button>
		<cdx-toast
			v-if="showToast"
			type="success"
			:auto-dismiss="true"
			@user-dismissed="showToast = false"
			@auto-dismissed="showToast = false"
		>
			Article published successfully
		</cdx-toast>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxToast, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToastBasic',
	components: { CdxToast, CdxButton },
	data() {
		return {
			showToast: false
		};
	}
} );
</script>
