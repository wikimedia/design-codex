<template>
	<div
		class="cdx-text-area"
		:class="rootClasses"
		:style="rootStyle"
	>
		<textarea
			ref="textarea"
			v-bind="otherAttrs"
			v-model="wrappedModel"
			:class="textareaClasses"
			class="cdx-text-area__textarea"
			@input="onInput"
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
	PropType
} from 'vue';
import CdxIcon from '../../components/icon/Icon.vue';
import { Icon } from '@wikimedia/codex-icons';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useModelWrapper from '../../composables/useModelWrapper';
import { ValidationStatusType } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * Multi-line text input that allows manual resizing.
 *
 * This form element is useful when you want to create a sizeable amount of free-form text,
 * for example comments, reviews, feedback, or short essay responses.
 *
 * `v-model` is used to track the current value of the textarea. See the events docs for details on
 * emitted events and their properties.
 */
export default defineComponent( {
	name: 'CdxTextArea',
	components: { CdxIcon },
	inheritAttrs: false,
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
		 *
		 * @values 'default', 'error'
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		},
		/**
		 * Describes whether the textarea grows vertically to show all text.
		 *
		 * When autosize is true, the textarea automatically grows in height (vertically).
		 * The height of the textarea expands while the user types in the textarea.
		 * The content inside the textarea is visible and there's no scroll.
		 *
		 * @values true, false
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
		'update:modelValue'
	],
	setup( props, { attrs, emit } ) {
		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the textarea element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		const textareaClasses = computed( () => {
			return {
				'cdx-text-area__textarea--has-value': !!wrappedModel.value,
				'cdx-text-area__textarea--is-autosize': props.autosize
			};
		} );

		const internalClasses = computed( () => {
			return {
				'cdx-text-area--status-default': props.status === 'default',
				'cdx-text-area--status-error': props.status === 'error',
				'cdx-text-area--has-start-icon': !!props.startIcon,
				'cdx-text-area--has-end-icon': !!props.endIcon
			};
		} );

		// Get helpers from useSplitAttributes() composable.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const textarea = ref<HTMLTextAreaElement>();

		// Allows the textarea to grow aka auto-resize while typing.
		function onInput() {
			if ( textarea.value && props.autosize ) {
				textarea.value.style.height = 'auto';
				textarea.value.style.height = `${textarea.value.scrollHeight}px`;
			}
		}

		return {
			rootClasses,
			rootStyle,
			otherAttrs,
			wrappedModel,
			textareaClasses,
			textarea,
			onInput
		};
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

	&__start-icon {
		.cdx-mixin-icon( start, @param-external-padding: @spacing-50 + @border-width-base );
	}

	&__end-icon {
		.cdx-mixin-icon(
			end,
			@min-size-icon-small,
			@size-icon-small,
			@spacing-50 + @border-width-base
		);
	}

	&__start-icon,
	&__end-icon {
		// TODO: Move these overrides into the mixin (T337878)
		top: @spacing-25;
		height: @size-150;
		transform: none;
	}

	&__textarea {
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
		// TODO: Support Safari iOS/Webkit
		/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
		resize: vertical;

		&--is-autosize {
			/* stylelint-disable-next-line plugin/no-unsupported-browser-features */
			resize: none;
			overflow: hidden;

			// Support Safari/Webkit
			&::-webkit-resizer {
				display: none;
			}
		}

		&:enabled {
			background-color: @background-color-base;
			color: @color-base;
			border-color: @border-color-base;
			box-shadow: @box-shadow-inset-small @box-shadow-color-transparent;
			transition-property: @transition-property-base;
			transition-duration: @transition-duration-medium;

			~ .cdx-text-area__icon-vue {
				color: @color-placeholder;
			}

			&:hover {
				border-color: @border-color-input--hover;
			}

			&:focus,
			&.cdx-text-area__textarea--has-value {
				~ .cdx-text-area__icon-vue {
					color: @color-base;
				}
			}

			&:focus {
				border-color: @border-color-progressive--focus;
				box-shadow: @box-shadow-inset-small @box-shadow-color-progressive--focus;
				outline: @outline-base--focus;
			}

			&:read-only {
				background-color: @background-color-interactive-subtle;
			}
		}

		/* stylelint-disable-next-line no-descending-specificity */
		&:disabled {
			background-color: @background-color-disabled-subtle;
			color: @color-disabled;
			border-color: @border-color-disabled;

			/* stylelint-disable-next-line no-descending-specificity */
			~ .cdx-text-area__icon-vue {
				color: @color-disabled;
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
		/* stylelint-disable-next-line no-descending-specificity */
		.cdx-text-area__textarea {
			.cdx-mixin-icon-wrapper-padding( start, @spacing-50 );
		}
	}

	// Add additional padding to textarea when the end icon exists.
	// Sets the end icon to 1em relative to the font size.
	&--has-end-icon {
		/* stylelint-disable-next-line no-descending-specificity */
		.cdx-text-area__textarea {
			.cdx-mixin-icon-wrapper-padding( end, @spacing-50, @size-icon-small );
		}
	}

	&--status-error {
		.cdx-text-area__textarea:enabled {
			border-color: @border-color-error;

			&:focus {
				border-color: @border-color-progressive--focus;
			}
		}
	}
}
</style>
