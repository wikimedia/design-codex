<template>
	<div
		class="cdx-combobox"
		:class="rootClasses"
		:style="rootStyle"
	>
		<div class="cdx-combobox__input-wrapper">
			<CdxTextInput
				ref="input"
				v-model="modelWrapper"
				v-bind="otherAttrs"
				class="cdx-combobox__input"
				:aria-activedescendant="state.highlighted.value?.id"
				:aria-disabled="disabled"
				:aria-expanded="expanded"
				:aria-owns="menuId"
				:disabled="disabled"
				aria-autocomplete="list"
				autocomplete="off"
				role="combobox"
				tabindex="0"
				@keydown.space.enter.up.down.tab.esc="onKeyNavigation"
				@focus="onInputFocus"
				@blur="onInputBlur"
			/>

			<CdxButton
				class="cdx-combobox__expand-button"
				:disabled="disabled"
				tabindex="-1"
				@mousedown="onButtonMousedown"
				@click="onButtonClick"
			>
				<cdx-icon
					class="cdx-combobox__expand-icon"
					:icon="cdxIconExpand"
				/>
			</CdxButton>
		</div>

		<ul
			v-show="expanded"
			:id="menuId"
			class="cdx-combobox__menu"
			role="listbox"
			aria-multiselectable="false"
		>
			<CdxOption
				v-for="( option, index ) in computedOptions"
				v-bind="option"
				:key="index"
				@change="handleOptionChange"
			>
				<!--
					@slot Display of an individual option in the menu
					@binding {MenuOption} option The current option
				-->
				<slot name="menu-option" :option="option" />
			</CdxOption>

			<li v-if="$slots.footer" class="cdx-option">
				<!--
					@slot Content to display at the end of the options list
				-->
				<slot name="footer" />
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import {
	PropType,
	computed,
	defineComponent,
	ref,
	toRef,
	watch
} from 'vue';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxOption from '../option/Option.vue';
import CdxTextInput from '../text-input/TextInput.vue';

import useMenu from '../../composables/useMenu';
import useModelWrapper from '../../composables/useModelWrapper';
import useGeneratedId from '../../composables/useGeneratedId';
import useSplitAttributes from '../../composables/useSplitAttributes';

import { cdxIconExpand } from 'icons';
import { MenuOption } from '../../types';

/**
 * Text input with an adjoining button and an expandable menu of options.
 */
export default defineComponent( {
	name: 'CdxCombobox',
	components: {
		CdxButton,
		CdxIcon,
		CdxOption,
		CdxTextInput
	},

	/**
	 * Attributes applied to this component by a parent will be applied
	 * to the TextInput child component rather than the root element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * Menu options. See the MenuOption type.
		 */
		options: {
			type: Array as PropType<MenuOption[]>,
			required: true
		},

		/**
		 * Value provided by v-model binding in the parent component.
		 */
		modelValue: {
			type: [ String, Number ] as PropType<string|number>,
			default: ''
		},

		/**
		 * Whether the dropdown is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		}
	},

	emits: [
		/**
		 * When the selection value changes.
		 *
		 * @property {string | number} value The new value
		 */
		'update:modelValue'
	],

	setup( props, context ) {
		const input = ref<InstanceType<typeof CdxTextInput>>();
		const menuId = useGeneratedId( 'combobox' );
		const modelWrapper = useModelWrapper( toRef( props, 'modelValue' ), context.emit );
		const expanderClicked = ref( false );

		// Get helpers from useMenu.
		const {
			computedOptions,
			state,
			expanded,
			handleOptionChange,
			handleKeyNavigation
		} = useMenu( toRef( props, 'options' ), modelWrapper );

		const internalClasses = computed( () => {
			return {
				'cdx-combobox--disabled': props.disabled
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( context.attrs, internalClasses );

		/**
		 * When the input gains focus, update the state of the menu.
		 * If the menu is collapsed, expand the menu (if there is anything to
		 * display). If the menu was already expanded and the expander was just
		 * clicked, collapse the menu instead.
		 */
		function onInputFocus(): void {
			if ( expanderClicked.value && expanded.value ) {
				expanded.value = false;
			} else if ( computedOptions.value.length > 0 || context.slots.footer ) {
				expanded.value = true;
			}
		}

		/**
		 * When the input loses focus, update the state of the menu.
		 * If the menu was expanded and the expander was just clicked,
		 * keep the menu open. Otherwise, close the menu.
		 */
		function onInputBlur(): void {
			if ( expanderClicked.value && expanded.value ) {
				expanded.value = true;
			} else {
				expanded.value = false;
			}
		}

		/**
		 * Set a flag variable *before* the text input loses focus so that
		 * we can correctly determine whether focus changes are due to the
		 * expander button being clicked.
		 */
		function onButtonMousedown(): void {
			if ( props.disabled ) {
				return;
			}
			expanderClicked.value = true;
		}

		/**
		 * When clicked, the button will briefly receive focus itself (this is
		 * necessary for correct UX), but then the TextInput is focused
		 * programmatically.
		 */
		function onButtonClick(): void {
			if ( props.disabled ) {
				return;
			}
			input.value?.focus(); // call the public focus() method on TextInput
		}

		function onKeyNavigation( e: KeyboardEvent ) {
			if (
				props.disabled ||
				computedOptions.value.length === 0 ||
				( e.key === ' ' && expanded.value )
			) {
				return;
			}
			handleKeyNavigation( e );
		}

		/**
		 * No matter what, the flag needs to be reset every time the menu
		 * visibility state changes.
		 */
		watch( expanded, () => {
			expanderClicked.value = false;
		} );

		return {
			input,
			menuId,
			modelWrapper,
			computedOptions,
			state,
			expanded,
			onInputFocus,
			onInputBlur,
			handleOptionChange,
			onKeyNavigation,
			onButtonClick,
			onButtonMousedown,
			cdxIconExpand,
			rootClasses,
			rootStyle,
			otherAttrs
		};
	}
} );

</script>

<style lang="less">
@import ( reference ) 'wikimedia-ui-base/wikimedia-ui-base.less';
@import './../../themes/mixins/menu-icon.less';

.cdx-combobox {
	display: inline-block;
	position: relative;
	min-width: 280px;

	&__input-wrapper {
		// stylelint-disable-next-line plugin/no-unsupported-browser-features
		display: flex;
	}

	&__input {
		flex: 1 1 auto;

		input {
			border-right-width: 0;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	&__expand-button {
		position: relative;
		width: 36px;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&__expand-icon {
		.cdx-mixin-menu-icon( center, @size-indicator );
	}

	&__menu {
		background-color: @background-color-base;
		position: absolute;
		top: 32px;
		left: 0;
		z-index: 4;
		box-sizing: border-box;
		width: @size-full;
		margin: 0;
		margin-top: -@border-width-base;
		border: @border-base;
		border-radius: 0 0 @border-radius-base @border-radius-base;
		padding: 0;
	}
}
</style>
