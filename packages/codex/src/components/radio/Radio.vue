<template>
	<span class="cdx-radio" :class="rootClasses">
		<input
			:id="radioId"
			ref="input"
			v-model="wrappedModel"
			class="cdx-radio__input"
			type="radio"
			:aria-describedby="( $slots.description &&
				$slots.description().length > 0 ) ? descriptionId : undefined"
			:name="name"
			:value="inputValue"
			:disabled="computedDisabled"
		>
		<span class="cdx-radio__icon" />
		<!-- Only render a Label component if label text has been provided. This component can also
			supply a description to the Radio if content is provided in the description slot. -->
		<cdx-label
			v-if="$slots.default && $slots.default().length"
			class="cdx-radio__label"
			:input-id="radioId"
			:description-id="( $slots.description &&
				$slots.description().length > 0 ) ? descriptionId : undefined"
			:disabled="computedDisabled"
			@click="focusInput"
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
import { defineComponent, ref, toRef, computed } from 'vue';
import CdxLabel from '../label/Label.vue';
import useLabelChecker from '../../composables/useLabelChecker';
import useModelWrapper from '../../composables/useModelWrapper';
import useGeneratedId from '../../composables/useGeneratedId';
import useFieldData from '../../composables/useFieldData';

/**
 * A binary input, part of a single-select group.
 *
 * Typical use will involve using `v-for` to loop through an array of items and output a Radio
 * component for each one. Each Radio will have the same `v-model` binding and `name` prop, but
 * different `inputValue` props and label content.
 *
 * The `v-model` value is the `inputValue` of the Radio that is currently on.
 */
export default defineComponent( {
	name: 'CdxRadio',
	components: { CdxLabel },
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
	setup( props, { emit, slots, attrs } ) {
		useLabelChecker( slots.default?.(), attrs, 'CdxRadio' );

		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-radio--inline': props.inline
			};
		} );

		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

		// Declare template ref.
		const input = ref<HTMLInputElement>();
		const radioId = useGeneratedId( 'radio' );
		const descriptionId = useGeneratedId( 'description' );

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
			computedDisabled,
			input,
			radioId,
			descriptionId,
			focusInput,
			wrappedModel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/binary-input.less';

.cdx-radio {
	// Common binary input styles.
	.cdx-mixin-binary-input();

	// Custom-styled radio that's visible to the user.
	&__icon {
		border-radius: @border-radius-circle;

		// Add `:focus` state's inner circle.
		&::before {
			content: ' ';
			position: absolute;
			top: -@size-25;
			right: -@size-25;
			bottom: -@size-25;
			left: -@size-25;
			border: @border-width-base @border-style-base @border-color-transparent;
			border-radius: @border-radius-circle;
		}
	}

	// HTML `<input type="radio">`.
	// Based on the HTML attributes of the radio input, we can change the style of the adjacent
	// `span`, which will look like a custom-styled radio.
	&__input {
		&:enabled {
			& + .cdx-radio__icon {
				border-color: @border-color-input-binary;
			}

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
					&::before {
						border-color: @border-color-inverted;
					}
				}

				// Put `:active` after `:focus` at 'filled' progressive components. Otherwise a
				// focus outline would be visible when actively clicked.
				&:active + .cdx-radio__icon {
					background-color: @background-color-base;
					border-color: @border-color-progressive--active;

					&::before {
						border-color: @border-color-progressive--active;
					}
				}
			}
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			& ~ .cdx-radio__label {
				color: @color-disabled;
			}

			& + .cdx-radio__icon {
				background-color: @background-color-disabled;
				border-color: @border-color-disabled;
			}

			&:checked + .cdx-radio__icon {
				border-width: @border-width-input-radio--checked;
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
