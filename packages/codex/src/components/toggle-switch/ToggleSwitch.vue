<template>
	<span
		class="cdx-toggle-switch"
		:class="rootClasses"
		:style="rootStyle"
	>
		<label
			:for="inputId"
			class="cdx-toggle-switch__label"
		>
			<input
				:id="inputId"
				ref="input"
				v-model="wrappedModel"
				class="cdx-toggle-switch__input"
				type="checkbox"
				:disabled="disabled"
				v-bind="otherAttrs"
				@keydown.prevent.enter="clickInput"
			>
			<span v-if="$slots.default" class="cdx-toggle-switch__label-content">
				<!-- @slot Input label content -->
				<slot />
			</span>
			<span class="cdx-toggle-switch__switch">
				<span class="cdx-toggle-switch__switch__grip" />
			</span>
		</label>
	</span>
</template>

<script lang="ts">
import { defineComponent, ref, toRef } from 'vue';
import useModelWrapper from '../../composables/useModelWrapper';
import useGeneratedId from '../../composables/useGeneratedId';
import useSplitAttributes from '../../composables/useSplitAttributes';

/**
 * A sliding boolean input used to enable or disable options.
 *
 * Unlike Checkbox, ToggleSwitch is meant to be used alone, not in a group.
 *
 * Current styles support a single toggle switch with or without a label. The
 * label should only be omitted here if one is added and connected with the
 * input via the `for` attribute elsewhere (like a future Field component).
 * If you're just using this component by itself, you should include a label.
 *
 * `v-model` value will be boolean.
 */
export default defineComponent( {
	name: 'CdxToggleSwitch',
	/**
	 * The input element will inherit attributes, not the root element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * Current value of the toggle switch.
		 *
		 * Provided by `v-model` in a parent component.
		 */
		modelValue: {
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
	setup( props, { attrs, emit } ) {
		// Declare template refs.
		const input = ref<HTMLInputElement>();

		// Input needs an ID so we can connect it and the label element.
		const inputId = useGeneratedId( 'toggle-switch' );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs );

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
			rootClasses,
			rootStyle,
			otherAttrs,
			wrappedModel,
			clickInput
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/common.less';

.cdx-toggle-switch {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	// Visually hidden `<input>` will be absolutely positioned relative to this element.
	// Create a stacking context by `position: relative` and `z-index` other than `auto`.
	position: relative;
	z-index: @z-index-base;

	&__label {
		display: flex;
		// Reorder the label content visually, but ensure that `label` is wrapping everything and
		// `input` comes before to satisfy assistive technology and CSS logic.
		flex-direction: row;
	}

	&__label-content {
		align-self: center;
		order: 1;
		padding-right: @spacing-35;
	}

	// The visible switch.
	&__switch {
		order: 2;
		.force-gpu-composite-layer();
		background-color: @background-color-interactive-subtle;
		display: inline-block;
		flex-shrink: 0;
		// Grip will be positioned absolutely relative to the switch.
		position: relative;
		box-sizing: @box-sizing-base;
		min-width: @min-width-toggle-switch;
		min-height: @min-size-base;
		width: @size-300;
		height: @size-200;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-color: @border-color-input-binary;
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
			width: @size-125;
			height: @size-125;
			border: @border-width-base @border-style-base @border-color-input-binary;
			border-radius: @border-radius-circle;
			// Set starting position with `transform` and add 1px equivalent to x position.
			// Divide height by 50% to center the grip vertically.
			transform: translateX( ( @size-25 + @size-6 ) ) translateY( -@size-half );
			transition-property: @transition-property-toggle-switch-grip;
			transition-duration: @transition-duration-base;
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
		min-height: @min-size-base;
		width: @size-300;
		height: @size-200;
		margin: 0;
		font-size: inherit;

		// Checked (on) state whether or not the input is enabled or disabled.
		&:checked ~ .cdx-toggle-switch__switch {
			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-base;
				border-color: @border-color-inverted;
				// Move the grip to the right and add 1px equivalent to x position.
				// Continue to divide height by 50% to center the grip.
				transform: translateX( calc( @size-full + @size-6 ) ) translateY( -@size-half );
			}
		}

		&:enabled {
			&:hover,
			& ~ .cdx-toggle-switch__label-content:hover {
				cursor: @cursor-base--hover;
			}

			& ~ .cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip {
				background-color: @background-color-interactive-subtle;
			}

			&:hover ~ .cdx-toggle-switch__switch {
				background-color: @background-color-base;
				border-color: @border-color-progressive--hover;

				.cdx-toggle-switch__switch__grip {
					background-color: @background-color-base;
					border-color: @border-color-progressive--hover;
				}
			}

			&:active ~ .cdx-toggle-switch__switch {
				background-color: @background-color-progressive--active;
				border-color: @border-color-progressive--active;

				&::before {
					border-color: @border-color-progressive--active;
				}

				.cdx-toggle-switch__switch__grip {
					border-color: @border-color-inverted;
				}
			}

			&:focus:not( :active ) ~ .cdx-toggle-switch__switch {
				border-color: @border-color-progressive;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				outline: @outline-base--focus;

				.cdx-toggle-switch__switch__grip {
					border-color: @border-color-progressive;
				}
			}

			// Checked state.
			/* stylelint-disable no-descending-specificity */
			&:checked {
				& ~ .cdx-toggle-switch__switch {
					background-color: @background-color-input-binary--checked;
					border-color: @border-color-input-binary--checked;

					.cdx-toggle-switch__switch__grip {
						border-color: @background-color-base;
					}
				}

				&:hover ~ .cdx-toggle-switch__switch {
					background-color: @background-color-progressive--hover;
					border-color: @border-color-progressive--hover;
				}

				&:active ~ .cdx-toggle-switch__switch {
					background-color: @background-color-progressive--active;
					border-color: @border-color-progressive--active;
					box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--active;

					&::before {
						border-color: @border-color-progressive--active;
					}

					.cdx-toggle-switch__switch__grip {
						background-color: @background-color-base;
						border-color: @border-color-inverted;
					}
				}

				&:focus:not( :active ) ~ .cdx-toggle-switch__switch {
					border-color: @border-color-input-binary--checked;

					&::before,
					.cdx-toggle-switch__switch__grip {
						border-color: @border-color-inverted;
					}
				}
			}
			/* stylelint-enable no-descending-specificity */
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			cursor: @cursor-base--disabled;

			& ~ .cdx-toggle-switch__label-content {
				color: @color-disabled;
			}

			& ~ .cdx-toggle-switch__switch {
				background-color: @background-color-disabled;
				border-color: @border-color-disabled;

				.cdx-toggle-switch__switch__grip {
					border-color: @border-color-inverted;
					box-shadow: @box-shadow-inset-small @box-shadow-color-inverted;
				}
			}

			&:checked ~ .cdx-toggle-switch__switch {
				.cdx-toggle-switch__switch__grip {
					background-color: @background-color-base;
				}
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
