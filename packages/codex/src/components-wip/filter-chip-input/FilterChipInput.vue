<template>
	<div
		class="cdx-filter-chip-input"
		:class="rootClasses"
		:style="rootStyle"
	>
		<cdx-filter-chip
			v-for="( chip ) in inputChips"
			:key="chip.value"
			class="cdx-filter-chip-input__item"
			:remove-button-label="removeButtonLabel"
			:icon="chip.icon"
			:disabled="disabled"
			@remove-chip="removeChip( chip )"
		>
			{{ chip.value }}
		</cdx-filter-chip>
		<input
			v-model="inputValue"
			class="cdx-filter-chip-input__input"
			:disabled="disabled"
			v-bind="otherAttrs"
			@blur="onBlur"
			@focus="onFocus"
			@keydown="onKeydown"
			@keydown.enter="onKeydownEnter"
		>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue';
import CdxFilterChip from '../filter-chip/FilterChip.vue';
import { ValidationStatusTypes } from '../../constants';
import { FilterChipInputItem, ValidationStatusType } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import useSplitAttributes from '../../composables/useSplitAttributes';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * Input for an array of items which are provided in the form of filter chips.
 */
export default defineComponent( {
	name: 'CdxFilterChipInput',
	components: {
		CdxFilterChip
	},
	/**
	 * We want the input to inherit attributes, not the root element.
	 */
	inheritAttrs: false,
	props: {
		/**
		 * `aria-label` for the icon-only remove button of each filter chip.
		 *
		 * Text must be provided for accessibility purposes.
		 */
		removeButtonLabel: {
			type: String,
			required: true
		},
		/**
		 * Current filter chips present in the input.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		inputChips: {
			type: Array as PropType<FilterChipInputItem[]>,
			default: function () {
				return [];
			}
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
		'update:input-chips'
	],
	setup( props, { emit, attrs } ) {
		// The value in the input element.
		const inputValue = ref( '' );
		// Internally validated status. Currently only changes to 'error' when there are duplicates.
		const internalStatus = ref( 'default' );
		const computedStatus = computed( () => {
			if ( internalStatus.value === 'error' || props.status === 'error' ) {
				return 'error';
			}
			return 'default';
		} );
		// Whether the input is focused.
		const isFocused = ref( false );

		const internalClasses = computed( () => {
			// We need to do this explicitly, because we are setting the focus/disabled status
			// on the parent div (which contains the chips and the input), not the actual input.
			return {
				[ `cdx-filter-chip-input--status-${computedStatus.value}` ]: true,
				'cdx-filter-chip-input--focused': isFocused.value,
				'cdx-filter-chip-input--disabled': props.disabled
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		function removeChip( chipToRemove: FilterChipInputItem ) {
			emit( 'update:input-chips', props.inputChips.filter(
				( chip ) => chip.value !== chipToRemove.value
			) );
		}

		function onKeydown() {
			// Clear the error state when the input value is changed.
			if ( internalStatus.value === 'error' ) {
				internalStatus.value = 'default';
			}
		}

		/**
		 * Try adding the new chip - if it is a duplicate, an error state
		 * will be thrown and the chip will not be added.
		 */
		function onKeydownEnter() {
			// if the input text is a duplicate
			if ( props.inputChips.find( ( chip ) => chip.value === inputValue.value ) ) {
				internalStatus.value = 'error';
			} else {
				emit( 'update:input-chips', props.inputChips.concat( { value: inputValue.value } ) );
				inputValue.value = '';
			}
		}

		function onFocus() {
			isFocused.value = true;
		}

		function onBlur() {
			isFocused.value = false;
		}

		return {
			inputValue,
			rootClasses,
			rootStyle,
			otherAttrs,
			removeChip,
			onKeydown,
			onKeydownEnter,
			onFocus,
			onBlur
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/button-group.less';

// TODO: create a component-level design token.
@spacing-vertical-filter-chip: @spacing-25 - @border-width-base;

.cdx-filter-chip-input {
	display: flex;
	flex: 1 auto;
	flex-flow: wrap;
	gap: @spacing-25;
	box-sizing: @box-sizing-base;
	min-width: @min-width-medium;
	min-height: @min-size-interactive-pointer;
	border-width: @border-width-base;
	border-style: @border-style-base;
	border-radius: @border-radius-base;
	padding: @spacing-vertical-filter-chip @spacing-50;

	&__input {
		flex-grow: inherit;
		border: 0;
		font-family: inherit;
		font-size: inherit;
		// This is necessary to ensure that the root element is the proper height. Instead of using
		// line height to provide breathing room for the text, we use padding on the root element.
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

	&:not( .cdx-filter-chip-input--disabled ) {
		background-color: @background-color-base;
		border-color: @border-color-base;
		box-shadow: @box-shadow-inset-small @box-shadow-color-transparent;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;

		&:hover {
			border-color: @border-color-input--hover;
		}

		&.cdx-filter-chip-input--status-error {
			border-color: @border-color-destructive;
		}

		&.cdx-filter-chip-input--status-error&:not( .cdx-filter-chip-input--focused ) {
			color: @color-destructive;
		}

		&.cdx-filter-chip-input--focused {
			border-color: @border-color-progressive--focus;
			box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
			outline: @outline-base--focus;
		}
	}

	&--disabled {
		background-color: @background-color-disabled-subtle;
		border-color: @border-color-disabled;

		.cdx-filter-chip-input__input {
			color: @color-disabled;
			-webkit-text-fill-color: @color-disabled;
		}
	}
}
</style>
