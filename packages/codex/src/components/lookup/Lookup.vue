<template>
	<div
		ref="rootElement"
		class="cdx-lookup"
		:class="rootClasses"
		:style="rootStyle"
	>
		<cdx-text-input
			ref="textInput"
			v-model="computedInputValue"
			v-bind="otherAttrs"
			class="cdx-lookup__input"
			role="combobox"
			autocomplete="off"
			aria-autocomplete="list"
			:aria-controls="menuId"
			:aria-expanded="expanded"
			:aria-activedescendant="highlightedId"
			:disabled="computedDisabled"
			:status="computedStatus"
			@update:model-value="onUpdateInput"
			@change="$event => $emit( 'change', $event )"
			@focus="onInputFocus"
			@blur="onInputBlur"
			@keydown="onKeydown"
		/>

		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selection"
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
	watch,
	useId
} from 'vue';

import CdxMenu from '../menu/Menu.vue';
import CdxTextInput from '../text-input/TextInput.vue';

import useModelWrapper from '../../composables/useModelWrapper';
import useOptionalModelWrapper from '../../composables/useOptionalModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';
import useFieldData from '../../composables/useFieldData';
import useFloatingMenu from '../../composables/useFloatingMenu';

import { MenuItemData, MenuGroupData, MenuConfig, ValidationStatusType } from '../../types';
import { ValidationStatusTypes } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A predictive text input with a dropdown menu of items.
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
		 * Menu items and/or menu group definitions.
		 *
		 * Menu groups and individual menu items will be output in the order they appear here.
		 */
		menuItems: {
			type: Array as PropType<( MenuItemData|MenuGroupData )[]>,
			required: true
		},

		/**
		 * Current value of the input. This prop is optional and should only be used if you need to
		 * keep track of the input value for some reason (e.g. to set an initial value).
		 *
		 * Optionally provided by `v-model:input-value` binding in the parent component.
		 */
		inputValue: {
			type: [ String, Number ] as PropType<string|number>,
			default: null
		},

		// DEPRECATED: Remove (T373532).
		/**
		 * Initial value of the text input. Non-reactive.
		 *
		 * @deprecated Use `inputValue` instead.
		 */
		initialInputValue: {
			type: [ String, Number ] as PropType<string|number>,
			default: '',
			validator: ( value ) => {
				if ( value ) {
					// eslint-disable-next-line no-console
					console.warn(
						'[CdxLookup]: prop "initialInputValue" is deprecated. Use "inputValue" instead.'
					);
				}
				return true;
			}
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
		 * @property {string | number | null} selected The new selected value
		 */
		'update:selected',
		/**
		 * When the input value changes. Only emitted if the inputValue prop is provided.
		 *
		 * @property {string | number} inputValue The new input value
		 */
		'update:input-value',
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
		const menuId = useId();
		const pending = ref( false );
		const expanded = ref( false );
		const isActive = ref( false );
		const initialMenuItems = ref( props.menuItems );

		const {
			computedDisabled,
			computedStatus
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' )
		);

		const selectedProp = toRef( props, 'selected' );
		const selection = useModelWrapper( selectedProp, emit, 'update:selected' );
		const selectedMenuItem = computed(
			() => menu.value?.getComputedMenuItems()
				.find( ( item ) => item.value === selection.value )
		);
		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		// Ref used if the inputValue prop is omitted.
		// DEPRECATED: Set to an empty string once the initialInputValue prop is removed (T373532).
		const internalInputValue = ref( props.initialInputValue );
		const computedInputValue = useOptionalModelWrapper(
			internalInputValue,
			toRef( props, 'inputValue' ),
			emit,
			'update:input-value'
		);

		const internalClasses = computed( () => ( {
			'cdx-lookup--disabled': computedDisabled.value,
			'cdx-lookup--pending': pending.value
		} ) );

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
			if ( selectedMenuItem.value ) {
				if (
					selectedMenuItem.value.label !== newVal &&
					selectedMenuItem.value.value !== newVal
				) {
					selection.value = null;
				}
			// Check the selected prop, in case there is no matching menu item (which means
			// selectedMenuItem.value will be undefined).
			} else if ( props.selected !== null && props.selected !== newVal ) {
				selection.value = null;
			}

			// If the input is cleared, close the menu (unless there were initial menu items, as
			// the parent component may want to show them again when the input is cleared.
			if ( newVal === '' && initialMenuItems.value.length === 0 ) {
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
			// One reason to open the menu on focus is if there is input (i.e. the input value is
			// not null nor an empty string). Store whether this is the case in this variable.
			const hasInput = computedInputValue.value !== null && computedInputValue.value !== '';
			// Another reason to open the menu on focus is if there are either menu items to show
			// or a "no results" message. Store whether this is the case in this variable.
			const hasMenuItems = !!( props.menuItems.length > 0 || slots[ 'no-results' ] );
			// The menu is open on focus when there are menu items and either an input value or
			// initial menu items passed in, e.g. suggested options.
			if ( hasMenuItems && ( hasInput || initialMenuItems.value.length > 0 ) ) {
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
		watch( selection, ( newVal ) => {
			// If there is a newVal, including an empty string...
			if ( newVal !== null ) {
				// If there is a menu item selected, use the label (or the value, if there is no
				// label). Otherwise, use an empty string.
				const inputValueForSelection = selectedMenuItem.value ?
					( selectedMenuItem.value.label ?? selectedMenuItem.value.value ) :
					'';

				if ( computedInputValue.value !== inputValueForSelection ) {
					// Make sure that the input matches what was selected
					computedInputValue.value = inputValueForSelection;

					// We emit the new value to make sure that the menu is filtered correctly
					emit( 'input', inputValueForSelection );
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
			computedInputValue,
			selection,
			expanded,
			computedDisabled,
			computedStatus,
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

.cdx-lookup {
	position: relative;
	box-sizing: @box-sizing-base;
	vertical-align: middle;

	&--pending .cdx-text-input .cdx-text-input__input {
		.cdx-mixin-pending-state();
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		// The menu is positioned relative to the dialog backdrop, not the triggering element.
		position: static;
	}
}
</style>
