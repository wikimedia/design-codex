<template>
	<div
		class="cdx-text-input"
		:class="rootClasses"
		:style="rootStyle"
	>
		<input
			:id="computedInputId"
			ref="input"
			v-model="wrappedModel"
			class="cdx-text-input__input"
			:class="inputClasses"
			v-bind="otherAttrsMinusId"
			:type="inputType"
			:aria-describedby="descriptionId"
			:disabled="computedDisabled"
			@input="onInput"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@keydown="onKeydown"
		>
		<cdx-icon
			v-if="startIcon"
			:icon="startIcon"
			class="cdx-text-input__icon-vue cdx-text-input__start-icon"
		/>
		<cdx-icon
			v-if="endIcon"
			:icon="endIcon"
			class="cdx-text-input__icon-vue cdx-text-input__end-icon"
		/>
		<cdx-icon
			v-if="isClearable"
			:icon="cdxIconClear"
			class="cdx-text-input__icon-vue cdx-text-input__clear-icon"
			@mousedown.prevent
			@click="onClear"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef, computed, inject } from 'vue';
import { Icon, cdxIconClear } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import { TextInputTypes, ValidationStatusTypes, FieldDescriptionIdKey } from '../../constants';
import { TextInputType, ValidationStatusType } from '../../types';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';

const textInputTypeValidator = makeStringTypeValidator( TextInputTypes );
const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A form element that lets users input and edit a single-line text value.
 *
 * `v-model` is used to track the current value of the input. See the events docs for details on
 * emitted events and their properties.
 */
export default defineComponent( {
	name: 'CdxTextInput',
	components: { CdxIcon },
	/**
	 * We want the input to inherit attributes, not the root element.
	 */
	inheritAttrs: false,

	expose: [
		'focus',
		'blur'
	],

	props: {
		/**
		 * Current value of the input.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ String, Number ],
			default: ''
		},
		/**
		 * `type` attribute of the input.
		 *
		 * @values 'text', 'search', 'number', 'email', 'password', 'tel', 'url',
		 * 'week', 'month', 'date', 'datetime-local', 'time'
		 */
		inputType: {
			type: String as PropType<TextInputType>,
			default: 'text',
			validator: textInputTypeValidator
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
		},
		/**
		 * An icon at the start of the input element. Similar to a `::before` pseudo-element.
		 */
		startIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		},
		/**
		 * An icon at the end of the input element. Similar to an `::after` pseudo-element.
		 */
		endIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		},
		/**
		 * Add a clear button at the end of the input element.
		 *
		 * When the clear button is pressed, the input's value is set to an empty string.
		 * The clear button is displayed when input text is present.
		 */
		clearable: {
			type: Boolean,
			default: false
		}
	},
	emits: [
		/**
		 * When the input value changes
		 *
		 * @property {string | number} modelValue The new model value
		 */
		'update:modelValue',
		/**
		 * When the user presses a key.
		 *
		 * This event is not emitted when the user presses the Home or End key (T314728),
		 * but is emitted for Ctrl/Cmd+Home and Ctrl/Cmd+End.
		 *
		 * @property {KeyboardEvent}
		 */
		'keydown',
		/**
		 * When the input value changes via direct use of the input
		 *
		 * @property {InputEvent} event
		 */
		'input',
		/**
		 * When an input value change is committed by the user (e.g. on blur)
		 *
		 * @property {Event} event
		 */
		'change',
		/**
		 * When the input comes into focus
		 *
		 * @property {FocusEvent} event
		 */
		'focus',
		/**
		 * When the input loses focus
		 *
		 * @property {FocusEvent} event
		 */
		'blur',
		/**
		 * When the input value is cleared through the use of the clear button
		 *
		 * @property {MouseEvent} event
		 */
		'clear'
	],
	setup( props, { emit, attrs } ) {
		// If there is a parent Field component, it may be providing some data to this component.
		// Grab computed values of each relevant property.
		const idAttribute = attrs.id as string|undefined;
		const {
			computedDisabled,
			computedStatus,
			computedInputId
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' ),
			idAttribute
		);
		const descriptionId = inject( FieldDescriptionIdKey, undefined );

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the input element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		const isClearable = computed( () => {
			return props.clearable && !!wrappedModel.value && !computedDisabled.value;
		} );

		const internalClasses = computed( () => {
			return {
				'cdx-text-input--has-start-icon': !!props.startIcon,
				'cdx-text-input--has-end-icon': !!props.endIcon,
				'cdx-text-input--clearable': isClearable.value,
				[ `cdx-text-input--status-${computedStatus.value}` ]: true
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		// Normally, we use v-bind to bind otherAttrs to the appropriate element. In this case, we
		// do not want to include the id attribute, since we're using the computed ID via the
		// useComputedId composable.
		// This removes the ID and stores all other attributes in otherAttrsMinusId.
		const otherAttrsMinusId = computed( () => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { id, ...everythingElse } = otherAttrs.value;
			return everythingElse;
		} );

		const inputClasses = computed( () => {
			return {
				'cdx-text-input__input--has-value': !!wrappedModel.value
			};
		} );

		const onClear = ( event: MouseEvent ) => {
			wrappedModel.value = '';
			emit( 'clear', event );
		};

		const onKeydown = ( event: KeyboardEvent ) => {
			// Hide keydown events for Home and End (but not Ctrl/Cmd+Home/End) from the parent
			// This avoids a pitfall when delegating TextInput events to a Menu component, where
			// we want Home/End to move the cursor in the TextInput rather than move the highlight
			// in the Menu (T314728)
			if ( ( event.key === 'Home' || event.key === 'End' ) && !event.ctrlKey && !event.metaKey ) {
				return;
			}
			emit( 'keydown', event );
		};

		// Emit other events to the parent in case they're needed.
		const onInput = ( event: InputEvent ) => {
			emit( 'input', event );
		};
		const onChange = ( event: Event ) => {
			emit( 'change', event );
		};
		const onFocus = ( event: FocusEvent ) => {
			emit( 'focus', event );
		};
		const onBlur = ( event: FocusEvent ) => {
			emit( 'blur', event );
		};

		return {
			computedInputId,
			descriptionId,
			wrappedModel,
			isClearable,
			rootClasses,
			rootStyle,
			otherAttrsMinusId,
			inputClasses,
			computedDisabled,
			onClear,
			onInput,
			onChange,
			onKeydown,
			onFocus,
			onBlur,
			cdxIconClear
		};
	},

	// Public methods
	// These must be in the methods block, not in the setup function, otherwise their documentation
	// won't be picked up by vue-docgen
	methods: {
		/**
		 * Focus the component's input element.
		 *
		 * @public
		 */
		focus(): void {
			const input = this.$refs.input as HTMLInputElement;
			input.focus();
		},

		/**
		 * Blur the component's input element.
		 *
		 * @public
		 */
		blur(): void {
			const input = this.$refs.input as HTMLInputElement;
			input.blur();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/icon-alignment.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-text-input {
	// For proper positioning of icons and slotted elements.
	position: relative;
	box-sizing: @box-sizing-base;

	&__start-icon {
		// Border width is included here and for other icon positions because the icon position will
		// be offset from the border, not inside the border, so we need to include its width in the
		// offset value.
		.cdx-mixin-icon( start, @param-external-padding: @spacing-50 + @border-width-base );
	}

	// Ensure CSS end icon is size small.
	&__icon&__end-icon {
		.cdx-mixin-css-icon-size( @size-icon-small );
		.cdx-mixin-css-icon-background( @size-icon-small );
	}

	&__clear-icon,
	&__end-icon {
		.cdx-mixin-icon(
			end,
			@min-size-icon-small,
			@size-icon-small,
			@spacing-50 + @border-width-base
		);
	}

	&__clear-icon {
		// The clear icon result in a pointer cursor on hover.
		&:hover {
			cursor: @cursor-base--hover;
		}

		// Increase padding end when the clear icon appears next to an end icon.
		.cdx-text-input__end-icon + & {
			right: @spacing-horizontal-input-text-two-end-icons;
		}
	}

	&__input {
		display: block;
		box-sizing: @box-sizing-base;
		min-width: @min-width-medium;
		min-height: @min-size-interactive-pointer;
		width: @size-full;
		margin: 0;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-radius: @border-radius-base;
		padding: @spacing-25 @spacing-50;
		font-family: inherit;
		font-size: inherit;
		line-height: @line-height-x-small;

		&:enabled {
			background-color: @background-color-base;
			color: @color-base;
			border-color: @border-color-base;
			box-shadow: @box-shadow-inset-small @box-shadow-color-transparent;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-medium;

			~ .cdx-text-input__icon-vue {
				color: @color-placeholder;
			}

			~ .cdx-text-input__icon {
				opacity: @opacity-icon-placeholder;
			}

			&:hover {
				border-color: @border-color-input--hover;
			}

			// Show darker icons when the input is focused or has value.
			// Note that the "has value" part doesn't apply to CSS-only text inputs.
			&:focus,
			&.cdx-text-input__input--has-value {
				~ .cdx-text-input__icon-vue {
					color: @color-base;
				}

				~ .cdx-text-input__icon {
					opacity: @opacity-base;
				}
			}

			&:focus {
				border-color: @border-color-progressive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				outline: @outline-base--focus;
			}
		}

		/* stylelint-disable-next-line no-descending-specificity */
		&:disabled {
			background-color: @background-color-disabled-subtle;
			color: @color-disabled;
			-webkit-text-fill-color: @color-disabled;
			border-color: @border-color-disabled;
			// Don't implement coined effect on text-shadow from OOUI.
			// This has never gone through design review and was a hack to increase
			// color contrast.
			// text-shadow: @text-shadow-base--disabled;

			~ .cdx-text-input__icon-vue {
				color: @color-disabled;
				pointer-events: none;
			}

			~ .cdx-text-input__icon {
				opacity: @opacity-icon-base--disabled;
			}
		}

		// Normalize placeholder styling, see T139034.
		&::placeholder {
			color: @color-placeholder;
			opacity: @opacity-base;
		}

		// Support IE 10-11, and Edge 12+: Hide proprietary pseudo-element.
		// See https://developer.mozilla.org/en-US/docs/Web/CSS/::-ms-clear
		&::-ms-clear {
			display: none;
		}

		&[ type='search' ] {
			// Support Safari/iOS: Normalize by applying `none`,
			// Chrome would accept `textfield` as well.
			/* stylelint-disable plugin/no-unsupported-browser-features */
			/* autoprefixer: ignore next */
			-webkit-appearance: none;
			// Support Firefox.
			/* autoprefixer: ignore next */
			-moz-appearance: textfield;
			/* stylelint-enable plugin/no-unsupported-browser-features */

			// Support: Safari, Chrome (Blink).
			&::-webkit-search-decoration,
			&::-webkit-search-cancel-button {
				display: none;
			}
		}
	}

	&--has-start-icon {
		.cdx-text-input__input {
			.cdx-mixin-icon-wrapper-padding( start, @spacing-50 );
		}
	}

	// Either with an end icon or clearable.
	&--has-end-icon,
	&--clearable {
		.cdx-text-input__input {
			.cdx-mixin-icon-wrapper-padding(
				end,
				@spacing-50,
				@size-icon-small
			);
		}
	}

	// Both with an end icon and clearable.
	&--has-end-icon&--clearable {
		.cdx-text-input__input {
			.cdx-mixin-icon-wrapper-padding(
				end,
				@spacing-horizontal-input-text-two-end-icons,
				@size-icon-small
			);
		}
	}

	&--status-error {
		.cdx-text-input__input:enabled {
			border-color: @border-color-destructive;

			&:focus {
				border-color: @border-color-progressive--focus;
			}
		}
	}
}
</style>
