<template>
	<div
		class="cdx-text-input"
		:class="rootClasses"
		:style="rootStyle"
	>
		<!-- size="1" is to prevent the browser from setting an implicit min-width -->
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
			size="1"
			@input="onInput"
			@compositionstart="onCompositionStart"
			@compositionupdate="onCompositionUpdate"
			@compositionend="onCompositionEnd"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@keydown="onKeydown"
			@invalid="( e ) => onInvalid( e, shouldPreventDefault )"
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
import { defineComponent, PropType, toRef, computed, inject, ref } from 'vue';
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
 * A form element that accepts a single line of text input from the user.
 */
export default defineComponent( {
	name: 'CdxTextInput',
	components: { CdxIcon },
	/**
	 * We want the input to inherit attributes, not the root element.
	 */
	inheritAttrs: false,

	// expose is temporarily disabled to work around a Vue / vue-tsc bug, see
	// https://github.com/vuejs/language-tools/issues/5069
	/*
	expose: [
		'focus',
		'blur',
		'checkValidity',
		'reportValidity',
		'setCustomValidity'
	],
	*/

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
		 * An icon at the start of the `<input>` element. Similar to a `::before` pseudo-element.
		 */
		startIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		},
		/**
		 * An icon at the end of the `<input>` element. Similar to an `::after` pseudo-element.
		 */
		endIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		},
		/**
		 * Add a clear button at the end of the `<input>` element.
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
		 * When composition begins
		 *
		 * @property {CompositionEvent} event
		 */
		'compositionstart',
		/**
		 * When composition is updated
		 *
		 * @property {CompositionEvent} event
		 */
		'compositionupdate',
		/**
		 * When composition ends
		 *
		 * @property {CompositionEvent} event
		 */
		'compositionend',
		/**
		 * When the input value is cleared through the use of the clear button
		 *
		 * @property {MouseEvent} event
		 */
		'clear',
		/**
		 * When the input value is invalid according to the input's constraint
		 * attributes (e.g. min, max, pattern). See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/invalid_event
		 *
		 * @property {Event} event
		 */
		'invalid'
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
		// generate a wrapped model that we can use for the `<input>` element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		const isClearable = computed(
			() => props.clearable && !!wrappedModel.value && !computedDisabled.value
		);

		const internalClasses = computed( () => ( {
			'cdx-text-input--has-start-icon': !!props.startIcon,
			'cdx-text-input--has-end-icon': !!props.endIcon,
			'cdx-text-input--clearable': isClearable.value,
			[ `cdx-text-input--status-${ computedStatus.value }` ]: true
		} ) );

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

		const inputClasses = computed( () => ( {
			'cdx-text-input__input--has-value': !!wrappedModel.value
		} ) );

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
		const onInput = ( event: Event ) => {
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
		const onCompositionStart = ( event: CompositionEvent ) => {
			emit( 'compositionstart', event );
		};
		const onCompositionUpdate = ( event: CompositionEvent ) => {
			emit( 'compositionupdate', event );
		};
		const onCompositionEnd = ( event: CompositionEvent ) => {
			emit( 'compositionend', event );
		};

		// We want to prevent the default behavior of the invalid event by default, to prevent the
		// native validation message UI from displaying unless it's explicitly called. If
		// `reportValidity()` is used, this ref will be set to false.
		const shouldPreventDefault = ref( true );

		/**
		 * Handle the `invalid` event.
		 *
		 * Note that we use an argument for `doPreventDefault` instead of the `shouldPreventDefault`
		 * ref so we can unit test this.
		 *
		 * @param event Invalid event
		 * @param doPreventDefault Whether default behavior should be prevented
		 */
		const onInvalid = ( event: Event, doPreventDefault: boolean ) => {
			if ( doPreventDefault ) {
				event.preventDefault();
			}
			emit( 'invalid', event );
			shouldPreventDefault.value = true;
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
			onCompositionStart,
			onCompositionUpdate,
			onCompositionEnd,
			onInvalid,
			shouldPreventDefault,
			cdxIconClear
		};
	},

	// Public methods
	// These must be in the methods block, not in the setup function, otherwise their documentation
	// won't be picked up by vue-docgen
	methods: {
		/**
		 * Focus the component's `<input>` element.
		 *
		 * @public
		 */
		focus(): void {
			const input = this.$refs.input as HTMLInputElement;
			input.focus();
		},

		/**
		 * Blur the component's `<input>` element.
		 *
		 * @public
		 */
		blur(): void {
			const input = this.$refs.input as HTMLInputElement;
			input.blur();
		},

		/**
		 * Check the validity of the `<input>` element according to its constraint attributes.
		 * Emits an 'invalid' event if the input is invalid. See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/checkValidity
		 *
		 * @public
		 * @return {boolean} Whether the input is valid
		 */
		checkValidity(): boolean {
			const input = this.$refs.input as HTMLInputElement;
			return input.checkValidity();
		},

		/**
		 * Check the validity of the `<input>` element and report it as a pop up on the UI. See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/reportValidity
		 *
		 * @public
		 * @return {boolean} Whether the input is valid
		 */
		reportValidity(): boolean {
			// Ensure default behavior of the invalid event is not prevented, so the native UI can
			// pop up.
			this.shouldPreventDefault = false;
			const input = this.$refs.input as HTMLInputElement;
			return input.reportValidity();
		},

		/**
		 * Set custom validity and message for the `<input>` element. See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setCustomValidity
		 *
		 * @public
		 * @param {string} message The custom validation message to set
		 */
		setCustomValidity( message: string ): void {
			const input = this.$refs.input as HTMLInputElement;
			input.setCustomValidity( message );
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
	// min-width is set here instead of in the <input> so that the input's width is consistent
	// regardless of whether the clear button and start/end icon are present
	min-width: @min-width-medium;
	// Set the border-radius on the root element rather than the <input>, so that the focus outline
	// will also have rounded or straight corners to match the input's corners.
	border-radius: @border-radius-base;
	overflow: hidden;

	// Added double ampersand to add specificity to Vue and CSS start icons
	& &__start-icon {
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

	// Added double ampersand to add specificity to Vue and CSS end icons
	&__clear-icon.cdx-icon,
	& &__end-icon {
		.cdx-mixin-icon(
			end,
			@min-size-icon-small,
			@size-icon-small,
			@spacing-50 + @border-width-base
		);
	}

	&__clear-icon.cdx-icon {
		// The clear icon result in a pointer cursor on hover.
		&:hover {
			cursor: @cursor-base--hover;
		}

		// Move the clear icon farther left when it appears next to an end icon.
		.cdx-text-input__end-icon.cdx-icon + & {
			right: calc( @spacing-horizontal-input-text-two-end-icons + @border-width-base );
		}
	}

	&__input {
		display: block;
		box-sizing: @box-sizing-base;
		min-height: @min-size-interactive-pointer;
		width: @size-full;
		max-height: @size-200;
		margin: 0;
		border-width: @border-width-base;
		border-style: @border-style-base;
		// Override border-radius styles from User Agent Stylesheet in iOS Safari
		border-radius: @border-radius-sharp;
		padding: @spacing-25 @spacing-50;
		font-family: inherit;
		font-size: @font-size-medium;
		line-height: @line-height-small;

		&:enabled {
			background-color: @background-color-base;
			color: @color-base;
			border-color: @border-color-interactive;
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
				border-color: @border-color-interactive--hover;
			}

			// Show darker icons when the input is focused or has value.
			// Note that the "has value" part doesn't apply to CSS-only text inputs.
			&:focus,
			&.cdx-text-input__input--has-value {
				~ .cdx-text-input__icon-vue {
					color: @color-subtle;
				}

				~ .cdx-text-input__clear-icon {
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

			&:read-only {
				background-color: @background-color-neutral-subtle;
				border-color: @border-color-base;
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
		.cdx-text-input__input:enabled:not( :read-only ):not( :focus ) {
			background-color: @background-color-error-subtle;
			color: @color-error;
			border-color: @border-color-error;

			&::placeholder,
			~ .cdx-text-input__start-icon,
			~ .cdx-text-input__end-icon {
				color: @color-error;
			}

			&:hover {
				background-color: @background-color-error-subtle--hover;
				color: @color-error--hover;
				border-color: @border-color-error--hover;

				&::placeholder,
				~ .cdx-text-input__start-icon,
				~ .cdx-text-input__end-icon {
					color: @color-error--hover;
				}
			}
		}
	}
}
</style>
