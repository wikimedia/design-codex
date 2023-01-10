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
				:start-icon="searchIcon"
				:status="status"
				v-bind="otherAttrs"
				@keydown.enter="handleSubmit"
			/>
			<!--
				@slot A slot for passing in an options menu that needs to be positioned
				relatively to the text input. See TypeaheadSearch for sample usage.
			-->
			<slot />
		</div>
		<cdx-button
			v-if="buttonLabel"
			class="cdx-search-input__end-button"
			@click="handleSubmit"
		>
			{{ buttonLabel }}
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
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';
import { ValidationStatusType } from '../../types';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * Search input with optional button.
 *
 * This component contains a TextInput component with a preset start icon and input type. A button
 * can be added by providing the `buttonLabel` prop.
 *
 * The default slot allows you to pass in an options menu that can be absolutely positioned to line
 * up with the text input, e.g. a list of autocomplete options. See TypeaheadSearch for an example.
 */
export default defineComponent( {
	name: 'CdxSearchInput',

	components: {
		CdxButton,
		CdxTextInput
	},

	/**
	 * Attributes, besides class, will be passed to the TextInput's input element.
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
		 * Submit button text.
		 *
		 * If this is provided, a submit button with this label will be added.
		 */
		buttonLabel: {
			type: String,
			default: ''
		},
		/**
		 * `status` property of the TextInput component
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
		'submit-click'
	],

	setup( props, { emit, attrs } ) {
		const wrappedModel = useModelWrapper( toRef( props, 'modelValue' ), emit );

		const internalClasses = computed( () => {
			return {
				'cdx-search-input--has-end-button': !!props.buttonLabel
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		const handleSubmit = () => {
			emit( 'submit-click', wrappedModel.value );
		};

		return {
			wrappedModel,
			rootClasses,
			rootStyle,
			otherAttrs,
			handleSubmit,
			searchIcon: cdxIconSearch
		};
	},

	methods: {
		/**
		 * Focus the component's input element.
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

.cdx-search-input {
	.cdx-mixin-input-with-button();

	&__input-wrapper {
		// This will make an absolutely positioned options menu passed in via the default slot line
		// up with the input, instead of extending the full width including the button.
		position: relative;
	}
}
</style>
