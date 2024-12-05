<template>
	<ul class="cdx-demo-best-practices">
		<slot />
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * List of best practices.
 */
export default defineComponent( {
	name: 'CdxDemoBestPractices'
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-demo-best-practices {
	// Override VitePress styles.
	/* stylelint-disable-next-line selector-class-pattern */
	.vp-doc ul& {
		margin-top: @spacing-25;
		padding: 0;
	}

	.cdx-demo-best-practice:not( :first-child ) {
		margin-top: @spacing-50;
	}
}
</style>
