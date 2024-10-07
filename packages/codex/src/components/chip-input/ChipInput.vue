<template>
	<div
		ref="rootElement"
		class="cdx-chip-input"
		:class="rootClasses"
		:style="rootStyle"
		@click="focusInput"
		@focusout="onFocusOut"
	>
		<div
			ref="chipsContainer"
			class="cdx-chip-input__chips"
			role="listbox"
			aria-orientation="horizontal"
		>
			<cdx-input-chip
				v-for="( chip, index ) in inputChips"
				:key="chip.value"
				:ref="( ref ) => assignChipTemplateRef( ref, index )"
				class="cdx-chip-input__item"
				:icon="chip.icon"
				:disabled="computedDisabled"
				@click-chip="handleChipClick( chip )"
				@remove-chip="( method ) => handleChipRemove( chip, index, method )"
				@arrow-left="moveChipFocus( 'left', index )"
				@arrow-right="moveChipFocus( 'right', index )"
			>
				{{ chip.label ?? chip.value }}
			</cdx-input-chip>

			<input
				v-if="!separateInput"
				ref="input"
				v-model="computedInputValue"
				class="cdx-chip-input__input"
				:disabled="computedDisabled"
				v-bind="otherAttrs"
				@blur="onInputBlur"
				@focus="onInputFocus"
				@keydown="onInputKeydown"
			>
		</div>

		<div
			v-if="separateInput"
			ref="separateInputWrapper"
			class="cdx-chip-input__separate-input"
		>
			<input
				ref="input"
				v-model="computedInputValue"
				class="cdx-chip-input__input"
				:disabled="computedDisabled"
				v-bind="otherAttrs"
				@blur="onInputBlur"
				@focus="onInputFocus"
				@keydown="onInputKeydown"
			>
		</div>
		<!-- Hidden status element (aria live region) for screen readers. -->
		<div
			class="cdx-chip-input__aria-status"
			role="status"
			aria-live="polite"
		>
			{{ statusMessageContent }}
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, toRef, inject, nextTick, ComponentPublicInstance, PropType } from 'vue';
import CdxInputChip from '../input-chip/InputChip.vue';
import { ValidationStatusTypes, AllowArbitraryKey } from '../../constants';
import { ChipInputItem, ChipValidator, ValidationStatusType } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';
import useComputedDirection from '../../composables/useComputedDirection';
import useOptionalModelWrapper from '../../composables/useOptionalModelWrapper';
import useI18n from '../../composables/useI18n';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * An input field which accepts multiple values and displays them as individual
 * chip elements.
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
		 * Current chips present in the input.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		inputChips: {
			type: Array as PropType<ChipInputItem[]>,
			required: true
		},
		/**
		 * Current value of the text input. This prop is optional and should only be used if you
		 * need to keep track of the text input value for some reason (e.g. for validation).
		 *
		 * Optionally provided by `v-model:input-value` binding in the parent component.
		 */
		inputValue: {
			type: [ String, Number ] as PropType<string|number>,
			default: null
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
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		},
		/**
		 * Validation function for chip text. If it returns false, the chip will not be added and
		 * the error status will be set.
		 */
		chipValidator: {
			type: Function as PropType<ChipValidator>,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			default: ( value: string|number ) => true
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
		'update:input-chips',
		/**
		 * When the input value changes. Only emitted if the inputValue prop is provided.
		 *
		 * @property {string | number} inputValue The new input value
		 */
		'update:input-value'
	],
	setup( props, { emit, attrs } ) {
		const rootElement = ref<HTMLDivElement>();
		const chipsContainer = ref<HTMLDivElement>();
		const separateInputWrapper = ref<HTMLDivElement>();
		const statusMessageContent = ref( '' );
		const computedDirection = useComputedDirection( rootElement );
		const input = ref<HTMLInputElement>();

		// Whether to allow arbitrary chips. This is true by default, but can be set to false if
		// needed (e.g. for the MultiselectLookup, where chips are only added via a menu).
		const allowArbitrary = inject( AllowArbitraryKey, ref( true ) );

		// Ref used if the inputValue prop is omitted.
		const internalInputValue = ref<string|number>( '' );
		const computedInputValue = useOptionalModelWrapper(
			internalInputValue,
			toRef( props, 'inputValue' ),
			emit,
			'update:input-value'
		);

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
				[ `cdx-chip-input--status-${ computedStatus.value }` ]: true,
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

		const chipRefs: InstanceType<typeof CdxInputChip>[] = [];

		const currentChipToRemove = ref<ChipInputItem | null>( null );
		const computedChipToRemove = computed( () => currentChipToRemove.value ? currentChipToRemove.value.value : '' );

		const chipAddedMessage = useI18n(
			'cdx-chip-input-chip-added',
			( x ) => `Chip ${ x } was added.`,
			[ computedInputValue ]
		);
		const chipRemovedMessage = useI18n(
			'cdx-chip-input-chip-removed',
			( x ) => `Chip ${ x } was removed.`,
			[ computedChipToRemove ]
		);

		function assignChipTemplateRef(
			chip: Element | ComponentPublicInstance | null,
			index: number
		) {
			if ( chip !== null ) {
				chipRefs[ index ] = chip as InstanceType<typeof CdxInputChip>;
			}
		}

		const focusInput = (): void => {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			input.value!.focus();
		};

		/**
		 * Adds a new chip with the current input value, then clears the input.
		 */
		function addChip() {
			if (
				// If the input value is the same as a chip's value, or...
				!!props.inputChips.find( ( chip ) => chip.value === computedInputValue.value ) ||
				// ...validation fails, set status to error.
				!props.chipValidator( computedInputValue.value )
			) {
				validatedStatus.value = 'error';
			} else if ( computedInputValue.value.toString().length > 0 ) {
				statusMessageContent.value = chipAddedMessage.value;

				emit( 'update:input-chips', props.inputChips.concat( { value: computedInputValue.value } ) );
				computedInputValue.value = '';
			}
		}

		function removeChip( chipToRemove: ChipInputItem ) {
			emit( 'update:input-chips', props.inputChips.filter(
				( chip ) => chip.value !== chipToRemove.value
			) );
		}

		function moveChipFocus( direction: 'left' | 'right', startIndex: number ) {
			const resolvedDirection =
				// -1 for prev (left in LTR, right in RTL), +1 for next (right in LTR, left in RTL)
				( computedDirection.value === 'ltr' && direction === 'left' ) ||
				( computedDirection.value === 'rtl' && direction === 'right' ) ?
					-1 : 1;
			const newIndex = startIndex + resolvedDirection;
			if ( newIndex < 0 ) {
				return;
			}
			if ( newIndex >= props.inputChips.length ) {
				focusInput();
				return;
			}
			chipRefs[ newIndex ].focus();
		}

		async function handleChipClick( clickedChip: ChipInputItem ) {
			// Remove the chip but add the text to the input so it can be edited.
			// If there is a value in the input, add that value as a new chip first
			addChip();
			// Wait for the event emitted by addChip() to propagate and update props.inputChips,
			// otherwise we'll lose the newly added chip when removeChip() fires another event
			await nextTick();
			removeChip( clickedChip );
			computedInputValue.value = clickedChip.label ?? clickedChip.value;
			focusInput();
		}

		function handleChipRemove(
			chipToRemove: ChipInputItem,
			index: number,
			method: 'button' | 'Backspace' | 'Delete'
		) {

			// Update currentChipToRemove ref.
			currentChipToRemove.value = chipToRemove;

			// Announce the chip removal for all methods, including button clicks.
			statusMessageContent.value = chipRemovedMessage.value;

			if ( method === 'button' ) {
				focusInput();
			} else if ( method === 'Backspace' ) {
				// Move the focus to the chip before the deleted one. If the first chip is going
				// to be deleted, move the focus to what will then the first chip. If there are no
				// chips left, focus the input.
				const newIndex = index === 0 ? 1 : index - 1;
				if ( newIndex < props.inputChips.length ) {
					chipRefs[ newIndex ].focus();
				} else {
					focusInput();
				}
			} else if ( method === 'Delete' ) {
				// Move the focus to the chip after the deleted one. If there isn't one (either
				// because there are no chips left, or because the deleted chip was the one at the
				// end), focus the input.
				const newIndex = index + 1;
				if ( newIndex < props.inputChips.length ) {
					chipRefs[ newIndex ].focus();
				} else {
					focusInput();
				}
			}

			removeChip( chipToRemove );
		}

		function onInputKeydown( e: KeyboardEvent ) {
			const prevArrow = computedDirection.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
			switch ( e.key ) {
				case 'Enter':
					if (
						computedInputValue.value.toString().length > 0 &&
						allowArbitrary.value
					) {
						addChip();
						// If the ChipInput is in a <form>, prevent the Enter key from submitting
						// the form if the input is non-empty and we're adding a chip, but allow
						// pressing Enter to submit the form if the input is empty.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
					break;
				case 'Escape':
					input.value?.blur();
					e.preventDefault();
					e.stopPropagation();
					return;
				case 'Backspace':
				case prevArrow:
					// Only make backspace / arrow move to a chip if the cursor is at the start of
					// the input
					if (
						input.value?.selectionStart === 0 &&
						input.value.selectionEnd === 0 &&
						props.inputChips.length > 0
					) {
						chipRefs[ props.inputChips.length - 1 ].focus();
						e.preventDefault();
						e.stopPropagation();
						return;
					}
					break;
			}
		}

		function onInputFocus() {
			isFocused.value = true;
		}

		function onInputBlur() {
			isFocused.value = false;
		}

		function onFocusOut( e: FocusEvent ) {
			// When the focus leaves the component (goes from an element inside the component to
			// an element outside the component), turn any text in the input into a chip.
			// We don't do this in onInputBlur() because that is also called when the focus moves
			// from the input to one of the chips.
			if (
				!rootElement.value?.contains( e.relatedTarget as Node ) &&
				allowArbitrary.value
			) {
				addChip();
			}
		}

		watch( toRef( props, 'inputChips' ), ( newVal ) => {
			// Check if there are any duplicates between the chips and the input value. If so, set
			// the status to 'error'. If not, set to 'default'.
			// This covers the case of adding chip with value 'asdf', typing 'asdf' into the input
			// (which changes the status to error), then removing the 'asdf' chip. In this case,
			// the status should be changed back to default.
			const matchingChip = newVal.find( ( chip ) => chip.value === computedInputValue.value );
			validatedStatus.value = matchingChip ? 'error' : 'default';
		} );

		watch( computedInputValue, () => {
			// Clear the error state when the input value is changed.
			if ( validatedStatus.value === 'error' ) {
				validatedStatus.value = 'default';
			}
		} );

		return {
			rootElement,
			chipsContainer,
			separateInputWrapper,
			input,
			computedInputValue,
			rootClasses,
			rootStyle,
			otherAttrs,
			assignChipTemplateRef,
			handleChipClick,
			handleChipRemove,
			moveChipFocus,
			onInputKeydown,
			focusInput,
			onInputFocus,
			onInputBlur,
			onFocusOut,
			computedDisabled,
			statusMessageContent
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/button-group.less';
@import ( reference ) '../../themes/mixins/common.less';

// TODO: create a component-level design token.
@spacing-vertical-input-chip: @spacing-25 - @border-width-base;

.cdx-chip-input {
	// Set the border radius on the root element so the useFloatingMenu composable can unset them
	// when a menu opens above or below it, as in MultiselectLookup.
	border-radius: @border-radius-base;

	// Cover up the sharp corners of the child elements that have borders (the chips container and
	// the separate input). We need the borders to be on these elements so interactive border styles
	// work properly, but the outer border radius has to be on the root element as stated above.
	overflow: hidden;

	// Common styles for the chip wrapper and separate input, regardless of disabled status.
	&__chips,
	&__separate-input {
		box-sizing: @box-sizing-base;
		min-width: @min-width-medium;
		min-height: @min-size-interactive-pointer;
		border-width: @border-width-base;
		border-style: @border-style-base;
		padding: @spacing-vertical-input-chip @spacing-50;
		line-height: @line-height-x-small;
	}

	&__chips {
		display: flex;
		flex: 1 auto;
		flex-flow: wrap;
		gap: @spacing-50;
	}

	&__input {
		background-color: @background-color-transparent;
		color: @color-base;
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
			// Make it look like there's a 1px border between the chips container and the separate
			// input.
			margin-bottom: @position-offset-border-width-base;
		}

		.cdx-chip-input__input {
			width: @size-full;
		}
	}

	&__aria-status {
		.screen-reader-text();
	}

	&:not( .cdx-chip-input--disabled ) {
		.cdx-chip-input__chips,
		.cdx-chip-input__separate-input {
			border-color: @border-color-base;
			box-shadow: @box-shadow-inset-small @box-shadow-color-transparent;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-medium;
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

		&.cdx-chip-input--focused {
			&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
			&.cdx-chip-input--has-separate-input .cdx-chip-input__separate-input {
				border-color: @border-color-progressive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				outline: @outline-base--focus;
			}
		}

		// Apply error and error :hover styles, but only when not focused.
		&.cdx-chip-input--status-error:not( .cdx-chip-input--focused ) {
			&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
			&.cdx-chip-input--has-separate-input .cdx-chip-input__separate-input {
				color: @color-error;
				border-color: @border-color-error;

				&:hover {
					border-color: @border-color-error--hover;
				}
			}
		}
	}

	&--disabled {
		/* stylelint-disable-next-line no-descending-specificity */
		.cdx-chip-input__chips,
		.cdx-chip-input__separate-input {
			background-color: @background-color-disabled-subtle;
			border-color: @border-color-disabled;

			.cdx-chip-input__input {
				color: @color-disabled;
				-webkit-text-fill-color: @color-disabled;
			}
		}
	}
}
</style>
