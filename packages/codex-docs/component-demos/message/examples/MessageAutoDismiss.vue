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
.cdx-docs-message-auto-dismiss {
	min-height: 112px;

	// stylelint-disable-next-line selector-class-pattern
	.cdx-button {
		margin-bottom: 16px;
	}
}
</style>
