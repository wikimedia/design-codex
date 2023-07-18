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

<script>
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

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-docs-message-fade-in {
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	min-height: 128px;

	.cdx-message {
		margin-top: @spacing-100;
	}
}
</style>
