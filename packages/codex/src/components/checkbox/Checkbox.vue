<template>
	<div class="cdx-checkbox" :class="rootClasses">
		<div class="cdx-checkbox__wrapper">
			<input
				:id="checkboxId"
				ref="input"
				v-model="wrappedModel"
				class="cdx-checkbox__input"
				type="checkbox"
				:aria-describedby="( $slots.description &&
					$slots.description().length > 0 ) ? descriptionId : undefined"
				:value="inputValue"
				:name="name"
				:disabled="computedDisabled"
				:indeterminate.prop="indeterminate"
			>
			<span class="cdx-checkbox__icon" />
			<!-- Only render a Label component if label text has been provided.
			This component can also supply a description to the Checkbox if content
			is provided in the description slot. -->
			<cdx-label
				v-if="$slots.default && $slots.default().length"
				class="cdx-checkbox__label"
				:input-id="checkboxId"
				:description-id="( $slots.description &&
					$slots.description().length > 0 ) ? descriptionId : undefined"
				:disabled="computedDisabled"
				:visually-hidden="hideLabel"
			>
				<!-- @slot Label text. -->
				<slot />
				<template v-if="$slots.description && $slots.description().length > 0" #description>
					<!-- @slot Short description text. -->
					<slot name="description" />
				</template>
			</cdx-label>
		</div>
		<!-- Only render custom input component(s) if custom input has been provided. -->
		<div
			v-if="$slots[ 'custom-input' ]"
			class="cdx-checkbox__custom-input"
			:class="customInputClasses"
		>
			<!-- @slot Custom input. -->
			<slot name="custom-input" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef, computed, useId } from 'vue';
import CdxLabel from '../label/Label.vue';
import useLabelChecker from '../../composables/useLabelChecker';
import useModelWrapper from '../../composables/useModelWrapper';
import useFieldData from '../../composables/useFieldData';
import { ValidationStatusType } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import { ValidationStatusTypes } from '../../constants';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A binary input that can appear by itself or in a multiselect group.
 *
 * Checkboxes can be selected, unselected or in an indeterminate state.
 *
 */
export default defineComponent( {
	name: 'CdxCheckbox',
	components: { CdxLabel },
	props: {
		/**
		 * Value of the checkbox or checkbox group.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ Boolean, Array ] as PropType<boolean | ( string|number )[]>,
			default: false
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
		 */
		name: {
			type: String,
			default: null
		},
		/**
		 * Whether the disabled attribute should be added to the input.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the indeterminate visual state should be displayed.
		 *
		 * This is unrelated to the value provided by `v-model`, and the indeterminate visual state
		 * will override the checked or unchecked visual state.
		 */
		indeterminate: {
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
		},
		/**
		 * Whether the label should be visually hidden.
		 *
		 * When true, the label will remain accessible to assistive technology.
		 */
		hideLabel: {
			type: Boolean,
			default: false
		},
		/**
		 * Validation status of the Checkbox.
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		}
	},
	emits: [
		/**
		 * Emitted when modelValue changes.
		 *
		 * @property {boolean | string[] | number[]} modelValue The new model value
		 */
		'update:modelValue'
	],
	setup( props, { emit, slots, attrs } ) {
		useLabelChecker( slots.default?.(), attrs, 'CdxCheckbox' );

		const {
			computedDisabled,
			computedStatus
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' )
		);

		const rootClasses = computed( (): Record<string, boolean> => ( {
			'cdx-checkbox--inline': props.inline,
			[ `cdx-checkbox--status-${ computedStatus.value }` ]: true
		} ) );

		const customInputClasses = computed( (): Record<string, boolean> => ( {
			'cdx-checkbox__custom-input--inline': props.inline
		} ) );

		// Declare template ref.
		const input = ref<HTMLInputElement>();
		const checkboxId = useId();
		const descriptionId = useId();

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the `<input>` element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		return {
			rootClasses,
			computedDisabled,
			input,
			checkboxId,
			descriptionId,
			wrappedModel,
			customInputClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/binary-input.less';

.cdx-checkbox {
	.cdx-mixin-binary-input();

	// Custom-styled checkbox that's visible to the user. More styles are added below depending on
	// the state of the `<input>` element.
	&__icon {
		border-radius: @border-radius-base;
	}

	// HTML `<input type="checkbox">`.
	// Based on the HTML attributes of the checkbox input, we can change the style of the adjacent
	// `span`, which will look like a custom-styled checkbox.
	&__input {
		// Indeterminate state.
		&:indeterminate + .cdx-checkbox__icon::before {
			content: ' ';
			// Indeterminate is constructed as a line based on background color.
			background-color: @background-color-base-fixed;
			position: absolute;
			// Center indeterminate line vertically with negative half pixel.
			top: calc( @size-half - ( @size-absolute-1 / 2 ) );
			// Center horizontally.
			right: calc( @spacing-25 - @border-width-base );
			left: calc( @spacing-25 - @border-width-base );
			/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
			height: ( @size-absolute-1 * 2 );
		}

		// The tick. As pseudo-element.
		// Checked state whether or not the input is enabled or disabled.
		&:checked:not( :indeterminate ) + .cdx-checkbox__icon::before {
			content: ' ';
			// Enable sizing pseudo-element.
			display: block;
			width: @size-25;
			height: calc( @size-full - @spacing-25 - @border-width-thick );
			// Center vertically.
			margin: 0 auto @spacing-25;
			/* rtl:ignore */
			border-right-width: @border-width-thick;
			/* rtl:ignore */
			border-right-style: @border-style-base;
			border-bottom-width: @border-width-thick;
			border-bottom-style: @border-style-base;
			/* rtl:ignore */
			transform: @transform-checkbox-tick--checked;
		}

		/* stylelint-disable no-descending-specificity */
		&:enabled {
			& + .cdx-checkbox__icon {
				background-color: @background-color-base;
				border-color: @border-color-interactive;
			}

			&:hover + .cdx-checkbox__icon {
				background-color: @background-color-interactive-subtle--hover;
				border-color: @border-color-interactive--hover;
			}

			&:focus:not( :active ) + .cdx-checkbox__icon {
				border-color: @border-color-progressive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				// In Windows high contrast mode the outline becomes visible.
				outline: @outline-base--focus;
			}

			&:active + .cdx-checkbox__icon {
				background-color: @background-color-interactive-subtle--active;
				border-color: @border-color-interactive--active;
			}

			&:checked,
			&:indeterminate {
				& + .cdx-checkbox__icon {
					background-color: @background-color-progressive;
					border-color: @border-color-transparent;
				}

				&:hover + .cdx-checkbox__icon {
					background-color: @background-color-progressive--hover;
				}

				&:focus:not( :active ):not( :hover ) + .cdx-checkbox__icon {
					background-color: @background-color-progressive;
				}

				&:focus:not( :active ) + .cdx-checkbox__icon {
					// Make `box-shadow` feature a `1px` White inset outline with a
					// value combination.
					/* stylelint-disable-next-line @stylistic/declaration-colon-newline-after,
						@stylistic/value-list-comma-newline-after */
					box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
						@box-shadow-inset-medium @box-shadow-color-inverted;
				}

				&:active + .cdx-checkbox__icon {
					background-color: @background-color-progressive--active;
				}
			}

			&:checked:not( :indeterminate ) + .cdx-checkbox__icon::before {
				border-color: @border-color-inverted-fixed;
			}

			.cdx-checkbox--status-error & {
				& ~ .cdx-checkbox__label {
					color: @color-error;
				}

				& + .cdx-checkbox__icon {
					background-color: @background-color-error-subtle;
					border-color: @border-color-error;
				}

				&:hover + .cdx-checkbox__icon {
					background-color: @background-color-error-subtle--hover;
					border-color: @border-color-error--hover;
				}

				&:focus + .cdx-checkbox__icon {
					border-color: @border-color-progressive--focus;
				}

				&:active + .cdx-checkbox__icon {
					background-color: @background-color-error-subtle--active;
					border-color: @border-color-error--active;
				}

				&:checked,
				&:indeterminate {
					& + .cdx-checkbox__icon {
						background-color: @background-color-error;
						border-color: @border-color-transparent;
					}

					&:hover + .cdx-checkbox__icon {
						background-color: @background-color-error--hover;
					}

					&:active + .cdx-checkbox__icon {
						background-color: @background-color-error--active;
					}

					&:focus:not( :active ) + .cdx-checkbox__icon {
						background-color: @background-color-error;
						border-color: @border-color-progressive--focus;
					}
				}
			}
		}

		&:disabled {
			& + .cdx-checkbox__icon {
				background-color: @background-color-disabled-subtle;
				border-color: @border-color-disabled;
			}

			&:checked,
			&:indeterminate {
				& + .cdx-checkbox__icon {
					background-color: @background-color-disabled;
					border-color: @border-color-transparent;
				}
			}

			&:checked:not( :indeterminate ) + .cdx-checkbox__icon::before {
				border-right-color: @color-disabled;
				border-bottom-color: @color-disabled;
			}

			&:indeterminate + .cdx-checkbox__icon::before {
				background-color: @color-disabled-emphasized;
			}

			// DEPRECATED: Support CSS-only components that don't set the `cdx-label` class on the
			// label (T353885)
			& ~ .cdx-checkbox__label,
			& ~ .cdx-checkbox__label.cdx-label {
				color: @color-disabled;
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
