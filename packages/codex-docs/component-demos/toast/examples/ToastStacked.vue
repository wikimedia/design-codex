<template>
	<div class="cdx-docs-toast-stacked">
		<div class="cdx-docs-toast-stacked__buttons">
			<cdx-button :disabled="showToast1" @click="showToast1 = true">
				Show first toast
			</cdx-button>
			<cdx-button :disabled="showToast2" @click="showToast2 = true">
				Show second toast
			</cdx-button>
			<cdx-button :disabled="showToast3" @click="showToast3 = true">
				Show standalone toast
			</cdx-button>
		</div>
		<cdx-toast
			v-if="showToast1"
			type="success"
			:auto-dismiss="true"
			@user-dismissed="showToast1 = false"
			@auto-dismissed="showToast1 = false"
		>
			First toast inline rendered
		</cdx-toast>
		<cdx-toast
			v-if="showToast2"
			type="notice"
			:auto-dismiss="true"
			@user-dismissed="showToast2 = false"
			@auto-dismissed="showToast2 = false"
		>
			Second toast inline rendered
		</cdx-toast>
		<cdx-toast
			v-if="showToast3"
			type="notice"
			standalone
			render-in-place
			:auto-dismiss="false"
			@user-dismissed="showToast3 = false"
			@auto-dismissed="showToast3 = false"
		>
			Standalone toast
		</cdx-toast>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxToast, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'ToastStacked',
	components: { CdxToast, CdxButton },
	data() {
		return {
			showToast1: false,
			showToast2: false,
			showToast3: false
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-toast-stacked {
	&__buttons {
		display: flex;
		gap: @spacing-50;
		margin-bottom: @spacing-100;
	}
}
</style>
