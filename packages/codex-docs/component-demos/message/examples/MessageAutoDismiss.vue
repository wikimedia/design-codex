<template>
	<div class="cdx-docs-message-auto-dismiss">
		<cdx-button :disabled="showMessage" @click="showMessage = true">
			Show message
		</cdx-button>
		<cdx-message
			v-if="showMessage"
			type="success"
			:fade-in="true"
			:auto-dismiss="true"
			:display-time="3000"
		>
			Success! This message will disappear...
		</cdx-message>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMessage, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MessageAutoDismiss',
	components: { CdxMessage, CdxButton },
	data() {
		return {
			showMessage: false
		};
	}
} );
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-message-auto-dismiss {
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	min-height: 128px;

	.cdx-button {
		margin-bottom: @spacing-100;
	}
}
</style>
