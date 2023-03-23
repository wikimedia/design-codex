<template>
	<div class="cdx-text-area">
		<textarea />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Multi-line text input that allows manual resizing.
 */
export default defineComponent( {
	name: 'CdxTextArea'
} );
</script>

<style lang="less">
	@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

	/* stylelint-disable-next-line block-no-empty */
	.cdx-text-area {}
</style>
