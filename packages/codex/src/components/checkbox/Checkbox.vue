<template>
	<span class="cdx-checkbox" :class="rootClasses">
		<input
			:id="checkboxId"
			ref="input"
			v-model="wrappedModel"
			class="cdx-checkbox__input"
			type="checkbox"
			:value="inputValue"
			:disabled="disabled"
			:indeterminate.prop="indeterminate"
			@keydown.prevent.enter="clickInput"
		>
		<!-- eslint-disable-next-line vue/html-self-closing -->
		<span class="cdx-checkbox__icon"></span>
		<label class="cdx-checkbox__label" :for="checkboxId">
			<!-- @slot Input label content -->
			<slot />
		</label>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef, computed } from 'vue';
import useModelWrapper from '../../composables/useModelWrapper';
import useGeneratedId from '../../composables/useGeneratedId';

/**
 * A binary input that can be standalone or in a multiselect group.
 *
 * When in a group, any number of checkboxes can be checked at a time.
 *
 * Typical use will involve using `v-for` to loop through an array of items and
 * output a Checkbox component for each one. Each Checkbox will have the same
 * `v-model` prop, but different `inputValue` props and label content.
 *
 * For a single checkbox, the `v-model` value will be a boolean `true` when the
 * checkbox is checked and `false` when unchecked.
 *
 * For multiple checkboxes, the `v-model` value will be an array of the
 * `inputValue` props of any currently checked checkboxes (or an empty array if
 * no checkboxes are  checked).
 */
export default defineComponent( {
	name: 'CdxCheckbox',
	props: {
		/**
		 * Value of the checkbox or checkbox group.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ Boolean, Array ] as PropType<boolean | string[] | number[]>,
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
	setup( props, { emit } ) {
		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-checkbox--inline': props.inline
			};
		} );

		// Declare template ref.
		const input = ref<HTMLInputElement>();
		const checkboxId = useGeneratedId( 'checkbox' );

		/**
		 * Click (and toggle) the input.
		 */
		const clickInput = () => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			input.value!.click();
		};

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the input element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		return {
			rootClasses,
			input,
			checkboxId,
			clickInput,
			wrappedModel
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
	// the state of the input element.
	&__icon {
		background-size: 0 0;
		border-radius: @border-radius-base;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-base;
	}

	// HTML `<input type="checkbox">`.
	// Based on the HTML attributes of the checkbox input, we can change the style of the adjacent
	// `span`, which will look like a custom-styled checkbox.
	&__input {
		// Indeterminate state.
		&:indeterminate + .cdx-checkbox__icon::before {
			content: ' ';
			background-color: @color-inverted;
			position: absolute;
			// Vertically center indeterminate line with negative half pixel.
			top: calc( @size-half - ( @border-width-base / 2 ) );
			right: @start-input-binary-icon;
			left: @start-input-binary-icon;
			height: @border-width-base * 2;
		}

		// Checked state whether or not the input is enabled or disabled.
		&:checked:not( :indeterminate ) + .cdx-checkbox__icon::before {
			content: ' ';
			background-image: @background-image-input-checkbox--checked;
			background-position: @background-position-base;
			background-repeat: no-repeat;
			// This must have two values to match `background-size: 0 0` above,
			// otherwise the transition does not work (at least in Chrome).
			background-size: @size-icon-small @size-icon-small;
			position: absolute;
			// Use `@size-full` as `@size-input-binary` would lead to offset by
			// `@border-width-base`.
			width: @size-full;
			height: @size-full;
		}

		&:enabled {
			&:hover + .cdx-checkbox__icon {
				border-color: @border-color-input-binary--hover;
			}

			&:active + .cdx-checkbox__icon {
				background-color: @background-color-progressive--active;
				border-color: @border-color-progressive--active;
			}

			&:focus:not( :active ) + .cdx-checkbox__icon {
				border-color: @border-color-input-binary--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				// In Windows high contrast mode the outline becomes visible.
				outline: @outline-base--focus;
			}

			/* stylelint-disable no-descending-specificity */
			&:checked,
			&:indeterminate {
				& + .cdx-checkbox__icon {
					background-color: @background-color-input-binary--checked;
					border-color: @border-color-input-binary--checked;
				}

				&:hover + .cdx-checkbox__icon {
					background-color: @background-color-progressive--hover;
					border-color: @border-color-input-binary--hover;
				}

				&:active + .cdx-checkbox__icon {
					background-color: @background-color-progressive--active;
					border-color: @border-color-progressive--active;
				}

				&:focus:not( :active ):not( :hover ) + .cdx-checkbox__icon {
					background-color: @background-color-input-binary--checked;
					border-color: @border-color-input-binary--checked;
				}

				&:focus:not( :active ) + .cdx-checkbox__icon {
					// Make `box-shadow` feature a `1px` White inset outline with a
					// value combination.
					/* stylelint-disable-next-line value-list-comma-newline-after */
					box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus,
						@box-shadow-inset-medium @box-shadow-color-inverted;
				}
			}
			/* stylelint-enable no-descending-specificity */
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			& + .cdx-checkbox__icon {
				background-color: @background-color-disabled;
				border-color: @border-color-disabled;
			}

			& ~ .cdx-checkbox__label {
				color: @color-disabled;
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
