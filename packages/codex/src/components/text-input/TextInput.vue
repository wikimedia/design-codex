<template>
	<div
		class="cdx-text-input"
		:class="rootClasses"
		:style="rootStyle"
	>
		<input
			ref="input"
			v-model="wrappedModel"
			class="cdx-text-input__input"
			v-bind="otherAttrs"
			:type="inputType"
			:disabled="disabled"
			@input="onInput"
			@change="onChange"
			@focus="onFocus"
			@blur="onBlur"
		>
		<cdx-icon
			v-if="startIcon"
			:icon="startIcon"
			class="cdx-text-input__start-icon"
		/>
		<cdx-icon
			v-if="isClearable || endIcon"
			:icon="computedEndIcon"
			class="cdx-text-input__end-icon"
			@mousedown.prevent
			@click="onEndIconClick"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef, computed } from 'vue';
import { Icon, cdxIconClear } from '@wikimedia/codex-icons';
import CdxIcon from '../icon/Icon.vue';
import { TextInputTypes } from '../../constants';
import { TextInputType } from '../../types';
import { makeStringTypeValidator } from '../../utils';
import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';

const textInputTypeValidator = makeStringTypeValidator( TextInputTypes );

/**
 * HTML `<input>` element with type "text" or "search", wrapped in a `<div>`.
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

	expose: [ 'focus' ],

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
		 * @values 'text', 'search'
		 */
		inputType: {
			type: String as PropType<TextInputType>,
			default: 'text',
			validator: textInputTypeValidator
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
		 * @property {string | number} value The new value
		 */
		'update:modelValue',
		/**
		 * When the input value changes via direct use of the input
		 *
		 * @property {InputEvent} event The InputEvent object
		 */
		'input',
		/**
		 * When an input value change is committed by the user (e.g. on blur)
		 *
		 * @property {Event} event The Event object
		 */
		'change',
		/**
		 * When the input comes into focus
		 *
		 * @property {FocusEvent} event The FocusEvent object
		 */
		'focus',
		/**
		 * When the input loses focus
		 *
		 * @property {FocusEvent} event The FocusEvent object
		 */
		'blur'
	],
	setup( props, { emit, attrs } ) {
		// Take the modelValue provided by the parent component via v-model and
		// generate a wrapped model that we can use for the input element in
		// this component.
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		const isClearable = computed( () => {
			return props.clearable && !!wrappedModel.value && !props.disabled;
		} );

		const internalClasses = computed( () => {
			return {
				'cdx-text-input--has-start-icon': !!props.startIcon,
				'cdx-text-input--has-end-icon': !!props.endIcon || props.clearable,
				'cdx-text-input--clearable': isClearable.value
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const computedEndIcon = computed( () => {
			// This method is only called either when isClearable is true or when there is an
			// endIcon, so we know endIcon will never be undefined at this point in the logic.
			return isClearable.value ? cdxIconClear : ( props.endIcon as Icon );
		} );

		const onEndIconClick = () => {
			if ( isClearable.value ) {
				wrappedModel.value = '';
			}
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
			wrappedModel,
			isClearable,
			rootClasses,
			rootStyle,
			otherAttrs,
			computedEndIcon,
			onEndIconClick,
			onInput,
			onChange,
			onFocus,
			onBlur
		};
	},

	methods: {
		/**
		 * Focus the component's input element.
		 *
		 * @public
		 */
		focus(): void {
			const input = this.$refs.input as HTMLInputElement;
			input.focus();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';

/* TODO: these should be design tokens. */
@font-size-browser: 16;
@font-size-base: 14 / @font-size-browser;
@line-height-component: unit( ( 20 / @font-size-browser / @font-size-base ), em );
@size-input-icon-container: unit(
	( ( @padding-horizontal-input-text * 2 + @size-icon ) / @font-size-browser / @font-size-base ),
	em
);

.cdx-text-input {
	/* For proper positioning of icons and slotted elements */
	position: relative;
	box-sizing: @box-sizing-base;

	&__start-icon,
	&__end-icon {
		color: @color-accessory;
		position: absolute;
		top: 0;
		min-height: @size-icon;
		height: @size-full;
		// In Safari, several transitions or transforms happening at once around these elements may
		// cause a brief wobble. This will stabilize icons' positions.
		-webkit-transform: translateZ( 0 );
	}

	/* Start icon is larger and aligned to the left of the input. */
	&__start-icon {
		left: @border-width-base;
		width: @size-input-icon-container;
		pointer-events: none;
	}

	/* End icon is smaller and aligned to the right of the input. */
	&__end-icon {
		right: @border-width-base;
		width: calc( @padding-horizontal-input-text * 2 + @size-indicator );

		svg {
			width: @size-indicator;
		}
	}
}

/* The clear icon result in a pointer cursor on hover. */
.cdx-text-input--clearable {
	.cdx-text-input__end-icon {
		cursor: pointer;
	}
}

.cdx-text-input--has-start-icon {
	.cdx-text-input__input {
		padding-left: @size-input-icon-container;
	}
}

.cdx-text-input--has-end-icon {
	.cdx-text-input__input {
		padding-right: @size-input-icon-container;
	}
}

/* stylelint-disable-next-line no-descending-specificity */
.cdx-text-input__input {
	display: block;
	box-sizing: @box-sizing-base;
	width: @size-full;
	height: @size-base;
	margin: 0;
	border-width: @border-width-base;
	border-style: @border-style-base;
	border-radius: @border-radius-base;
	padding: @padding-input-text;
	font-family: inherit;
	font-size: inherit;
	line-height: @line-height-component;

	&[ disabled ] {
		background-color: @background-color-base--disabled;
		color: @color-base--disabled;
		-webkit-text-fill-color: @color-base--disabled;
		border-color: @border-color-base--disabled;
		// Don't implement coined effect on text-shadow from OOUI.
		// This has never gone through design review and was a hack to increase
		// color contrast.
		// text-shadow: @text-shadow-base--disabled;

		& ~ .cdx-text-input__start-icon,
		& ~ .cdx-text-input__end-icon {
			// FIXME: Revisit the opacity value. Codex icons are happily
			// applying color values, so we shouldn't need setting an opacity
			// here.
			// opacity: @opacity-base--disabled;
			pointer-events: none;
		}
	}

	&:not( [ disabled ] ) {
		background-color: @background-color-base;
		color: @color-base--emphasized;
		border-color: @border-color-base;
		box-shadow: @box-shadow-base;
		transition-property: @transition-property-base;
		transition-duration: @transition-duration-medium;

		&:hover {
			border-color: @border-color-input--hover;
		}

		&:focus {
			border-color: @border-color-base--focus;
			box-shadow: @box-shadow-base--focus;
			outline: 0;
		}

		&:focus ~ .cdx-text-input__start-icon,
		&:focus ~ .cdx-text-input__end-icon {
			opacity: @opacity-base;
		}
	}

	// Normalize placeholder styling, see T139034.
	&::placeholder {
		color: @color-placeholder;
		opacity: @opacity-base;
	}

	/*
	* Support IE 10-11, and Edge 12+: Hide proprietary pseudo-element.
	* See https://developer.mozilla.org/en-US/docs/Web/CSS/::-ms-clear
	*/
	&::-ms-clear {
		display: none;
	}

	&[ type='search' ] {
		/*
		* Support Safari/iOS: Normalize by applying `none`,
		* Chrome would accept `textfield` as well.
		*/
		/* stylelint-disable plugin/no-unsupported-browser-features */
		/* autoprefixer: ignore next */
		-webkit-appearance: none;
		/* Support Firefox. */
		/* autoprefixer: ignore next */
		-moz-appearance: textfield;
		/* stylelint-enable plugin/no-unsupported-browser-features */

		/* Support: Safari, Chrome (Blink). */
		&::-webkit-search-decoration,
		&::-webkit-search-cancel-button {
			display: none;
		}
	}
}
</style>
