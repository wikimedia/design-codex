<template>
	<div
		class="cdx-progress-bar"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

/**
 * Progress bar, currently only supports indeterminate type (i.e. the bar will scroll across the
 * width of the display and then reappear at the start, rather than reflecting a specific amount
 * of progress having been made).
 *
 * @author DannyS712
 */
export default defineComponent( {
	name: 'CdxProgressBar'
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-progress-bar {
	background-color: @background-color-base;
	box-sizing: @box-sizing-base;
	max-width: @max-width-base;
	border: @border-base;
	border-radius: @border-radius-round;
	box-shadow: @box-shadow-progress-bar;
	overflow-x: hidden;

	&__bar {
		background-color: @background-color-progressive;
		width: 40%;
		// Equals `1.14285714em`≈`16px`
		height: ( @size-base / 2 );
		animation: cdx-progress-bar__bar--slide 2s infinite linear;
	}
}

@keyframes cdx-progress-bar__bar--slide {
	from {
		transform: translate( -100% );
	}

	to {
		transform: translate( 350% );
	}
}
</style>
