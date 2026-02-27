<template>
	<div
		class="cdx-progress-bar"
		:class="rootClasses"
		v-bind="$attrs"
		role="progressbar"
		:aria-labelledby="ariaLabelledBy"
		:aria-hidden="computedAriaHidden"
		:aria-disabled="disabled"
		:aria-valuemin="hasValue ? 0 : undefined"
		:aria-valuemax="hasValue ? max : undefined"
		:aria-valuenow="hasValue ? clampedValue : undefined"
		:style="hasValue ? progressStyles : undefined"
	>
		<div
			class="cdx-progress-bar__bar"
			:class="{ 'cdx-progress-bar__bar--determinate': hasValue }"
		/>
	</div>

	<div
		v-if="startLabel || endLabel"
		:id="labelsId"
		class="cdx-progress-bar__labels"
	>
		<div
			class="cdx-progress-bar__label cdx-progress-bar__label--start"
		>
			{{ startLabel }}
		</div>
		<div
			class="cdx-progress-bar__label cdx-progress-bar__label--end"
		>
			{{ endLabel }}
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	useId
} from 'vue';
import useWarnOnce from '../../composables/useWarnOnce';

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

	// Disable automatic attribute inheritance so we can control where attrs go
	inheritAttrs: false,

	props: {
		value: {
			type: [ Number, null ],
			default: null
		},
		max: {
			type: Number,
			default: 100
		},
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
		},

		startLabel: {
			type: String,
			default: ''
		},

		endLabel: {
			type: String,
			default: ''
		}

	},
	setup( props, { attrs } ) {

		// Emit a warning if block progress bar is without the `aria-label` or
		// `aria-hidden` attribute set, but do this only once per progress bar.
		useWarnOnce(
			() => !props.inline && !attrs[ 'aria-label' ] && !attrs[ 'aria-hidden' ],
			'CdxProgressBar: Progress bars require one of the following attribute, aria-label or aria-hidden. ' +
				'See documentation on https://doc.wikimedia.org/codex/latest/components/demos/progressbar.html'
		);

		const hasValue = computed(
			() => typeof props.value === 'number'
		);

		const rootClasses = computed( () => ( {
			'cdx-progress-bar--block': !props.inline,
			'cdx-progress-bar--inline': props.inline,
			'cdx-progress-bar--enabled': !props.disabled,
			'cdx-progress-bar--disabled': props.disabled
		} ) );

		// Computed property for `aria-hidden`.
		const computedAriaHidden = computed(
			// Set `aria-hidden` to `true` only when `inline` prop is true.
			// Otherwise, don't set the attribute.
			() => props.inline ? 'true' : undefined
		);

		const clampedValue = computed( () => {
			if ( typeof props.value !== 'number' ) {
				return 0;
			}

			return Math.min(
				Math.max( props.value, 0 ),
				props.max
			);
		} );

		const progressStyles = computed( () => ( {
			'--cdx-progress-value': clampedValue.value,
			'--cdx-progress-max': props.max
		} ) );

		const labelsId = useId();
		const hasLabels = computed( () => Boolean( props.startLabel || props.endLabel ) );
		const ariaLabelledBy = computed( () => hasLabels.value ? labelsId : undefined );

		return {
			rootClasses,
			computedAriaHidden,
			hasValue,
			progressStyles,
			clampedValue,
			labelsId,
			ariaLabelledBy
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
		background-color: @background-color-progressive;
		width: @size-third;
		height: @size-full;
	}

	&--disabled {
		.cdx-progress-bar__bar {
			background-color: @background-color-disabled;
		}
	}

	// Indeterminate animation (default)
	&:not( .cdx-progress-bar--disabled ) &__bar:not( .cdx-progress-bar__bar--determinate ) {
		animation-name: cdx-animation-progress-bar__bar;
		animation-duration: @animation-duration-medium;
		animation-timing-function: @animation-timing-function-base;
		animation-iteration-count: @animation-iteration-count-base;
	}

	// Determinate mode
	&__bar--determinate {
		width: calc( ( var( --cdx-progress-value, 0 ) / var( --cdx-progress-max, 100 ) ) * 100% );
	}

	&:not( .cdx-progress-bar--inline ) {
		background-color: @background-color-base;
		// Support Safari: Create a stacking context to prevent the bar from overflowing the
		// `border-radius` of the component's root element by `position: relative` and
		// `z-index` other than `auto`.
		position: relative;
		z-index: @z-index-stacking-1;
		height: @size-75;
		max-width: @max-width-base;
		border: @border-progressive;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-color: @border-color-progressive;
		border-radius: @border-radius-base;

		&.cdx-progress-bar--disabled {
			border-color: @border-color-disabled;
		}
	}

	&--inline {
		width: @size-full;
		height: @size-25;
	}

	/* Labels that appear at the ends of the bar */
	&__label {
		color: @color-base;
		font-size: @font-size-small;
		white-space: wrap;
	}

	&__labels {
		display: flex;
		justify-content: space-between;
	}

	&__label--start {
		text-align: left;
	}

	&__label--end {
		text-align: right;
	}
}

@keyframes cdx-animation-progress-bar__bar {
	from {
		transform: translate( calc( -1 * @size-full ) );
	}

	to {
		transform: translate( 300% );
	}
}
</style>
