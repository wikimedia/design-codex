<template>
	<span
		class="cdx-skeleton"
		:class="rootClasses"
	>
		<!--
			The animated "shimmer" element. Hide from assistive technology since
			it's purely decorative and there's no meaningful content.
		-->
		<span class="cdx-skeleton__shimmer" aria-hidden="true" />
		<!--
			Visually-hidden status announcement. It is opt-in. Enable it on
			exactly one skeleton per loading region to prevent repeated
			"Loading" announcements.
		-->
		<span
			v-if="announce"
			class="cdx-skeleton__label"
			role="status"
		>{{ labelText }}</span>
	</span>
</template>

<script lang="ts">
import { PropType, defineComponent, computed } from 'vue';
import useI18n from '../../composables/useI18n';
import { SkeletonShape } from '../../types';
import { skeletonShapeValidator } from '../../constants';

/**
 * A loading placeholder that approximates the shape of the UI element it replaces.
 *
 * Use multiple skeletons composed together to represent the layout of content
 * that is still loading.
 */
export default defineComponent( {
	name: 'CdxSkeleton',

	props: {
		/**
		 * Shape of the skeleton placeholder.
		 *
		 * - `line` - a thin bar suitable for replacing a line of text (default)
		 * - `rectangle` - a tall bar suitable for replacing an image or card thumbnail
		 *
		 * @values 'line', 'rectangle'
		 */
		shape: {
			type: String as PropType<SkeletonShape>,
			default: 'line',
			validator: skeletonShapeValidator
		},

		/**
		 * Whether to render a visually-hidden `role="status"` announcement for
		 * screen readers.
		 *
		 * Set to `true` on exactly one skeleton per loading region. Leave it unset
		 * on the other skeletons in the group, so that only a single "Loading"
		 * announcement is made.
		 */
		announce: {
			type: Boolean,
			default: false
		}
	},

	setup( props ) {
		const labelText = useI18n( 'cdx-skeleton-label', 'Loading' );

		const rootClasses = computed( (): Record<string, boolean> => ( {
			[ `cdx-skeleton--${ props.shape }` ]: true
		} ) );

		return {
			rootClasses,
			labelText
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-skeleton {
	background-color: @background-color-neutral;
	display: block;
	position: relative;
	overflow: hidden;

	// Line: replace a single line of text.
	&--line {
		border-radius: @border-radius-base;

		// Use a non-breaking space to create one line box.
		// The line box takes the inherited line height.
		&::before {
			content: '\00a0';
		}
	}

	// Rectangle: replace an image or card thumbnail.
	&--rectangle {
		height: @size-300;
		border-radius: @border-radius-base;
	}

	// The moving shimmer wave, clipped by `overflow: hidden` on the root.
	&__shimmer {
		/* stylelint-disable @stylistic/function-parentheses-newline-inside,
			@stylistic/declaration-colon-newline-after,
			@stylistic/function-comma-newline-after,
			@stylistic/function-comma-space-after,
			@stylistic/function-parentheses-space-inside */
		background-image: linear-gradient(
			90deg,
			@background-color-neutral 4%,
			@background-color-interactive--active 50%,
			@background-color-neutral 90%
		);
		/* stylelint-enable @stylistic/function-parentheses-newline-inside,
			@stylistic/declaration-colon-newline-after,
			@stylistic/function-comma-newline-after,
			@stylistic/function-comma-space-after,
			@stylistic/function-parentheses-space-inside */
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		transform: translateX( -@size-full );
		animation-name: cdx-animation-skeleton-shimmer;
		animation-duration: @animation-duration-medium;
		// `shimmer` features `ease`, which is intentional: it creates the
		// natural deceleration at both edges that makes the wave feel smooth.
		animation-timing-function: @animation-timing-function-shimmer;
		// 3 iterations * 1600ms ~= 4.8 s. The animation stops within 5 s to
		// meet 'WCAG 2.2.2 Pause, Stop, Hide'.
		animation-iteration-count: 3;
	}

	// Replace the moving wave with a pulse in place. Movement across the
	// screen can cause problems for users with vestibular disorders. The pulse
	// keeps a "still loading" cue without that movement.
	@media ( prefers-reduced-motion: reduce ) {
		animation-name: cdx-animation-skeleton-pulse;
		animation-duration: @animation-duration-medium;
		animation-timing-function: @animation-timing-function-base;
		animation-iteration-count: 3;

		&__shimmer {
			display: none;
		}
	}

	// Visually hidden announcement for screen readers.
	&__label {
		.screen-reader-text();
	}
}

@keyframes cdx-animation-skeleton-shimmer {
	0% {
		transform: translateX( -@size-full );
	}

	100% {
		transform: translateX( @size-full );
	}
}

@keyframes cdx-animation-skeleton-pulse {
	0%,
	100% {
		opacity: @opacity-base;
	}

	50% {
		opacity: @opacity-medium;
	}
}
</style>
