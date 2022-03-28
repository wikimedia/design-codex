<template>
	<span class="cdx-radio" :class="rootClasses">
		<label
			class="cdx-radio__label"
			@click="focusInput"
		>
			<input
				ref="input"
				v-model="wrappedModel"
				class="cdx-radio__input"
				type="radio"
				:name="name"
				:value="inputValue"
				:disabled="disabled"
			>
			<span class="cdx-radio__icon" />
			<span class="cdx-radio__label-content">
				<!-- @slot Input label content -->
				<slot />
			</span>
		</label>
	</span>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed } from 'vue';
import useModelWrapper from '../../composables/useModelWrapper';

/**
 * A binary input that always exists in a group, in which only one input can be on at a time.
 *
 * Typical use will involve using `v-for` to loop through an array of items and output a Radio
 * component for each one. Each Radio will have the same `v-model` binding and `name` prop, but
 * different `inputValue` props and label content.
 *
 * The `v-model` value is the `inputValue` of the Radio that is currently on.
 */
export default defineComponent( {
	name: 'CdxRadio',
	props: {
		/**
		 * Value of the currently selected radio.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ String, Number, Boolean ],
			default: ''
		},
		/**
		 * HTML "value" attribute to assign to the input.
		 *
		 * Required for input groups.
		 */
		inputValue: {
			type: [ String, Number, Boolean ],
			default: false
		},
		/**
		 * HTML "name" attribute to assign to the input.
		 *
		 * Required for input groups
		 */
		name: {
			type: String,
			default: ''
		},
		/**
		 * Whether the disabled attribute should be added to the input.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the component should display inline.
		 *
		 * By default, `display: block` is set and a margin exists between
		 * sibling components, for a stacked layout.
		 */
		inline: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * Emitted when modelValue changes.
		 *
		 * @property {string | number | boolean} modelValue The new model value
		 */
		'update:modelValue'
	],
	setup( props, { emit } ) {
		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-radio--inline': props.inline
			};
		} );

		// Declare template ref.
		const input = ref<HTMLInputElement>();

		/**
		 * When the label is clicked, focus on the input.
		 *
		 * This doesn't happen automatically in Firefox or Safari.
		 */
		const focusInput = (): void => {
			// This method only gets called when the label is interacted with,
			// so we can be confident that the input ref also exists.
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			input.value!.focus();
		};

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the input element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		return {
			rootClasses,
			input,
			focusInput,
			wrappedModel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import './../../themes/mixins/binary-input.less';

// Wrapper `<label>`.
.cdx-radio {
	// Common binary input styles.
	.cdx-mixin-binary-input();

	// Custom-styled radio that's visible to the user.
	&__icon {
		border-radius: @border-radius-input-radio;
		transition: @transition-base;
		transition-property: @transition-property-base;

		// Add `:focus` state's inner circle.
		&:before {
			content: ' ';
			position: absolute;
			top: @position-offset-input-radio--focus;
			right: @position-offset-input-radio--focus;
			bottom: @position-offset-input-radio--focus;
			left: @position-offset-input-radio--focus;
			border: @border-width-base @border-style-base @border-color-transparent;
			border-radius: @border-radius-input-radio;
		}
	}

	// HTML `<input type="radio">`.
	// Based on the HTML attributes of the radio input, we can change the style of the adjacent
	// `span`, which will look like a custom-styled radio.
	&__input {
		&:enabled {
			// Note: there is no focus behavior for the input in its unchecked state because you
			// can't focus on it without selecting it.
			&:hover + .cdx-radio__icon {
				border-color: @border-color-input-binary--hover;
			}

			&:active + .cdx-radio__icon {
				background-color: @background-color-progressive--active;
				border-color: @border-color-progressive--active;
			}

			&:checked {
				& + .cdx-radio__icon {
					border-width: @border-width-input-radio--checked;
					border-color: @border-color-input-binary--checked;
				}

				&:hover + .cdx-radio__icon {
					border-color: @border-color-input-binary--hover;
				}

				&:focus + .cdx-radio__icon {
					&:before {
						border-color: @border-color-inset--focus;
					}
				}

				// Put `:active` after `:focus` at 'filled' progressive components. Otherwise a
				// focus outline would be visible when actively clicked.
				&:active + .cdx-radio__icon {
					background-color: @background-color-base;
					border-color: @border-color-progressive--active;

					&:before {
						border-color: @border-color-progressive--active;
					}
				}
			}
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			& ~ .cdx-radio__label-content {
				color: @color-base--disabled;
			}

			& + .cdx-radio__icon {
				background-color: @background-color-filled--disabled;
				border-color: @border-color-base--disabled;
			}

			&:checked + .cdx-radio__icon {
				border-width: @border-width-input-radio--checked;
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
