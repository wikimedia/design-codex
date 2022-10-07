<template>
	<div class="cdx-docs-message-fade-in">
		<cdx-button :disabled="showMessage" @click="showMessage = true">
			Show message
		</cdx-button>
		<cdx-message
			v-if="showMessage"
			type="warning"
			:fade-in="true"
		>
			<p><strong>Warning!</strong> Here's some information you should know.</p>
		</cdx-message>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { CdxMessage, CdxButton } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MessageFadeIn',
	components: { CdxMessage, CdxButton },
	data() {
		return {
			showMessage: false
		};
	}
} );
</script>

<style lang="less" scoped>
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-docs-message-fade-in {
	min-height: 130px;

	/* stylelint-disable-next-line selector-class-pattern */
	.cdx-message {
		margin-top: @spacing-100;
	}
}
</style>
