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
				:disabled="computedDisabled"
				:status="computedStatus"
				autocomplete="off"
				role="combobox"
				@keydown="onKeydown"
				@input="$event => $emit( 'input', $event )"
				@change="$event => $emit( 'change', $event )"
				@focus="onInputFocus"
				@blur="onInputBlur"
			/>

			<!-- Button is only useful for mouse/touch users, hence skipping it for keyboard
				(`tabindex="-1"`) and assistive technology users (`aria-hidden="true"`). -->
			<cdx-button
				class="cdx-combobox__expand-button"
				aria-hidden="true"
				:disabled="computedDisabled"
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
	Ref,
	ComponentPublicInstance,
	computed,
	defineComponent,
	ref,
	toRef,
	watch,
	useId
} from 'vue';
import { cdxIconExpand } from '@wikimedia/codex-icons';

import CdxButton from '../button/Button.vue';
import CdxIcon from '../icon/Icon.vue';
import CdxMenu from '../menu/Menu.vue';
import CdxTextInput from '../text-input/TextInput.vue';

import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';
import useFloatingMenu from '../../composables/useFloatingMenu';

import { MenuItemData, MenuGroupData, MenuConfig, ValidationStatusType } from '../../types';
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
		 * Menu items and/or menu group definitions.
		 *
		 * Menu groups and individual menu items will be output in the order they appear here.
		 */
		menuItems: {
			type: Array as PropType<( MenuItemData|MenuGroupData )[]>,
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
		 *
		 * @default {}
		 */
		menuConfig: {
			type: Object as PropType<MenuConfig>,
			default: () => ( {} as MenuConfig )
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
		'load-more',
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

	setup( props, { emit, attrs, slots } ) {
		const input = ref<InstanceType<typeof CdxTextInput>>();
		const inputWrapper = ref<HTMLDivElement>();
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const menuId = useId();
		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const expanded = ref( false );
		const expanderClicked = ref( false );

		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		const {
			computedDisabled,
			computedStatus
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' )
		);

		const internalClasses = computed( () => ( {
			'cdx-combobox--expanded': expanded.value,
			'cdx-combobox--disabled': computedDisabled.value
		} ) );

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
		 *
		 * @param event
		 */
		function onInputFocus( event: FocusEvent ): void {
			if ( expanderClicked.value && expanded.value ) {
				expanded.value = false;
			} else if ( props.menuItems.length > 0 || slots[ 'no-results' ] ) {
				expanded.value = true;
			}
			emit( 'focus', event );
		}

		/**
		 * When the input loses focus, update the state of the menu.
		 * If the menu was expanded and the expander was just clicked,
		 * keep the menu open. Otherwise, close the menu.
		 *
		 * @param event
		 */
		function onInputBlur( event: FocusEvent ): void {
			expanded.value = ( expanderClicked.value && expanded.value );
			emit( 'blur', event );
		}

		/**
		 * Set a flag variable *before* the text input loses focus so that
		 * we can correctly determine whether focus changes are due to the
		 * expander button being clicked.
		 */
		function onButtonMousedown(): void {
			if ( computedDisabled.value ) {
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
			if ( computedDisabled.value ) {
				return;
			}
			input.value?.focus(); // call the public focus() method on TextInput
		}

		function onKeydown( e: KeyboardEvent ) {
			if (
				!menu.value ||
				computedDisabled.value ||
				props.menuItems.length === 0 ||
				e.key === ' '
			) {
				return;
			}
			menu.value.delegateKeyNavigation( e );
		}

		useFloatingMenu( input as Ref<ComponentPublicInstance>, menu );

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
			menu,
			menuId,
			modelWrapper,
			expanded,
			highlightedId,
			computedDisabled,
			computedStatus,
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

.cdx-combobox {
	display: inline-block;
	position: relative;

	&__input-wrapper {
		display: flex;
	}

	&__input.cdx-text-input {
		flex: 1 1 auto;
		// Override TextInput `min-width` to allow for the expander button.
		min-width: @min-width-medium - @min-size-interactive-pointer;
		border-top-right-radius: @border-radius-sharp;
		border-bottom-right-radius: @border-radius-sharp;

		.cdx-text-input__input {
			border-right-width: 0;
		}
	}

	&__expand-button.cdx-button {
		position: relative;
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}

	&__expand-icon.cdx-icon {
		.cdx-mixin-icon(
			center,
			@min-size-icon-x-small,
			@size-icon-x-small
		);
	}

	&--expanded {
		.cdx-combobox__expand-button.cdx-button {
			border-bottom-right-radius: @border-radius-sharp;
		}
	}

	// Overrides when used within a scrollable container in another component (e.g. Dialog)
	.cdx-scrollable-container & {
		// The menu is positioned relative to a positioned ancestor of the scrollable container
		// (e.g. the Dialog's backdrop), not the triggering element.
		position: static;
	}
}
</style>
