<template>
	<label
		class="cdx-radio"
		:class="rootClasses"
		:aria-disabled="disabled"
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
		 * Value provided by v-model binding in the parent component.
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
		 * Emitted when v-model value changes.
		 */
		'update:modelValue'
	],
	setup( props, { emit } ) {
		const rootClasses = computed( (): Record<string, boolean> => {
			return {
				'cdx-radio--inline': !!props.inline
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

<style lang="postcss">
/*
* TODO: Remove references to wikimedia-ui-base once we have
* the proper tokens in place
*/
@import './../../themes/mixins/binary-input.postcss';

/* Wrapper `label`. */
.cdx-radio {
	/* Common binary input styles. */
	@mixin binary-input;

	/* Custom-styled radio that's visible to the user. */
	&__icon {
		border-radius: var( --border-radius-input-radio );
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		transition-property: background-color, border-color, border-width;
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		transition-duration: var( --transition-base );

		/* Add `:focus` state's inner circle. */
		&:before {
			content: ' ';
			position: absolute;
			top: var( --position-offset-input-radio-focus );
			right: var( --position-offset-input-radio-focus );
			bottom: var( --position-offset-input-radio-focus );
			left: var( --position-offset-input-radio-focus );
			border: var( --border-width-base ) var( --border-style-base ) transparent;
			border-radius: var( --border-radius-input-radio );
		}
	}

	/*
	* HTML `<input type="radio">`.
	* Based on the HTML attributes of the radio input, we can change the style of the adjacent
	* `span`, which will look like a custom-styled radio.
	*/
	&__input {
		&:disabled {
			& ~ .cdx-radio__label-content {
				color: var( --color-base--disabled );
			}

			& + .cdx-radio__icon {
				background-color: var( --background-color-filled--disabled );
				border-color: var( --border-color-base--disabled );
			}

			&:checked + .cdx-radio__icon {
				background-color: var( --background-color-base );
				border-width: var( --border-width-input-radio--checked );
			}
		}

		&:enabled {
			&:checked + .cdx-radio__icon {
				border-width: var( --border-width-input-radio--checked );
				border-color: var( --border-color-input-binary--checked );
			}

			/* Note: there is no focus behavior for the input in its unchecked state because you
			can't focus on it without selecting it. */
			&:hover + .cdx-radio__icon,
			&:checked:hover + .cdx-radio__icon {
				border-color: var( --border-color-input-binary--hover );
			}

			&:checked:focus + .cdx-radio__icon {
				&:before {
					border-color: var( --border-color-inset--focus );
				}
			}
		}
	}

	/* Styles for when `label` is active (being pressed). */
	&:active &__input:enabled {
		& + .cdx-radio__icon {
			background-color: var( --background-color-input-binary--active );
			border-color: var( --border-color-input-binary--active );
		}

		&:checked + .cdx-radio__icon {
			background-color: var( --background-color-base );
			border-color: var( --border-color-input-binary--active );

			&:before {
				border-color: var( --border-color-input-binary--active );
			}
		}
	}
}
</style>
