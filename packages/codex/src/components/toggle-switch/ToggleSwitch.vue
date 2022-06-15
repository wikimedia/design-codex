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
 * A checkbox input styled to look like a sliding on/off switch.
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
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import '../../themes/mixins/common.less';

// TODO: Tokenize.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;

@size-base--small: unit( ( 16 / @font-size-browser / @font-size-base ), em );

@size-toggle-switch-travel-distance: 1.5em;
// TODO: `--mobile` as modifier would go against our naming conventions of state only modifiers.
@size-toggle-switch-grip--mobile: 1.25em;
@width-toggle-switch: @size-toggle-switch-travel-distance + 2em;
@height-toggle-switch: 2em;
@start-toggle-switch-grip: unit( ( 5 / @font-size-browser / @font-size-base ), em );
@start-toggle-switch-grip--mobile: unit( ( 4.5 / @font-size-browser / @font-size-base ), em );

@border-filled--disabled: @border-width-base @border-style-base @border-color-filled--disabled;

@padding-end-toggle-switch-label-content: 6px;

@transition-property-toggle-switch-outline: @transition-property-border-color;
@position-offset-toggle-switch-outline: 1px;

@transition-property-toggle-switch-grip: background-color, left;

.cdx-toggle-switch {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	// Visually hidden `<input>` will be absolutely positioned relative to this element.
	position: relative;
	// Create a stacking context.
	z-index: 0;
	cursor: @cursor-base--hover;

	&__label {
		display: flex;
		// Reorder the label content visually, but ensure that `label` is wrapping everything and
		// `input` comes before to satisfy assistive technology and CSS logic.
		flex-direction: row;
	}

	&__label-content {
		align-self: center;
		order: 1;
		padding-right: @padding-end-toggle-switch-label-content;
	}

	// The visible switch.
	&__switch {
		order: 2;
		.force-gpu-composite-layer();
		background-color: @background-color-framed;
		display: inline-block;
		flex-shrink: 0;
		// Grip will be positioned absolutely relative to the switch.
		position: relative;
		box-sizing: @box-sizing-base;
		// These sizes are relative so the toggle switch will scale with font
		// size (e.g. it's slightly larger on mobile).
		width: @width-toggle-switch;
		height: @height-toggle-switch;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-color: @border-color-input-binary;
		border-radius: @border-radius-pill;
		overflow: hidden;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;

		// Focus outline.
		&::before {
			content: '';
			display: block;
			position: absolute;
			top: @position-offset-toggle-switch-outline;
			right: @position-offset-toggle-switch-outline;
			bottom: @position-offset-toggle-switch-outline;
			left: @position-offset-toggle-switch-outline;
			z-index: 1;
			border: @border-width-base @border-style-base transparent;
			border-radius: @border-radius-pill;
			transition-property: @transition-property-toggle-switch-outline;
			transition-duration: @transition-duration-medium;
		}

		// The moving element of the switch.
		&__grip {
			position: absolute;
			// Position and size values differ on smaller screens but aren't
			// exactly scaled relative to font size, so we need separate values.
			top: @start-toggle-switch-grip--mobile;
			left: @start-toggle-switch-grip--mobile;
			box-sizing: @box-sizing-base;
			width: @size-toggle-switch-grip--mobile;
			height: @size-toggle-switch-grip--mobile;
			border: @border-width-base @border-style-base @border-color-input-binary;
			border-radius: @border-radius-circle;
			transition-property: @transition-property-toggle-switch-grip;
			transition-duration: @transition-duration-base;

			@media screen and ( min-width: @min-width-breakpoint-tablet ) {
				top: @start-toggle-switch-grip;
				left: @start-toggle-switch-grip;
				width: @size-base--small;
				height: @size-base--small;
			}
		}
	}

	// HTML `<input>` element.
	&__input {
		// Visually hide the actual `<input>`.
		opacity: 0;
		position: absolute;
		right: 0;
		// Render "on top of" the `span`, so that it's still clickable.
		z-index: 2;
		width: @width-toggle-switch;
		height: @height-toggle-switch;
		margin: 0;
		font-size: inherit;

		// Checked state whether or not the input is enabled or disabled.
		&:checked ~ .cdx-toggle-switch__switch {
			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-base;
				left: @start-toggle-switch-grip--mobile + @size-toggle-switch-travel-distance;
				// TODO: Define state specific border-color token!
				border-color: @background-color-base;

				@media screen and ( min-width: @min-width-breakpoint-tablet ) {
					left: @start-toggle-switch-grip + @size-toggle-switch-travel-distance;
				}
			}
		}

		&:enabled {
			cursor: @cursor-base--hover;

			& ~ .cdx-toggle-switch__label-content {
				cursor: @cursor-base--hover;
			}

			& ~ .cdx-toggle-switch__switch .cdx-toggle-switch__switch__grip {
				background-color: @background-color-framed;
			}

			&:hover ~ .cdx-toggle-switch__switch {
				background-color: @background-color-framed--hover;
				border-color: @border-color-progressive--hover;

				.cdx-toggle-switch__switch__grip {
					background-color: @background-color-framed--hover;
					border-color: @border-color-progressive--hover;
				}
			}

			&:focus ~ .cdx-toggle-switch__switch {
				border-color: @border-color-progressive;
				box-shadow: @box-shadow-base--focus;
				outline: @outline-base--focus;

				.cdx-toggle-switch__switch__grip {
					border-color: @border-color-progressive;
				}
			}

			// Checked state.
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

				&:focus ~ .cdx-toggle-switch__switch {
					border-color: @border-color-input-binary--checked;

					&::before {
						border-color: @border-color-inset--focus;
					}
				}
			}

			// Override normal and checked states with higher specificity to DRY up. Put `:active`
			// after `:focus` at 'filled' progressive components. Otherwise focus styles
			// would be visible when actively clicked.
			/* stylelint-disable no-descending-specificity */
			&,
			&:checked {
				&:active ~ .cdx-toggle-switch__switch {
					background-color: @background-color-progressive--active;
					border-color: @border-color-progressive--active;
					box-shadow: @box-shadow-base--active;

					&::before {
						border-color: @border-color-progressive--active;
					}

					.cdx-toggle-switch__switch__grip {
						background-color: @background-color-base;
						border-color: @background-color-base;
					}
				}
			}
			/* stylelint-enable no-descending-specificity */
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			cursor: @cursor-base--disabled;

			& ~ .cdx-toggle-switch__label {
				color: @color-base--disabled;
			}

			& ~ .cdx-toggle-switch__switch {
				background-color: @background-color-filled--disabled;
				border-color: @background-color-filled--disabled;

				.cdx-toggle-switch__switch__grip {
					border: @border-filled--disabled;
					box-shadow: @box-shadow-filled--disabled;
				}
			}
		}

		&:disabled:checked ~ .cdx-toggle-switch__switch {
			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-base;
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
