<template>
	<div class="cdx-docs-message-user-dismiss">
		<cdx-message dismiss-button-label="Close">
			Notice message with dismiss button
		</cdx-message>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import { CdxMessage } from '@wikimedia/codex';

export default defineComponent( {
	name: 'MessageUserDismiss',
	components: { CdxMessage }
} );
</script>

<style lang="less">
.cdx-docs-message-user-dismiss {
	// Keep the wrapper `div` form shrinking after dismissing the message to prevent reflow.
	/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
	min-height: 64px;
}
</style>
