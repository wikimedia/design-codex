<template>
	<span
		class="cdx-toggle-switch"
		:class="rootClasses"
		:style="rootStyle"
	>
		<input
			:id="inputId"
			ref="input"
			v-model="wrappedModel"
			class="cdx-toggle-switch__input"
			type="checkbox"
			role="switch"
			:aria-describedby="( $slots.description &&
				$slots.description().length > 0 ) ? descriptionId : undefined"
			:value="inputValue"
			:disabled="computedDisabled"
			v-bind="otherAttrs"
			@keydown.prevent.enter="clickInput"
		>

		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip" />
		</span>

		<!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the input if content is provided in the description slot. -->
		<cdx-label
			v-if="$slots.default && $slots.default().length"
			class="cdx-toggle-switch__label"
			:input-id="inputId"
			:description-id="( $slots.description &&
				$slots.description().length > 0 ) ? descriptionId : undefined"
			:visually-hidden="hideLabel"
			:disabled="computedDisabled"
		>
			<!-- @slot Label text. -->
			<slot />
			<template v-if="$slots.description && $slots.description().length > 0" #description>
				<!-- @slot Short description text. -->
				<slot name="description" />
			</template>
		</cdx-label>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef, computed, useId } from 'vue';
import CdxLabel from '../label/Label.vue';
import useLabelChecker from '../../composables/useLabelChecker';
import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';

/**
 * A switch that allows the user to toggle between on and off states.
 */
export default defineComponent( {
	name: 'CdxToggleSwitch',
	components: { CdxLabel },
	/**
	 * The input element will inherit attributes, not the root element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * Current value of the toggle switch or toggle switch group.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ Boolean, Array ] as PropType<boolean | string[] | number[]>,
			default: false
		},
		/**
		 * HTML "value" attribute to assign to the input element.
		 *
		 * Required for groups of ToggleSwitches. Can be omitted for single true/false switches.
		 */
		inputValue: {
			type: [ String, Number, Boolean ],
			default: false
		},
		/**
		 * Whether to align the switch to the end of the container.
		 *
		 * Useful for ToggleSwitch groups, where each switch should be aligned regardless of
		 * label length.
		 */
		alignSwitch: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the label should be visually hidden.
		 *
		 * Note that this will also hide the description.
		 */
		hideLabel: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the disabled attribute should be added to the input.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * Emitted when modelValue changes.
		 *
		 * @property {boolean} modelValue The new model value
		 */
		'update:modelValue'
	],
	setup( props, { emit, slots, attrs } ) {
		useLabelChecker( slots.default?.(), attrs, 'CdxToggleSwitch' );

		// Declare template refs.
		const input = ref<HTMLInputElement>();

		// Input needs an ID so we can connect it and the label element.
		const inputId = useId();
		const descriptionId = useId();

		const internalClasses = computed( (): Record<string, boolean> => ( {
			'cdx-toggle-switch--align-switch': props.alignSwitch
		} ) );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

		// Take the modelValue provided by the parent component via v-model and generate a wrapped
		// model that we can use for the input element in this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		/**
		 * Click the input to toggle its state.
		 */
		const clickInput = (): void => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			input.value!.click();
		};

		return {
			input,
			inputId,
			descriptionId,
			rootClasses,
			rootStyle,
			otherAttrs,
			computedDisabled,
			wrappedModel,
			clickInput
		};
	}
} );
</script>

<!-- eslint-disable max-len -->
<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-toggle-switch {
	display: inline-flex;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	// Visually hidden `<input>` will be absolutely positioned relative to this element.
	// Create a stacking context by `position: relative` and `z-index` other than `auto`.
	z-index: @z-index-stacking-0;
	margin-bottom: @spacing-35;

	&--align-switch {
		display: flex;
		justify-content: space-between;
	}

	&:last-child {
		margin-bottom: 0;
	}

	// DEPRECATED: Support CSS-only components that don't set the `cdx-label` class on the
	// label (T353885)
	&__label,
	&__label.cdx-label {
		// Put the label first. It needs to come after the input in the markup so we can apply
		// styles based on the state of the input.
		order: -1;

		&:not( :empty ) {
			padding-right: @spacing-50;
		}
	}

	// Special overrides for the Label component.
	& &__label.cdx-label {
		padding-bottom: 0;

		.cdx-label__label__text {
			font-weight: @font-weight-normal;
		}
	}

	// The visible switch.
	&__switch {
		// `force-gpu-composite-layer()` causes Stylelint to complain.
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		.force-gpu-composite-layer();
		background-color: @background-color-base;
		display: inline-block;
		flex-shrink: 0;
		// Grip will be positioned absolutely relative to the switch.
		position: relative;
		box-sizing: @box-sizing-base;
		min-width: @min-width-toggle-switch;
		min-height: @min-height-toggle-switch;
		// Switch width and height is scaling proportionally to the font-size
		// being used in each mode.
		// Equal to `48px` in `16px` base at default font size mode.
		width: @width-toggle-switch;
		// Equal to `32px` in `16px` base at default font size mode.
		height: @height-toggle-switch;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-color: @border-color-interactive;
		border-radius: @border-radius-pill;
		overflow: hidden;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;

		// Inner focus outline, set visible when toggled on further down.
		&::before {
			content: '';
			display: block;
			position: absolute;
			top: @size-absolute-1;
			right: @size-absolute-1;
			bottom: @size-absolute-1;
			left: @size-absolute-1;
			z-index: @z-index-stacking-1;
			border: @border-width-base @border-style-base @border-color-transparent;
			border-radius: @border-radius-pill;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-medium;
		}

		// The moving element of the switch.
		&__grip {
			position: absolute;
			// Position vertically centered with help of `transform` further down.
			top: @size-half;
			box-sizing: @box-sizing-base;
			min-width: @min-size-toggle-switch-grip;
			min-height: @min-size-toggle-switch-grip;
			// Equal to `20px` in `16px` base at default font size mode.
			width: @size-toggle-switch-grip;
			// Equal to `20px` in `16px` base at default font size mode.
			height: @size-toggle-switch-grip;
			border: @border-width-base @border-style-base @border-color-input-binary;
			border-radius: @border-radius-circle;
			// Set starting position with `transform` and add 1px equivalent to x position.
			// Divide height by 50% to center the grip vertically.
			// Grip must translate dynamically based on the adaptive size
			// of the switch being used in each mode.
			// Translate X equal to `6px` in `16px` base at default font size mode.
			transform: translate( @spacing-toggle-switch-grip-start, calc( -1 * @size-half ) );
			transition-property: @transition-property-toggle-switch-grip;
			// As ToggleSwitch background is a big area transition, let's use the slower duration
			// for it.

			/* stylelint-disable @stylistic/declaration-colon-newline-after,
				@stylistic/value-list-comma-newline-after */
			transition-duration: @transition-duration-medium,
				@transition-duration-base,
				@transition-duration-base;
			/* stylelint-enable @stylistic/declaration-colon-newline-after,
				@stylistic/value-list-comma-newline-after */
		}
	}

	// Hidden `<input type="checkbox">` element.
	&__input {
		// Visually hide the actual `<input>`.
		opacity: 0;
		position: absolute;
		right: 0;
		// Render “on top of” the `span`, so that it's still clickable.
		z-index: @z-index-stacking-2;
		min-width: @min-width-toggle-switch;
		min-height: @min-size-interactive-pointer;
		width: @size-300;
		height: @size-200;
		margin: 0;
		font-size: @font-size-medium;

		// Checked (on) state whether or not the input is enabled or disabled.
		&:checked ~ .cdx-toggle-switch__switch {
			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-base;
				border-color: @border-color-inverted;
				// Move the grip to the right and add 1px equivalent to x position.
				// Continue to divide height by 50% to center the grip.
				// Grip must translate dynamically based on the adaptive size
				// of the switch being used in each mode.
				// Translate X equal to `20px` in `16px` base at default font size mode.
				transform: translate( @spacing-toggle-switch-grip-end, calc( -1 * @size-half ) );
			}
		}

		&:enabled {
			// Add hover cursor to switch and label.
			// DEPRECATED: The line with the :not() selector is meant to support CSS-only usage of
			// a simple label element with class `.cdx-toggle-switch__label`, rather than use of
			// the Label component (this usage is deprecated, see T353885).
			&:hover,
			& ~ .cdx-label .cdx-label__label:hover,
			& ~ .cdx-toggle-switch__label:not( .cdx-label ):hover {
				cursor: @cursor-base--hover;
			}

			& ~ .cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip {
				background-color: @background-color-base;
			}

			&:hover ~ .cdx-toggle-switch__switch {
				background-color: @background-color-interactive-subtle--hover;
				border-color: @border-color-interactive--hover;

				.cdx-toggle-switch__switch__grip {
					background-color: @background-color-base;
					border-color: @border-color-interactive--hover;
				}
			}

			&:active ~ .cdx-toggle-switch__switch {
				background-color: @background-color-interactive-subtle--active;
				border-color: @border-color-interactive--active;

				.cdx-toggle-switch__switch__grip {
					background-color: @background-color-base;
					border-color: @border-color-interactive--active;
				}
			}

			&:focus:not( :active ) ~ .cdx-toggle-switch__switch {
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				outline: @outline-base--focus;
			}

			// Checked state.
			/* stylelint-disable no-descending-specificity */
			&:checked {
				& ~ .cdx-toggle-switch__switch {
					background-color: @background-color-progressive;
					border-color: @border-color-transparent;

					.cdx-toggle-switch__switch__grip {
						background-color: @background-color-base-fixed;
						border-color: @background-color-transparent;
					}
				}

				&:hover ~ .cdx-toggle-switch__switch {
					background-color: @background-color-progressive--hover;
					border-color: @border-color-transparent;
				}

				&:focus:not( :active ) ~ .cdx-toggle-switch__switch {
					border-color: @border-color-transparent;

					&::before,
					.cdx-toggle-switch__switch__grip {
						border-color: @border-color-inverted;
					}
				}

				&:active ~ .cdx-toggle-switch__switch {
					background-color: @background-color-progressive--active;
					border-color: @border-color-transparent;
					box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--active;

					&::before {
						border-color: @border-color-transparent;
					}

					.cdx-toggle-switch__switch__grip {
						background-color: @background-color-base-fixed;
						border-color: @border-color-transparent;
					}
				}
			}
			/* stylelint-enable no-descending-specificity */
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			cursor: @cursor-base--disabled;

			& ~ .cdx-toggle-switch__switch {
				background-color: @background-color-disabled-subtle;
				border-color: @border-color-disabled;

				.cdx-toggle-switch__switch__grip {
					border-color: @border-color-disabled;
				}
			}

			&:checked ~ .cdx-toggle-switch__switch {
				background-color: @background-color-disabled;
				border-color: @border-color-transparent;

				.cdx-toggle-switch__switch__grip {
					// A color token is being used here for a background color
					// because the ToggleSwitch grip acts more like an icon
					// than it does a background, similar to a Checkbox or Radio.
					background-color: @color-disabled-emphasized;
					border-color: @border-color-transparent;
				}
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
