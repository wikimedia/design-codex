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
	.cdx-demo-best-practice:not( :first-child ) {
		margin-top: @spacing-50;
	}
}

// Override VitePress styles. Put these styles in a separate block because we need parent selectors
// like vp-doc and the heading levels, and using the & selector gets complicated.
/* stylelint-disable-next-line selector-class-pattern */
.vp-doc {
	ul.cdx-demo-best-practices {
		margin-top: @spacing-25;
		padding: 0;
	}

	h2,
	h3,
	h4,
	h5,
	h6 {
		+ .cdx-demo-best-practices {
			// Add the same margin that `<p>` and `<ul>` elements have to ensure there's
			// space when this comes right after a heading.
			margin-top: @spacing-100;
		}
	}
}

</style>
