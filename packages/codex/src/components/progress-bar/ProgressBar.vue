<template>
	<div
		class="cdx-progress-bar"
		:class="rootClasses"
		role="progressbar"
		:aria-disabled="disabled"
		aria-valuemin="0"
		aria-valuemax="100"
	>
		<div class="cdx-progress-bar__bar" />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

/**
 * A linear indicator of progress.
 *
 * Currently only supports indeterminate type (i.e. the bar will scroll across the width of the
 * display and then reappear at the start, rather than reflecting a specific amount of progress
 * having been made).
 *
 * A smaller, inline version is available for use within other components, e.g. a menu or dialog.
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
		},

		/**
		 * Whether the progress bar is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	setup( props ) {
		const rootClasses = computed( () => {
			return {
				'cdx-progress-bar--block': !props.inline,
				'cdx-progress-bar--inline': props.inline,
				'cdx-progress-bar--enabled': !props.disabled,
				'cdx-progress-bar--disabled': props.disabled
			};
		} );

		return {
			rootClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-progress-bar {
	box-sizing: @box-sizing-base;
	overflow-x: hidden;

	&__bar {
		width: @size-third;
		height: @size-full;
	}

	&:not( .cdx-progress-bar--inline ) {
		// Support Safari: Create a stacking context to prevent the bar from overflowing the
		// `border-radius` of the component's root element by `position: relative` and
		// `z-index` other than `auto`.
		position: relative;
		z-index: @z-index-stacking-1;
		height: @size-100;
		max-width: @max-width-base;
		border: @border-base;
		border-radius: @border-radius-pill;
		box-shadow: @box-shadow-drop-medium;
	}

	&--inline {
		width: @size-full;
		height: @size-25;
	}

	&:not( .cdx-progress-bar--disabled ) {
		.cdx-progress-bar__bar {
			background-color: @background-color-progressive;
			animation-name: cdx-animation-progress-bar__bar;
			animation-duration: @animation-duration-medium;
			animation-timing-function: @animation-timing-function-base;
			animation-iteration-count: @animation-iteration-count-base;
		}

		&.cdx-progress-bar--block {
			background-color: @background-color-base;
		}
	}

	&--disabled {
		/* stylelint-disable-next-line no-descending-specificity */
		.cdx-progress-bar__bar {
			background-color: @background-color-disabled;
		}

		&.cdx-progress-bar--block {
			background-color: @background-color-disabled-subtle;
		}
	}
}

@keyframes cdx-animation-progress-bar__bar {
	from {
		transform: translate( -@size-full );
	}

	to {
		transform: translate( 300% );
	}
}
</style>
