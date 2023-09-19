<template>
	<div
		ref="rootElement"
		class="cdx-lookup"
		:class="rootClasses"
		:style="rootStyle"
	>
		<cdx-text-input
			ref="textInput"
			v-model="inputValue"
			v-bind="otherAttrs"
			class="cdx-lookup__input"
			role="combobox"
			autocomplete="off"
			aria-autocomplete="list"
			:aria-controls="menuId"
			:aria-expanded="expanded"
			:aria-activedescendant="highlightedId"
			:disabled="computedDisabled"
			:status="status"
			@update:model-value="onUpdateInput"
			@change="$event => $emit( 'change', $event )"
			@focus="onInputFocus"
			@blur="onInputBlur"
			@keydown="onKeydown"
		/>

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
					@slot Message to show if there are no results to display.
				-->
				<slot name="no-results" />
			</template>
		</cdx-menu>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	PropType,
	Ref,
	ComponentPublicInstance,
	ref,
	toRef,
	computed,
	watch
} from 'vue';

import CdxMenu from '../menu/Menu.vue';
import CdxTextInput from '../text-input/TextInput.vue';

import useGeneratedId from '../../composables/useGeneratedId';
import useModelWrapper from '../../composables/useModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';
import useFloatingMenu from '../../composables/useFloatingMenu';

import { MenuItemData, MenuConfig, ValidationStatusType } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A predictive text input with a dropdown menu of items.
 *
 * Typical use will involve listening for `input` events, fetching or otherwise computing menu
 * items, then passing those menu items back to the Lookup for display.
 */
export default defineComponent( {
	name: 'CdxLookup',

	components: {
		CdxMenu,
		CdxTextInput
	},

	/**
	 * We want the input to inherit attributes, not the root element.
	 */
	inheritAttrs: false,

	props: {
		/**
		 * Value of the current selection.
		 *
		 * Must be bound with `v-model:selected`.
		 *
		 * The property should be initialized to `null` rather than using a falsy value.
		 */
		selected: {
			type: [ String, Number, null ] as PropType<string|number|null>,
			required: true
		},

		/**
		 * Menu items.
		 */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			required: true
		},

		/**
		 * Initial value of the text input.
		 */
		initialInputValue: {
			type: [ String, Number ] as PropType<string|number>,
			default: ''
		},

		/**
		 * Whether the entire component is disabled.
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
		 * @property {string | number | null} selected The new selected value
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
		 * When the text input value changes.
		 *
		 * @property {string | number} value The new value
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

	setup: ( props, { emit, attrs, slots } ) => {
		// Set up local reactive data
		const rootElement = ref<HTMLDivElement>();
		const textInput = ref<InstanceType<typeof CdxTextInput>>();
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const menuId = useGeneratedId( 'lookup-menu' );
		const pending = ref( false );
		const expanded = ref( false );
		const isActive = ref( false );

		const { computedDisabled } = useFieldData( toRef( props, 'disabled' ) );

		const selectedProp = toRef( props, 'selected' );
		const modelWrapper = useModelWrapper( selectedProp, emit, 'update:selected' );
		const selectedMenuItem = computed( () =>
			props.menuItems.find( ( item ) => item.value === props.selected )
		);
		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		// This should not be reactive, so we just read the initial value.
		const inputValue = ref( props.initialInputValue );

		const internalClasses = computed( () => {
			return {
				'cdx-lookup--disabled': computedDisabled.value,
				'cdx-lookup--pending': pending.value
			};
		} );

		// Get helpers from useSplitAttributes.
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		/**
		 * Handle TextInput model value changes.
		 *
		 * @param newVal
		 */
		function onUpdateInput( newVal: string|number ) {
			// If there is a selection and it doesn't match the new value, clear it.
			if (
				selectedMenuItem.value &&
				selectedMenuItem.value.label !== newVal &&
				selectedMenuItem.value.value !== newVal
			) {
				modelWrapper.value = null;
			}

			// If the input is cleared, close the menu.
			if ( newVal === '' ) {
				expanded.value = false;
				pending.value = false;
			} else {
				// If there is a value, set pending to true.
				pending.value = true;
			}

			emit( 'input', newVal );
		}

		/**
		 * On focus, maybe open the menu.
		 *
		 * @param event The focus event
		 */
		function onInputFocus( event: FocusEvent ) {
			isActive.value = true;
			if (
				// Input value is not null or an empty string.
				inputValue.value !== null &&
				inputValue.value !== '' &&
				// There's either menu items to show or a no results message.
				( props.menuItems.length > 0 || slots[ 'no-results' ] )
			) {
				expanded.value = true;
			}
			emit( 'focus', event );
		}

		/**
		 * On blur, close the menu
		 *
		 * @param event The focus event
		 */
		function onInputBlur( event: FocusEvent ) {
			isActive.value = false;
			expanded.value = false;
			emit( 'blur', event );
		}

		/**
		 * Conditionally handle key navigation of the menu.
		 *
		 * For this component, the user should only be able to use key navigation to open the menu
		 * if there are menu items (or no-results slot content) to display.
		 *
		 * The space key should always do its default function of adding a space character,
		 * and doesn't open the menu.
		 *
		 * @param e
		 */
		function onKeydown( e: KeyboardEvent ) {
			if ( !menu.value ||
				computedDisabled.value ||
				props.menuItems.length === 0 && !slots[ 'no-results' ] ||
				e.key === ' ' ) {
				return;
			}
			menu.value.delegateKeyNavigation( e );
		}

		useFloatingMenu( textInput as Ref<ComponentPublicInstance>, menu );

		// When a new value is selected, update the input value to match.
		watch( selectedProp, ( newVal ) => {
			// If there is a newVal, including an empty string...
			if ( newVal !== null ) {
				// If there is a menu item selected, use the label (or the value, if there is no
				// label). Otherwise, use an empty string.
				const selectedValue = selectedMenuItem.value ?
					( selectedMenuItem.value.label || selectedMenuItem.value.value ) :
					'';

				if ( inputValue.value !== selectedValue ) {
					// Make sure that the input matches what was selected
					inputValue.value = selectedValue;

					// We emit the new value to make sure that the menu is filtered correctly
					emit( 'input', inputValue.value );
				}
			}
		} );

		// When the menu items change, maybe show the menu.
		// This is the main method of opening the menu of the Lookup component, since showing
		// the menu depends mostly on whether there are any items to show.
		watch( toRef( props, 'menuItems' ), ( newVal ) => {
			// Show the menu under certain conditions.
			if (
				// Only show the menu if we were in the pending state (meaning this menuItems change
				// was in response to user input) and the menu is still focused
				isActive.value && pending.value && (
					// Show the menu if there are either menu items or no-results content to show
					newVal.length > 0 || slots[ 'no-results' ]
				)
			) {
				expanded.value = true;
			}

			// Hide the menu if there are no menu items and no no-results content
			if ( newVal.length === 0 && !slots[ 'no-results' ] ) {
				expanded.value = false;
			}

			// Clear the pending state
			pending.value = false;
		} );

		return {
			rootElement,
			textInput,
			menu,
			menuId,
			highlightedId,
			inputValue,
			modelWrapper,
			expanded,
			computedDisabled,
			onInputBlur,
			rootClasses,
			rootStyle,
			otherAttrs,
			onUpdateInput,
			onInputFocus,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/pending-state.less';
@import ( reference ) '../../themes/mixins/element-with-menu-expanded.less';

.cdx-lookup {
	position: relative;
	box-sizing: @box-sizing-base;
	vertical-align: middle;

	&--pending .cdx-text-input__input {
		.cdx-mixin-pending-state();
	}

	&__input {
		.cdx-mixin-element-with-menu-expanded();
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		// The menu is positioned relative to the dialog backdrop, not the triggering element.
		position: static;
	}
}
</style>
