<template>
	<div
		class="cdx-progress-bar"
		:class="rootClasses"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

/**
 * Visual progress indicator bar.
 *
 * Currently only supports indeterminate type (i.e. the bar will scroll across the width of the
 * display and then reappear at the start, rather than reflecting a specific amount of progress
 * having been made).
 *
 * A smaller, inline version is available for use within other components, e.g. a menu or dialog.
 *
 * @author DannyS712
 */
export default defineComponent( {
	name: 'CdxProgressBar',
	props: {
		/**
		 * Whether this is the smaller, inline variant.
		 */
		inline: {
			type: Boolean,
			default: false
		}
	},
	setup( props ) {
		const rootClasses = computed( () => {
			return {
				'cdx-progress-bar--block': !props.inline,
				'cdx-progress-bar--inline': props.inline
			};
		} );

		return {
			rootClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

.cdx-progress-bar {
	box-sizing: @box-sizing-base;
	overflow-x: hidden;

	&__bar {
		background-color: @background-color-progressive;
		// TODO: replace with token.
		width: 33%;
		height: 100%;
		animation: cdx-progress-bar__bar--slide 1.6s infinite linear;
	}

	&--block {
		background-color: @background-color-base;
		// Equals `1.14285714em`≈`16px`
		height: ( @size-base / 2 );
		max-width: @max-width-base;
		border: @border-base;
		border-radius: @border-radius-pill;
		box-shadow: @box-shadow-progress-bar;
	}

	&--inline {
		width: 100%;
		height: ( @size-base / 8 );
	}
}

@keyframes cdx-progress-bar__bar--slide {
	from {
		transform: translate( -100% );
	}

	to {
		transform: translate( 300% );
	}
}
</style>
