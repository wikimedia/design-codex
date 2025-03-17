<template>
	<div
		class="cdx-progress-indicator"
		:class="rootClasses"
		:style="rootStyle"
	>
		<span class="cdx-progress-indicator__indicator">
			<progress
				:id="progressIndicatorId"
				class="cdx-progress-indicator__indicator__progress"
				v-bind="otherAttrs"
			/>
		</span>
		<!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the input if content is provided in the description slot. -->
		<cdx-label
			v-if="Boolean( $slots.default?.( {} ) )"
			class="cdx-progress-indicator__label"
			:input-id="progressIndicatorId"
			:visually-hidden="!showLabel"
		>
			<!-- @slot ProgressIndicator label text. -->
			<slot />
		</cdx-label>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	useId
} from 'vue';

import CdxLabel from '../../components/label/Label.vue';

import useLabelChecker from '../../composables/useLabelChecker';
import useSplitAttributes from '../../composables/useSplitAttributes';

/**
 * Animated signal that a process is occurring.
 */
export default defineComponent( {
	name: 'CdxProgressIndicator',
	components: { CdxLabel },
	/**
	 * The `<progress>` element will inherit attributes, not the root element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * Whether the label should be visible.
		 *
		 * This will show or hide the text carrying `<span>` element next to the progress indicator.
		 */
		showLabel: {
			type: Boolean,
			default: false
		}
	},
	setup( props, { slots, attrs } ) {
		useLabelChecker( slots.default?.(), attrs, 'CdxProgressIndicator' );

		const internalClasses = computed( (): Record<string, boolean> => ( {
			'cdx-progress-indicator--has-label-visible': props.showLabel
		} ) );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const progressIndicatorId = useId();

		return {
			rootClasses,
			rootStyle,
			progressIndicatorId,
			otherAttrs
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-progress-indicator {
	display: inline-flex;
	align-items: center;
	// Set `min-height` for the indicator space to be independent of the label's visibility.
	min-height: @size-150;
	white-space: nowrap;

	// The animated element itself.
	&__indicator {
		display: block;
		box-sizing: @box-sizing-base;
		width: @size-125;
		height: @size-125;
		border-width: @border-width-thick;
		border-style: @border-style-base;
		// Rely on `@accent-color-base`, this is orienting on CSS property `accent-color` and its
		// usage instead of defining a separate component token.
		border-color: @accent-color-base;
		border-right-color: @border-color-transparent;
		border-radius: @border-radius-circle;
		transform: @transform-progress-indicator-spinner-start;
		animation-name: cdx-animation-progress-indicator-spinner;
		animation-duration: @animation-duration-fast;
		animation-timing-function: @animation-timing-function-base;
		animation-delay: @animation-delay-medium;
		animation-iteration-count: @animation-iteration-count-base;

		// The `<progress>` element itself, visually hidden.
		&__progress {
			.screen-reader-text();
		}
	}

	// The optional `<label>` element.
	&__label {
		margin-left: @spacing-50;

		// Over-specify the label element to avoid inheriting styles from CdxLabel.
		&.cdx-label {
			padding-bottom: 0;
		}

		.cdx-label__label__text {
			font-weight: @font-weight-normal;
		}
	}

	// Don't invert animation. Spinner turns clockwise analogue to clock in right-to-left.
	@keyframes cdx-animation-progress-indicator-spinner {
		/* rtl:begin:ignore */
		0% {
			transform: @transform-progress-indicator-spinner-start;
		}

		100% {
			transform: @transform-progress-indicator-spinner-end;
		}
		/* rtl:end:ignore */
	}
}
</style>
