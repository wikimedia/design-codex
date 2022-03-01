<template>
	<span
		class="cdx-toggle-switch"
		:class="rootClasses"
		:style="rootStyle"
	>
		<label
			v-if="$slots.default"
			:for="inputId"
			class="cdx-toggle-switch__label"
			:aria-disabled="disabled"
		>
			<!-- @slot Label content -->
			<slot />
		</label>

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
		<span class="cdx-toggle-switch__switch">
			<span class="cdx-toggle-switch__switch__grip" />
		</span>
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
	setup( props, context ) {
		// Declare template refs.
		const input = ref<HTMLInputElement>();

		// Input needs an ID so we can connect it and the label element.
		const inputId = useGeneratedId( 'toggle-switch' );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( context.attrs );

		// Take the modelValue provided by the parent component via v-model and generate a wrapped
		// model that we can use for the input element in this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), context.emit );

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
@import ( reference ) 'wikimedia-ui-base/wikimedia-ui-base.less';
@import '../../themes/mixins/force-gpu-composite-layer.less';

// TODO: make these design tokens.
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@size-base--small: unit( ( 16 / @font-size-browser / @font-size-base ), em );

@size-toggle-switch-travel-distance: 1.5em;
@width-toggle-switch: @size-toggle-switch-travel-distance + 2em;
@height-toggle-switch: 2em;
@start-toggle-switch-grip: unit( ( 5 / @font-size-browser / @font-size-base ), em );
@start-toggle-switch-grip--mobile: unit( ( 4.5 / @font-size-browser / @font-size-base ), em );

@border-radius-toggle-switch: @size-base--small;
@border-color-framed-progressive--hover: @color-primary--hover;
@border-filled--disabled: @border-width-base @border-style-base @border-color-filled--disabled;

@box-shadow-input-binary: 0 0 0 1px rgba( 0, 0, 0, 0.1 );
@box-shadow-input-binary--active: inset 0 0 0 1px @color-primary--active;

.cdx-toggle-switch {
	display: inline-flex;
	align-items: center;
	justify-content: space-between;
	// <input> will be absolutely positioned relative to this element.
	position: relative;
	// Create a stacking context.
	z-index: 0;
	cursor: pointer;

	&__label {
		padding-right: 16px;
		cursor: pointer;
	}

	&[ aria-disabled='true' ] {
		cursor: @cursor-base--disabled;

		.cdx-toggle-switch__label {
			color: @color-base--disabled;
		}
	}

	// The visible switch.
	&__switch {
		.force-gpu-composite-layer();
		background-color: @background-color-framed;
		display: inline-block;
		// Grip will be positioned absolutely relative to the switch.
		position: relative;
		box-sizing: border-box;
		// These sizes are relative so the toggle switch will scale with font
		// size (e.g. it's slightly larger on mobile).
		width: @width-toggle-switch;
		height: @height-toggle-switch;
		border: @border-input-binary;
		border-radius: @border-radius-toggle-switch;
		overflow: hidden;
		transition: background-color @transition-ease-medium, border-color @transition-ease-medium;

		// Focus outline.
		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 1px;
			right: 1px;
			bottom: 1px;
			left: 1px;
			z-index: 1;
			border: @border-width-base @border-style-base transparent;
			border-radius: @border-radius-toggle-switch;
			transition: border-color @transition-ease-medium;
		}

		// The moving element of the switch.
		&__grip {
			position: absolute;
			// Position and size values differ on smaller screens but aren't
			// exactly scaled relative to font size, so we need separate values.
			top: @start-toggle-switch-grip--mobile;
			left: @start-toggle-switch-grip--mobile;
			box-sizing: border-box;
			width: 1.25em;
			height: 1.25em;
			border: @border-input-binary;
			border-radius: @border-radius-toggle-switch;
			// stylelint-disable value-list-comma-newline-after
			transition: background-color @transition-ease-medium,
				left @transition-base,
				margin-left @transition-base;
			// stylelint-enable value-list-comma-newline-after

			// stylelint-disable-next-line max-nesting-depth
			@media screen and ( min-width: @width-breakpoint-tablet ) {
				top: @start-toggle-switch-grip;
				left: @start-toggle-switch-grip;
				width: @size-base--small;
				height: @size-base--small;
			}
		}
	}

	// HTML <input> element.
	&__input {
		// The actual input is visually hidden.
		opacity: 0;
		position: absolute;
		right: 0;
		// Render "on top of" the span, so that it's still clickable.
		z-index: 2;
		width: @width-toggle-switch;
		height: @height-toggle-switch;
		margin: 0;
		font-size: inherit;
		cursor: pointer;

		// Checked styles that apply whether the input is enabled or disabled.
		&:checked + .cdx-toggle-switch__switch {
			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-base;
				left: @start-toggle-switch-grip--mobile + @size-toggle-switch-travel-distance;
				border-color: @background-color-base;

				// stylelint-disable-next-line max-nesting-depth
				@media screen and ( min-width: @width-breakpoint-tablet ) {
					left: @start-toggle-switch-grip + @size-toggle-switch-travel-distance;
				}
			}
		}

		&:disabled {
			cursor: @cursor-base--disabled;

			& + .cdx-toggle-switch__switch {
				background-color: @background-color-filled--disabled;
				border-color: @background-color-filled--disabled;

				// stylelint-disable-next-line max-nesting-depth
				.cdx-toggle-switch__switch__grip {
					border: @border-filled--disabled;
					box-shadow: @box-shadow-filled--disabled;
				}
			}
		}

		&:enabled + .cdx-toggle-switch__switch {
			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-framed;
			}
		}

		&:enabled:hover + .cdx-toggle-switch__switch {
			background-color: @background-color-framed--hover;
			border-color: @border-color-framed-progressive--hover;

			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-framed--hover;
				border-color: @border-color-framed-progressive--hover;
			}
		}

		&:enabled:focus + .cdx-toggle-switch__switch {
			border-color: @border-color-primary;
			box-shadow: @box-shadow-base--focus;
			outline: 0;

			.oo-ui-toggleSwitchWidget-grip {
				border-color: @border-color-primary;
			}
		}

		&:enabled:active + .cdx-toggle-switch__switch {
			background-color: @background-color-input-binary--active;
			border-color: @border-color-input-binary--active;
			box-shadow: @box-shadow-input-binary--active;

			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-base;
				border-color: @background-color-base;
				box-shadow: @box-shadow-input-binary;
			}
		}

		&:disabled:checked + .cdx-toggle-switch__switch {
			.cdx-toggle-switch__switch__grip {
				background-color: @background-color-framed;
			}
		}

		&:enabled:checked {
			& + .cdx-toggle-switch__switch {
				background-color: @background-color-input-binary--checked;
				border-color: @border-color-input-binary--checked;

				// stylelint-disable-next-line max-nesting-depth
				.cdx-toggle-switch__switch__grip {
					border-color: @background-color-base;
					box-shadow: @box-shadow-input-binary;
				}
			}

			&:hover + .cdx-toggle-switch__switch {
				background-color: @color-primary--hover;
				border-color: @border-color-framed-progressive--hover;
			}

			&:focus + .cdx-toggle-switch__switch {
				border-color: @border-color-input-binary--checked;

				&:before {
					border-color: @color-base--inverted;
				}
			}

			&:active + .cdx-toggle-switch__switch {
				background-color: @background-color-input-binary--active;
				border-color: @border-color-input-binary--active;

				&:before {
					border-color: @background-color-input-binary--active;
				}
			}
		}
	}
}
</style>
