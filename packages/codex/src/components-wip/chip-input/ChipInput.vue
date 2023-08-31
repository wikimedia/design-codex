<template>
	<div
		class="cdx-chip-input"
		:class="rootClasses"
		:style="rootStyle"
		@click="focusInput"
	>
		<div
			class="cdx-chip-input__chips"
			role="listbox"
			aria-orientation="horizontal"
		>
			<cdx-input-chip
				v-for="chip in inputChips"
				:key="chip.value"
				class="cdx-chip-input__item"
				:chip-aria-description="chipAriaDescription"
				:icon="chip.icon"
				:disabled="computedDisabled"
				@click-chip="handleChipClick( chip )"
				@remove-chip="removeChip( chip )"
			>
				{{ chip.value }}
			</cdx-input-chip>

			<input
				v-if="!separateInput"
				ref="input"
				v-model="inputValue"
				class="cdx-chip-input__input"
				:disabled="computedDisabled"
				v-bind="otherAttrs"
				@blur="onBlur"
				@focus="onFocus"
				@keydown="onKeydown"
				@keydown.enter="addChip"
			>
		</div>

		<div v-if="separateInput" class="cdx-chip-input__separate-input">
			<input
				ref="input"
				v-model="inputValue"
				class="cdx-chip-input__input"
				:disabled="computedDisabled"
				v-bind="otherAttrs"
				@blur="onBlur"
				@focus="onFocus"
				@keydown="onKeydown"
				@keydown.enter="addChip"
			>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch, toRef } from 'vue';
import CdxInputChip from '../input-chip/InputChip.vue';
import { ValidationStatusTypes } from '../../constants';
import { ChipInputItem, ValidationStatusType } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * Input for an array of items.
 */
export default defineComponent( {
	name: 'CdxChipInput',
	components: {
		CdxInputChip
	},
	/**
	 * We want the input to inherit attributes, not the root element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * `aria-description` of each input chip.
		 *
		 * Text must be provided for accessibility purposes. This prop is temporary and will be
		 * removed once T345386 is resolved.
		 */
		chipAriaDescription: {
			type: String,
			required: true
		},
		/**
		 * Current chips present in the input.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		inputChips: {
			type: Array as PropType<ChipInputItem[]>,
			default: function () {
				return [];
			}
		},
		/**
		 * Whether the text input should appear below the set of input chips.
		 *
		 * By default, the input chips are inline with the input.
		 */
		separateInput: {
			type: Boolean,
			default: false
		},
		/**
		 * `status` attribute of the input.
		 *
		 * @values 'default', 'error'
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		},
		/**
		 * Whether the input is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * When the input chips change.
		 *
		 * @property {ChipInputItem[]} inputChips The new set of inputChips
		 */
		'update:input-chips'
	],
	setup( props, { emit, attrs } ) {
		const input = ref<HTMLInputElement>();
		// The value in the input element.
		const inputValue = ref( '' );
		// Internally validated status. Currently only changes to 'error' when there are duplicates.
		const validatedStatus = ref( 'default' );
		const internalStatus = computed( () => {
			if ( validatedStatus.value === 'error' || props.status === 'error' ) {
				return 'error';
			}
			return 'default';
		} );
		const { computedDisabled, computedStatus } = useFieldData( toRef( props, 'disabled' ), internalStatus );
		// Whether the input is focused.
		const isFocused = ref( false );

		const internalClasses = computed( () => {
			return {
				'cdx-chip-input--has-separate-input': props.separateInput,
				[ `cdx-chip-input--status-${computedStatus.value}` ]: true,
				// We need focused and disabled classes on the root element, which contains the
				// chips and the input, since it is styled to look like the input.
				'cdx-chip-input--focused': isFocused.value,
				'cdx-chip-input--disabled': computedDisabled.value
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const focusInput = (): void => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			input.value!.focus();
		};

		/**
		 * Adds a new chip with the current input value, then clears the input.
		 */
		function addChip() {
			// If the input value is the same as a chip's value, set error status.
			if ( props.inputChips.find( ( chip ) => chip.value === inputValue.value ) ) {
				validatedStatus.value = 'error';
			} else if ( inputValue.value.length > 0 ) {
				emit( 'update:input-chips', props.inputChips.concat( { value: inputValue.value } ) );
				inputValue.value = '';
			}
		}

		function removeChip( chipToRemove: ChipInputItem ) {
			emit( 'update:input-chips', props.inputChips.filter(
				( chip ) => chip.value !== chipToRemove.value
			) );
			focusInput();
		}

		function handleChipClick( clickedChip: ChipInputItem ) {
			// Remove the chip but add the text to the input so it can be edited.
			// Note that, if there was a value in the input when the chip was clicked, the onBlur
			// handler has already handled adding that text as a new chip.
			removeChip( clickedChip );
			inputValue.value = clickedChip.value;
		}

		function onKeydown() {
			// Clear the error state when the input value is changed.
			if ( validatedStatus.value === 'error' ) {
				validatedStatus.value = 'default';
			}
		}

		function onFocus() {
			isFocused.value = true;
		}

		/**
		 * Handle input blur.
		 *
		 * Note that this runs when the user clicks on an input chip, before handleChipClick().
		 */
		function onBlur() {
			isFocused.value = false;
			addChip();
		}

		watch( toRef( props, 'inputChips' ), ( newVal ) => {
			// Check if there are any duplicates between the chips and the input value. If so, set
			// the status to 'error'. If not, set to 'default'.
			// This covers the case of adding chip with value 'asdf', typing 'asdf' into the input
			// (which changes the status to error), then removing the 'asdf' chip. In this case,
			// the status should be changed back to default.
			const matchingChip = newVal.find( ( chip ) => chip.value === inputValue.value );
			validatedStatus.value = matchingChip ? 'error' : 'default';
		} );

		return {
			input,
			inputValue,
			rootClasses,
			rootStyle,
			otherAttrs,
			handleChipClick,
			addChip,
			removeChip,
			onKeydown,
			focusInput,
			onFocus,
			onBlur,
			computedDisabled
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/button-group.less';

// TODO: create a component-level design token.
@spacing-vertical-input-chip: @spacing-25 - @border-width-base;

.cdx-chip-input {
	// Common styles for the chip wrapper and separate input, regardless of disabled status.
	&__chips,
	&__separate-input {
		box-sizing: @box-sizing-base;
		min-width: @min-width-medium;
		min-height: @min-size-interactive-pointer;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-radius: @border-radius-base;
		padding: @spacing-vertical-input-chip @spacing-50;
		line-height: @line-height-x-small;
	}

	&__chips {
		display: flex;
		flex: 1 auto;
		flex-flow: wrap;
		gap: @spacing-25;
	}

	&__input {
		flex-grow: inherit;
		border: 0;
		font-family: inherit;
		font-size: inherit;
		// This is necessary to ensure that the root element is the proper height. Instead of
		// using line height to provide breathing room for the text, we use padding on the root
		// element.
		/* stylelint-disable-next-line scale-unlimited/declaration-strict-value */
		line-height: 1;

		&:focus {
			outline: @outline-base--focus;
		}

		// Normalize placeholder styling, see T139034.
		&::placeholder {
			color: @color-placeholder;
			opacity: @opacity-base;
		}
	}

	&--has-separate-input {
		.cdx-chip-input__chips {
			margin-bottom: @position-offset-border-width-base;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}

		.cdx-chip-input__separate-input {
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		}
	}

	&:not( .cdx-chip-input--disabled ) {
		.cdx-chip-input__chips,
		.cdx-chip-input__separate-input {
			border-color: @border-color-base;
			box-shadow: @box-shadow-inset-small @box-shadow-color-transparent;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-medium;

			.cdx-chip-input__input {
				background-color: @background-color-base;
			}
		}

		.cdx-chip-input__separate-input {
			background-color: @background-color-base;
		}

		&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips {
			background-color: @background-color-base;
		}

		&.cdx-chip-input--has-separate-input .cdx-chip-input__chips {
			background-color: @background-color-interactive-subtle;
		}

		// For a combined input, show hover, error, and focus styles on the chips wrapper, which
		// contains both the chips and the input.
		// For a separate input, show those styles only on the separate input itself.
		&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
		&.cdx-chip-input--has-separate-input .cdx-chip-input__separate-input {
			&:hover {
				border-color: @border-color-input--hover;
			}
		}

		&.cdx-chip-input--status-error {
			&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
			&.cdx-chip-input--has-separate-input .cdx-chip-input__separate-input {
				border-color: @border-color-error;
			}
		}

		// Focus styles should override error, so they come after the error styles.
		&.cdx-chip-input--focused {
			&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
			&.cdx-chip-input--has-separate-input .cdx-chip-input__separate-input {
				border-color: @border-color-progressive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				outline: @outline-base--focus;
			}
		}

		&.cdx-chip-input--status-error&:not( .cdx-chip-input--focused ) {
			&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
			&.cdx-chip-input--has-separate-input .cdx-chip-input__separate-input {
				color: @color-error;
			}
		}
	}

	&--disabled {
		/* stylelint-disable-next-line no-descending-specificity */
		.cdx-chip-input__chips,
		.cdx-chip-input__separate-input {
			background-color: @background-color-disabled-subtle;
			border-color: @border-color-disabled;

			/* stylelint-disable-next-line no-descending-specificity */
			.cdx-chip-input__input {
				color: @color-disabled;
				-webkit-text-fill-color: @color-disabled;
			}
		}
	}
}
</style>
