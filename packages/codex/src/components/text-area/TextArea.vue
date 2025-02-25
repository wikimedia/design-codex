<template>
	<div
		class="cdx-text-area"
		:class="rootClasses"
		:style="rootStyle"
	>
		<textarea
			:id="computedInputId"
			ref="textarea"
			v-bind="otherAttrsMinusId"
			v-model="wrappedModel"
			:class="textareaClasses"
			class="cdx-text-area__textarea"
			:aria-describedby="descriptionId"
			:disabled="computedDisabled"
			@input="onInput"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
			@invalid="( e ) => onInvalid( e, shouldPreventDefault )"
		/>
		<cdx-icon
			v-if="startIcon"
			:icon="startIcon"
			class="cdx-text-area__icon-vue cdx-text-area__start-icon"
		/>
		<cdx-icon
			v-if="endIcon"
			:icon="endIcon"
			class="cdx-text-area__icon-vue cdx-text-area__end-icon"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	ref,
	toRef,
	PropType,
	inject
} from 'vue';
import CdxIcon from '../icon/Icon.vue';
import { Icon } from '@wikimedia/codex-icons';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useModelWrapper from '../../composables/useModelWrapper';
import useFieldData from '../../composables/useFieldData';
import { ValidationStatusType } from '../../types';
import { ValidationStatusTypes, FieldDescriptionIdKey } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * Multi-line text input that allows manual resizing.
 *
 * This form element is useful when you want to create a sizeable amount of free-form text,
 * for example comments, reviews, feedback, or short essay responses.
 */
export default defineComponent( {
	name: 'CdxTextArea',
	components: { CdxIcon },
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
		 * Current value of the textarea.
		 *
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: String,
			default: ''
		},
		/**
		 * `status` attribute of the textarea.
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		},
		/**
		 * Whether the textarea is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Describes whether the textarea grows vertically to show all text.
		 *
		 * When autosize is true, the textarea automatically grows in height (vertically).
		 * The height of the textarea expands while the user types in the textarea.
		 * The content inside the textarea is visible and there's no scroll.
		 */
		autosize: {
			type: Boolean,
			default: false
		},
		/**
		 * An icon at the start of the textarea element. Similar to a `::before` pseudo-element.
		 */
		startIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		},
		/**
		 * An icon at the end of the textarea element. Similar to an `::after` pseudo-element.
		 */
		endIcon: {
			type: [ String, Object ] as PropType<Icon | undefined>,
			default: undefined
		}
	},
	emits: [
		/**
		 * When the textarea value changes.
		 *
		 * @property {string} modelValue The new model value
		 */
		'update:modelValue',
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
		 * When the textarea value is invalid according to the textarea's constraint
		 * attributes (e.g. minlength, maxlength, or required). See:
		 * https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation#validation-related_attributes
		 *
		 * @property {Event} event
		 */
		'invalid'
	],
	setup( props, { attrs, emit } ) {
		const textarea = ref<HTMLTextAreaElement>();

		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the textarea element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

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

		const textareaClasses = computed( () => ( {
			'cdx-text-area__textarea--has-value': !!wrappedModel.value,
			'cdx-text-area__textarea--is-autosize': props.autosize
		} ) );

		const internalClasses = computed( () => ( {
			'cdx-text-area--status-default': computedStatus.value === 'default',
			'cdx-text-area--status-error': computedStatus.value === 'error',
			'cdx-text-area--has-start-icon': !!props.startIcon,
			'cdx-text-area--has-end-icon': !!props.endIcon
		} ) );

		// Get helpers from useSplitAttributes() composable.
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

		// Allows the textarea to grow aka auto-resize while typing.
		function onInput( event: Event ) {
			if ( textarea.value && props.autosize ) {
				textarea.value.style.height = 'auto';
				textarea.value.style.height = `${ textarea.value.scrollHeight }px`;
			}
			emit( 'input', event );
		}

		const onChange = ( event: Event ) => {
			emit( 'change', event );
		};
		const onFocus = ( event: FocusEvent ) => {
			emit( 'focus', event );
		};
		const onBlur = ( event: FocusEvent ) => {
			emit( 'blur', event );
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
			textarea,
			rootClasses,
			rootStyle,
			wrappedModel,
			computedDisabled,
			computedInputId,
			descriptionId,
			textareaClasses,
			otherAttrsMinusId,
			onInput,
			onChange,
			onFocus,
			onBlur,
			onInvalid,
			shouldPreventDefault
		};
	},

	// Public methods
	// These must be in the methods block, not in the setup function, otherwise their documentation
	// won't be picked up by vue-docgen
	methods: {
		/**
		 * Focus the component's textarea element.
		 *
		 * @public
		 */
		focus(): void {
			const textarea = this.$refs.textarea as HTMLTextAreaElement;
			textarea.focus();
		},

		/**
		 * Blur the component's textarea element.
		 *
		 * @public
		 */
		blur(): void {
			const textarea = this.$refs.textarea as HTMLTextAreaElement;
			textarea.blur();
		},

		/**
		 * Check the validity of the textarea element according to its constraint attributes. Emits
		 * an 'invalid' event if the textarea is invalid. See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/checkValidity
		 *
		 * @public
		 * @return {boolean} Whether the textarea is valid
		 */
		checkValidity(): boolean {
			const textarea = this.$refs.textarea as HTMLTextAreaElement;
			return textarea.checkValidity();
		},

		/**
		 * Check the validity of the textarea element and report it as a pop up on the UI. See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/reportValidity
		 *
		 * @public
		 * @return {boolean} Whether the textarea is valid
		 */
		reportValidity(): boolean {
			// Ensure default behavior of the invalid event is not prevented, so the native UI can
			// pop up.
			this.shouldPreventDefault = false;
			const textarea = this.$refs.textarea as HTMLTextAreaElement;
			return textarea.reportValidity();
		},

		/**
		 * Set custom validity and message for the textarea element. See:
		 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement/setCustomValidity
		 *
		 * @public
		 * @param {string} message The custom validation message to set
		 */
		setCustomValidity( message: string ): void {
			const textarea = this.$refs.textarea as HTMLTextAreaElement;
			textarea.setCustomValidity( message );
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/icon-alignment.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-text-area {
	// Added for positioning of icons.
	position: relative;
	// Set `min-width` here instead of on the `<textarea>` element so that the TextArea's width
	// is consistent regardless of whether the start/end icons are present.
	min-width: @min-width-medium;

	// Added double ampersand to add specificity to Vue and CSS start icons
	& &__start-icon {
		.cdx-mixin-icon(
			start,
			@param-external-padding: @spacing-50 + @border-width-base,
			@param-top: @spacing-25,
			@param-height: @size-150
		);
	}

	// Added double ampersand to add specificity to Vue and CSS end icons
	& &__end-icon {
		.cdx-mixin-icon(
			end,
			@min-size-icon-small,
			@size-icon-small,
			@spacing-50 + @border-width-base,
			@spacing-25,
			@size-150
		);
	}

	// Ensure background image rules for CSS start icon
	&__icon&__start-icon {
		.cdx-mixin-css-icon-background();
	}

	// Ensure CSS end icon is size small and it's height is consistent with the Vue icon.
	&__icon&__end-icon {
		// Note: the icon-size mixin overrides the height property @size-150 (via cdx-mixin-icon)
		// therefore, we override height again to get the desired height of @size-150
		.cdx-mixin-css-icon-size( @size-icon-small );
		.cdx-mixin-css-icon-background( @size-icon-small );
		height: @size-150;
	}

	&__textarea {
		display: block;
		box-sizing: @box-sizing-base;
		min-height: @min-height-text-area;
		width: @size-full;
		border-width: @border-width-base;
		border-style: @border-style-base;
		border-radius: @border-radius-base;
		padding: @spacing-25 @spacing-50;
		overflow: auto;
		font-family: inherit;
		font-size: inherit;
		line-height: @line-height-x-small;
		// TODO: Support Safari/Webkit for iOS. The grabber tool is not present in mobile safari.
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		resize: vertical;

		&--is-autosize {
			/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
			resize: none;
			overflow: hidden;

			// Support Safari/Webkit - supports macOS only
			&::-webkit-resizer {
				display: none;
			}
		}

		&:enabled {
			background-color: @background-color-base;
			color: @color-base;
			border-color: @border-color-interactive;
			box-shadow: @box-shadow-inset-small @box-shadow-color-transparent;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-medium;

			~ .cdx-text-area__icon-vue.cdx-icon {
				color: @color-placeholder;
			}

			~ .cdx-text-area__icon {
				opacity: @opacity-icon-placeholder;
			}

			&:hover {
				border-color: @border-color-interactive--hover;
			}

			&:focus,
			&.cdx-text-area__textarea--has-value {
				~ .cdx-text-area__icon-vue.cdx-icon {
					color: @color-subtle;
				}

				~ .cdx-text-area__icon {
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

			/* stylelint-disable-next-line no-descending-specificity */
			~ .cdx-text-area__icon-vue.cdx-icon {
				color: @color-disabled;
			}

			/* stylelint-disable-next-line no-descending-specificity */
			~ .cdx-text-area__icon {
				opacity: @opacity-icon-base--disabled;
			}
		}

		// Normalize placeholder styling, see T139034.
		&::placeholder {
			color: @color-placeholder;
			opacity: @opacity-base;
		}
	}

	// Add additional padding to textarea when the start icon exists.
	// Sets the start icon to 1.25em relative to the font size.
	&--has-start-icon {
		.cdx-text-area__textarea {
			.cdx-mixin-icon-wrapper-padding( start, @spacing-50 );
		}
	}

	// Add additional padding to textarea when the end icon exists.
	// Sets the end icon to 1em relative to the font size.
	&--has-end-icon {
		.cdx-text-area__textarea {
			.cdx-mixin-icon-wrapper-padding( end, @spacing-50, @size-icon-small );
		}
	}

	&--status-error {
		.cdx-text-area__textarea:enabled:not( :read-only ):not( :focus ) {
			background-color: @background-color-error-subtle;
			color: @color-error;
			border-color: @border-color-error;

			&::placeholder,
			~ .cdx-text-area__icon-vue.cdx-icon {
				color: @color-error;
			}

			&:hover {
				background-color: @background-color-error-subtle--hover;
				color: @color-error--hover;
				border-color: @border-color-error--hover;

				&::placeholder,
				~ .cdx-text-area__icon-vue.cdx-icon {
					color: @color-error--hover;
				}
			}
		}
	}
}
</style>
