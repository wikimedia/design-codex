<template>
	<div
		class="cdx-lookup"
		:class="rootClasses"
		:style="rootStyle"
	>
		<cdx-text-input
			v-model="inputValue"
			v-bind="otherAttrs"
			role="combobox"
			autocomplete="off"
			aria-autocomplete="list"
			:aria-owns="menuId"
			:aria-expanded="expanded"
			:aria-activedescendant="highlightedId"
			:disabled="disabled"
			@update:model-value="onUpdateInput"
			@focus="onFocus"
			@blur="onBlur"
			@keydown="onKeydown"
		/>

		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="modelWrapper"
			v-model:expanded="expanded"
			:menu-items="menuItems"
			v-bind="menuConfig"
		>
			<template #default="{ menuItem }">
				<!--
					@slot Display of an individual item in the menu
					@binding {MenuItemData} menuItem The current menu item
				-->
				<slot name="menu-item" :menuItem="menuItem" />
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
import { MenuItemData, MenuConfig } from '../../types';

/**
 * Text input with a dropdown menu of items, which are usually based on the current input value.
 *
 * Typical use will involve listening for `new-input` events, fetching or otherwise computing menu
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
		 * Provided by `v-model` binding in the parent component.
		 */
		modelValue: {
			type: [ String, Number, null ] as PropType<string|number|null>,
			required: true
		},

		/**
		 * Menu items.
		 */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			default: () => []
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
		}
	},

	emits: [
		/**
		 * When the selected value changes.
		 *
		 * @property {string | number} modelValue The new model value
		 */
		'update:modelValue',
		/**
		 * When the text input value changes.
		 *
		 * @property {string | number} value The new value
		 */
		'new-input'
	],

	setup: ( props, { emit, attrs, slots } ) => {
		// Set up local reactive data
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const menuId = useGeneratedId( 'lookup-menu' );
		const pending = ref( false );
		const expanded = ref( false );
		const isActive = ref( false );

		const modelValueProp = toRef( props, 'modelValue' );
		const modelWrapper = useModelWrapper( modelValueProp, emit );
		const selectedMenuItem = computed( () =>
			props.menuItems.find( ( item ) => item.value === props.modelValue )
		);
		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		// This should not be reactive, so we just read the initial value.
		const inputValue = ref( props.initialInputValue );

		const internalClasses = computed( () => {
			return {
				'cdx-lookup--disabled': props.disabled,
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
			} else {
				// If there is a value, set pending to true.
				pending.value = true;
			}

			emit( 'new-input', newVal );
		}

		/**
		 * On focus, maybe open the menu.
		 */
		function onFocus() {
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
		}

		/**
		 * On blur, close the menu
		 */
		function onBlur() {
			isActive.value = false;
			expanded.value = false;
		}

		/**
		 * Conditionally handle key navigation of the menu.
		 *
		 * For this component, the user should only be able to use key navigation to open the menu
		 * if there are menu items (or no-results slot content) to display.
		 *
		 * Additionally, the space key should be able to open the menu, but otherwise it should
		 * do its default function of adding a space character.
		 *
		 * @param e
		 */
		function onKeydown( e: KeyboardEvent ) {
			if ( !menu.value ||
				props.disabled ||
				( props.menuItems.length === 0 && !slots[ 'no-results' ] ) ||
				( e.key === ' ' && expanded.value )
			) {
				return;
			}
			menu.value.delegateKeyNavigation( e );
		}

		// When a new value is selected, update the input value to match.
		watch( modelValueProp, ( newVal ) => {
			// If there is a newVal, including an empty string...
			if ( newVal !== null ) {
				// If there is a menu item selected, show the label (or the value, if there is no
				// label). Otherwise, set the input to empty.
				inputValue.value = selectedMenuItem.value ?
					( selectedMenuItem.value.label || selectedMenuItem.value.value ) :
					'';
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

			// Hide the menu if there are no menu items and no no-results content.
			if ( newVal.length === 0 && !slots[ 'no-results' ] ) {
				expanded.value = false;
			}

			// Clear the pending state
			pending.value = false;
		} );

		return {
			menu,
			menuId,
			highlightedId,
			inputValue,
			modelWrapper,
			expanded,
			onBlur,
			rootClasses,
			rootStyle,
			otherAttrs,
			onUpdateInput,
			onFocus,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.less';
@import './../../themes/mixins/pending-state.less';

.cdx-lookup {
	position: relative;
	box-sizing: @box-sizing-base;
	vertical-align: middle;

	&--pending .cdx-text-input__input {
		.cdx-pending-state();
	}
}
</style>
