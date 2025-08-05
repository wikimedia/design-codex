<template>
	<div
		class="cdx-search-input"
		:class="rootClasses"
		:style="rootStyle"
	>
		<div class="cdx-search-input__input-wrapper">
			<cdx-text-input
				ref="textInput"
				v-model="wrappedModel"
				class="cdx-search-input__text-input"
				input-type="search"
				:start-icon="hideIcon ? undefined : searchIcon"
				:clearable="clearable"
				:disabled="computedDisabled"
				:status="status"
				v-bind="otherAttrs"
				@keydown.enter="handleSubmit"
				@input="$event => $emit( 'input', $event )"
				@change="$event => $emit( 'change', $event )"
				@focus="$event => $emit( 'focus', $event )"
				@blur="$event => $emit( 'blur', $event )"
			/>
			<!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
			<slot />
		</div>
		<cdx-button
			v-if="useButtonOrLabel"
			class="cdx-search-input__end-button"
			:disabled="computedDisabled"
			@click="handleSubmit"
		>
			{{ translatedSearchButtonLabel }}
		</cdx-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, PropType } from 'vue';
import { cdxIconSearch } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxTextInput from '../text-input/TextInput.vue';

import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';
import useI18nWithOverride from '../../composables/useI18nWithOverride';

import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import { ValidationStatusType } from '../../types';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * An input for text search.
 */
export default defineComponent( {
	name: 'CdxSearchInput',

	components: {
		CdxButton,
		CdxTextInput
	},

	/**
	 * Attributes, besides class, will be passed to the TextInput's `<input>` element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * Value of the search input, provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ String, Number ],
			default: ''
		},
		/**
		 * Whether to display the search button.
		 */
		useButton: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether to hide the start icon.
		 */
		hideIcon: {
			type: Boolean,
			default: false
		},
		/**
		 * `clearable` property of the TextInput component
		 */
		clearable: {
			type: Boolean,
			default: false
		},
		// DEPRECATED: set default to 'Search' and remove validator (T368444).
		/**
		 * Search button text.
		 *
		 * Omit this prop to use the default value, "Search".
		 */
		buttonLabel: {
			type: String,
			default: '',
			validator: ( value: string, props ) => {
				if ( value.length > 0 && !props.useButton ) {
					// eslint-disable-next-line no-console
					console.warn(
						`[CdxSearchInput]: The boolean \`useButton\` prop is required to show the search button.\n
Refer to https://doc.wikimedia.org/codex/latest/components/demos/search-input.html#props.`
					);
					return false;
				}
				return true;
			}
		},
		/**
		 * Whether the search input is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * `status` property of the TextInput component
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
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
		 * When the submit button is clicked.
		 *
		 * @property {string | number} value The current input
		 */
		'submit-click',
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
		'blur'
	],

	setup( props, { emit, attrs } ) {
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

		const internalClasses = computed( () => ( {
			'cdx-search-input--has-end-button': !!props.buttonLabel || props.useButton
		} ) );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		// Inject a translatable message string.
		const translatedSearchButtonLabel = useI18nWithOverride(
			toRef( props, 'buttonLabel' ),
			'cdx-search-input-search-button-label',
			// Allow custom button label via props or fallback to a default English string.
			'Search'
		);

		// DEPRECATED: require use of new prop useButton (T368444)
		const useButtonOrLabel = computed( () => props.useButton || props.buttonLabel.length > 0
		);

		const handleSubmit = () => {
			emit( 'submit-click', wrappedModel.value );
		};

		return {
			wrappedModel,
			computedDisabled,
			rootClasses,
			rootStyle,
			otherAttrs,
			handleSubmit,
			searchIcon: cdxIconSearch,
			translatedSearchButtonLabel,
			useButtonOrLabel
		};
	},

	methods: {
		/**
		 * Focus the component's `<input>` element.
		 *
		 * @public
		 */
		focus(): void {
			const textInput = this.$refs.textInput as InstanceType<typeof CdxTextInput>;
			// Run the TextInput component's focus method, which will set focus
			// to the <input> within.
			textInput.focus();
		}
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/input-with-button.less';
@import ( reference ) '../../themes/mixins/public/css-icon.less';

.cdx-search-input {
	.cdx-mixin-input-with-button();

	&__input-wrapper {
		// This will make an absolutely positioned options menu passed in via the default slot line
		// up with the input, instead of extending the full width including the button.
		position: relative;
	}

	// Set up the CSS-only search icon.
	.cdx-text-input__icon.cdx-text-input__start-icon {
		.cdx-mixin-css-icon( @cdx-icon-search );
	}
}
</style>
