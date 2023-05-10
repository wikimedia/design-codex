<template>
	<div
		class="cdx-text-area"
		:class="rootClasses"
		:style="rootStyle"
	>
		<textarea
			v-bind="otherAttrs"
			v-model="wrappedModel"
			:class="textareaClasses"
			class="cdx-text-area__textarea"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	computed,
	toRef,
	PropType
} from 'vue';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useModelWrapper from '../../composables/useModelWrapper';
import { ValidationStatusType } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * Multi-line text input that allows manual resizing.
 */
export default defineComponent( {
	name: 'CdxTextArea',
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
		 * `status` attribute of the input.
		 *
		 * @values 'default', 'error'
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		}
	},
	emits: [
		/**
		 * When the textarea value changes
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
				'cdx-text-area__textarea--has-value': !!wrappedModel.value
			};
		} );

		const internalClasses = computed( () => {
			return {
				'cdx-text-area--status-default': props.status === 'default',
				'cdx-text-area--status-error': props.status === 'error'
			};
		} );

		// Get helpers from useSplitAttributes() composable.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		return {
			rootClasses,
			rootStyle,
			otherAttrs,
			wrappedModel,
			textareaClasses
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.cdx-text-area {
	&__textarea {
		box-sizing: @box-sizing-base;
		min-height: @min-height-text-area;
		width: @size-full;
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

			&:hover {
				border-color: @border-color-input--hover;
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
		}

		// Normalize placeholder styling, see T139034.
		&::placeholder {
			color: @color-placeholder;
			opacity: @opacity-base;
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
