<template>
	<div
		class="cdx-combobox"
		:class="rootClasses"
		:style="rootStyle"
	>
		<div ref="inputWrapper" class="cdx-combobox__input-wrapper">
			<cdx-text-input
				ref="input"
				v-model="modelWrapper"
				v-bind="otherAttrs"
				class="cdx-combobox__input"
				:aria-activedescendant="highlightedId"
				:aria-expanded="expanded"
				:aria-controls="menuId"
				:aria-owns="menuId"
				:disabled="disabled"
				:status="status"
				aria-autocomplete="list"
				autocomplete="off"
				role="combobox"
				@keydown="onKeydown"
				@focus="onInputFocus"
				@blur="onInputBlur"
			/>

			<!-- Button is only useful for mouse/touch users, hence skipping it
			for keyboard (`tabindex="-1"`) and screenreader
			(`aria-hidden="true"`) users. -->
			<cdx-button
				class="cdx-combobox__expand-button"
				aria-hidden="true"
				:disabled="disabled"
				tabindex="-1"
				type="button"
				@mousedown="onButtonMousedown"
				@click="onButtonClick"
			>
				<cdx-icon
					class="cdx-combobox__expand-icon"
					:icon="cdxIconExpand"
				/>
			</cdx-button>
		</div>

		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="modelWrapper"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			v-bind="menuConfig"
			@load-more="$emit( 'load-more' )"
		>
			<template #default="{ menuItem }">
				<!--
					@slot Display of an individual item in the menu
					@binding {MenuItemData} menu-item The current menu item
				-->
				<slot name="menu-item" :menu-item="menuItem" />
			</template>

			<template #no-results>
				<!--
					@slot Message to show if there are no menu items to display.
				-->
				<slot name="no-results" />
			</template>
		</cdx-menu>
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
import { cdxIconExpand } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxMenu from '../menu/Menu.vue';
import CdxTextInput from '../text-input/TextInput.vue';

import useModelWrapper from '../../composables/useModelWrapper';
import useGeneratedId from '../../composables/useGeneratedId';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useResizeObserver from '../../composables/useResizeObserver';

import { MenuItemData, MenuConfig, ValidationStatusType } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A text input with an expandable menu of predefined items.
 */
export default defineComponent( {
	name: 'CdxCombobox',
	components: {
		CdxButton,
		CdxIcon,
		CdxMenu,
		CdxTextInput
	},

	/**
	 * Attributes applied to this component by a parent will be applied
	 * to the TextInput child component rather than the root element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * Menu items. See the MenuItemData type.
		 */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			required: true
		},

		/**
		 * Value of the current selection.
		 *
		 * Must be bound with `v-model:selected`.
		 */
		selected: {
			type: [ String, Number ] as PropType<string|number>,
			required: true
		},

		/**
		 * Whether the dropdown is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},

		/**
		 * Configuration for various menu features. All properties default to false.
		 *
		 * See the MenuConfig type.
		 */
		menuConfig: {
			type: Object as PropType<MenuConfig>,
			default: () => {
				return {} as MenuConfig;
			}
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
		 * When the selected value changes.
		 *
		 * @property {string | number} selected The new selected value
		 */
		'update:selected',
		/**
		 * When the user scrolls towards the bottom of the menu.
		 *
		 * If it is possible to add or load more menu items, then now would be a good moment
		 * so that the user can experience infinite scrolling.
		 */
		'load-more'
	],

	setup( props, { emit, attrs, slots } ) {
		const input = ref<InstanceType<typeof CdxTextInput>>();
		const inputWrapper = ref<HTMLDivElement>();
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const menuId = useGeneratedId( 'combobox' );
		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const expanded = ref( false );
		const expanderClicked = ref( false );

		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		const internalClasses = computed( () => {
			return {
				'cdx-combobox--expanded': expanded.value,
				'cdx-combobox--disabled': props.disabled
			};
		} );

		const currentDimensions = useResizeObserver( inputWrapper );
		const currentWidthInPx = computed( () => `${currentDimensions.value.width ?? 0}px` );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		/**
		 * When the input gains focus, update the state of the menu.
		 * If the menu is collapsed, expand the menu (if there is anything to
		 * display). If the menu was already expanded and the expander was just
		 * clicked, collapse the menu instead.
		 */
		function onInputFocus(): void {
			if ( expanderClicked.value && expanded.value ) {
				expanded.value = false;
			} else if ( props.menuItems.length > 0 || slots[ 'no-results' ] ) {
				expanded.value = true;
			}
		}

		/**
		 * When the input loses focus, update the state of the menu.
		 * If the menu was expanded and the expander was just clicked,
		 * keep the menu open. Otherwise, close the menu.
		 */
		function onInputBlur(): void {
			expanded.value = ( expanderClicked.value && expanded.value );
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

		function onKeydown( e: KeyboardEvent ) {
			if (
				!menu.value ||
				props.disabled ||
				props.menuItems.length === 0 ||
				e.key === ' '
			) {
				return;
			}
			menu.value.delegateKeyNavigation( e );
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
			inputWrapper,
			currentWidthInPx,
			menu,
			menuId,
			modelWrapper,
			expanded,
			highlightedId,
			onInputFocus,
			onInputBlur,
			onKeydown,
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
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/icon-alignment.less';
@import ( reference ) '../../themes/mixins/element-with-menu-expanded.less';

.cdx-combobox {
	display: inline-block;
	position: relative;

	&__input-wrapper {
		display: flex;
	}

	&__input {
		flex: 1 1 auto;
		.cdx-mixin-element-with-menu-expanded();

		.cdx-text-input__input {
			// Override TextInput `min-width` to allow for the expander button.
			min-width: @min-width-medium - @min-size-interactive-pointer;
			border-right-width: 0;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	&__expand-button {
		position: relative;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&__expand-icon {
		.cdx-mixin-icon(
			center,
			@min-size-icon-x-small,
			@size-icon-x-small
		);
	}

	&--expanded {
		.cdx-combobox__expand-button {
			border-bottom-right-radius: 0;
		}
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		position: static;

		.cdx-menu {
			left: auto;
			/* stylelint-disable-next-line value-keyword-case */
			width: v-bind( currentWidthInPx );
		}
	}
}
</style>
