<template>
	<span class="cdx-checkbox" :class="rootClasses">
		<label
			ref="label"
			class="cdx-checkbox__label"
			@click="focusInput"
			@keydown.prevent.enter="clickLabel"
		>
			<input
				ref="input"
				v-model="wrappedModel"
				class="cdx-checkbox__input"
				type="checkbox"
				:value="inputValue"
				:disabled="disabled"
				:indeterminate.prop="indeterminate"
			>
			<span class="cdx-checkbox__icon" />
			<span class="cdx-checkbox__label-content">
				<!-- @slot Input label content -->
				<slot />
			</span>
		</label>
	</span>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef, computed } from 'vue';
import useModelWrapper from '../../composables/useModelWrapper';

/**
 * A binary input that can exist by itself or in a group. When in a group, any
 * number of checkboxes can be checked at a time.
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
				'cdx-checkbox--inline': !!props.inline
			};
		} );

		// Declare template ref.
		const input = ref<HTMLInputElement>();
		const label = ref<HTMLLabelElement>();

		/**
		 * When the label is clicked, focus on the input.
		 *
		 * This doesn't happen automatically in Firefox or Safari.
		 */
		const focusInput = () => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			input.value!.focus();
		};

		/**
		 * On enter keydown, click the label to toggle the input.
		 */
		const clickLabel = () => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			label.value!.click();
		};

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the input element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		return {
			rootClasses,
			input,
			label,
			focusInput,
			clickLabel,
			wrappedModel
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import './../../themes/mixins/binary-input.less';

// Wrapper `<label>`.
.cdx-checkbox {
	.cdx-mixin-binary-input();

	// Custom-styled checkbox that's visible to the user. More styles are added below depending on
	// the state of the input element.
	&__icon {
		background-size: 0 0;
		border-radius: @border-radius-base;
		transition: @transition-base;
		transition-property: @transition-property-base;
	}

	// HTML `<input type="checkbox">`.
	// Based on the HTML attributes of the checkbox input, we can change the style of the adjacent
	// `span`, which will look like a custom-styled checkbox.
	&__input {
		// Checked state whether or not the input is enabled or disabled.
		&:checked + .cdx-checkbox__icon:before {
			content: ' ';
			background-image: @background-image-input-checkbox;
			background-position: center;
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

		// Indeterminate state.
		&:indeterminate + .cdx-checkbox__icon:before {
			content: ' ';
			background-color: @color-base--inverted;
			position: absolute;
			top: 50%;
			right: @start-input-binary-icon;
			left: @start-input-binary-icon;
			height: @border-width-base * 2;
			margin-top: -@border-width-base;
		}

		&:enabled {
			&:hover + .cdx-checkbox__icon {
				border-color: @border-color-input-binary--hover;
			}

			&:focus + .cdx-checkbox__icon {
				border-color: @border-color-input-binary--focus;
				box-shadow: @box-shadow-base--focus;
				// In Windows high contrast mode the outline becomes visible.
				outline: @outline-base--focus;
			}

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

				&:focus + .cdx-checkbox__icon {
					background-color: @background-color-input-binary--checked;
					border-color: @border-color-input-binary--checked;
					box-shadow: @box-shadow-progressive--focus;
				}
			}

			// Override states with higher specificity to DRY up. Put `:active`
			// after `:focus` at 'filled' progressive components. Otherwise a focus outline
			// would be visible when actively clicked.
			/* stylelint-disable no-descending-specificity */
			&,
			&:checked,
			&:indeterminate {
				&:active + .cdx-checkbox__icon {
					background-color: @background-color-progressive--active;
					border-color: @border-color-progressive--active;
					box-shadow: @box-shadow-base--active;
				}
			}
			/* stylelint-enable no-descending-specificity */
		}

		/* stylelint-disable no-descending-specificity */
		&:disabled {
			& + .cdx-checkbox__icon {
				background-color: @background-color-filled--disabled;
				border-color: @border-color-base--disabled;
			}

			& ~ .cdx-checkbox__label-content {
				color: @color-base--disabled;
			}
		}
		/* stylelint-enable no-descending-specificity */
	}
}
</style>
