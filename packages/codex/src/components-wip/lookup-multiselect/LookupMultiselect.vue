<template>
	<div
		class="cdx-lookup-multiselect"
		:class="rootClasses"
		:style="rootStyle"
	>
		<cdx-chip-input
			ref="chipInput"
			v-model:input-chips="inputChipsWrapper"
			v-model:input-value="computedInputValue"
			v-bind="otherAttrs"
			class="cdx-lookup-multiselect__chip-input"
			role="combobox"
			autocomplete="off"
			aria-autocomplete="list"
			:aria-controls="menuId"
			:aria-expanded="expanded"
			:aria-activedescendant="highlightedId"
			:separate-input="separateInput"
			:disabled="computedDisabled"
			:status="computedStatus"
			:disallow-arbitrary="true"
			@update:input-value="onUpdateInputValue"
			@focus="onInputFocus"
			@blur="onInputBlur"
			@keydown="onKeydown"
		/>

		<cdx-menu
			:id="menuId"
			ref="menu"
			v-model:selected="selectedWrapper"
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
	ref,
	toRef,
	computed,
	provide,
	watch
} from 'vue';

import CdxChipInput from '../../components/chip-input/ChipInput.vue';
import CdxMenu from '../../components/menu/Menu.vue';

import useFieldData from '../../composables/useFieldData';
import useFloatingMenu from '../../composables/useFloatingMenu';
import useGeneratedId from '../../composables/useGeneratedId';
import useModelWrapper from '../../composables/useModelWrapper';
import useOptionalModelWrapper from '../../composables/useOptionalModelWrapper';
import useSplitAttributes from '../../composables/useSplitAttributes';

import { ChipInputItem, MenuItemData, MenuItemValue, MenuConfig, ValidationStatusType } from '../../types';
import { ValidationStatusTypes, AllowArbitraryKey } from '../../constants';
import { makeStringTypeValidator } from '../../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A predictive text input with a dropdown menu of items from which multiple selections can be made.
 */
export default defineComponent( {
	name: 'CdxLookupMultiselect',

	components: {
		CdxChipInput,
		CdxMenu
	},

	props: {
		/**
		 * Current chips present in the input.
		 *
		 * Must be bound with `v-model:input-chips`. Initialize to an empty array if there are no
		 * initial selections. If there are, initialize to an array of input chips matching those
		 * selections.
		 */
		inputChips: {
			type: Array as PropType<ChipInputItem[]>,
			required: true
		},
		/**
		 * Value(s) of the current selection(s).
		 *
		 * Must be bound with `v-model:selected`. Initialize to an empty array if there are no
		 * initial selections.
		 */
		selected: {
			type: [ Array ] as PropType<MenuItemValue[]>,
			required: true
		},
		/**
		 * Menu items.
		 *
		 * Initialize to an empty array if there are no initial menu items.
		 */
		menuItems: {
			type: Array as PropType<MenuItemData[]>,
			required: true
		},
		/**
		 * Current value of the text input. This prop is optional and should only be used if you
		 * need to keep track of the text input value for some reason (e.g. for validation).
		 *
		 * Optionally provided by `v-model:input-value` binding in the parent component.
		 */
		inputValue: {
			type: [ String, Number ] as PropType<string|number>,
			default: null
		},
		/**
		 * Whether the text input should appear below the set of input chips.
		 *
		 * By default, the input chips are inline with the input.
		 */
		separateInput: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the entire component is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * `status` attribute of the input.
		 */
		status: {
			type: String as PropType<ValidationStatusType>,
			default: 'default',
			validator: statusValidator
		},
		/**
		 * Configuration for various menu features. All properties default to false.
		 *
		 * See the MenuConfig type.
		 * @default {}
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
		 * When the input chips change.
		 *
		 * @property {ChipInputItem[]} inputChips The new set of inputChips
		 */
		'update:input-chips',
		/**
		 * When the selected value changes.
		 *
		 * @property {MenuItemValue[]} selected The new set of selected values
		 */
		'update:selected',
		/**
		 * When the input value changes. Only emitted if the inputValue prop is provided.
		 *
		 * This event is emitted both when the user changes the input and when the input is changed
		 * or cleared automatically (e.g. on selection).
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
		 * When the user changes the value of the input. Not emitted when the input is changed
		 * automatically (e.g. on selection).
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
		const chipInput = ref<InstanceType<typeof CdxChipInput>>();
		const menu = ref<InstanceType<typeof CdxMenu>>();
		const menuId = useGeneratedId( 'lookup-multiselect-menu' );
		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		const pending = ref( false );
		const expanded = ref( false );
		const isActive = ref( false );

		// Tell the child ChipInput not to allow arbitrary chips.
		provide( AllowArbitraryKey, ref( false ) );

		const {
			computedDisabled,
			computedStatus
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' )
		);

		const internalClasses = computed( () => {
			return {
				'cdx-lookup-multiselect--disabled': computedDisabled.value,
				'cdx-lookup-multiselect--pending': pending.value
			};
		} );
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		// The reference element differs depending on whether there's a separate input or not. This
		// matters because useFloatingMenu unsets some of the border radiuses of the reference
		// element when the menu is open to create a flush layout.
		const referenceElement = computed( () => props.separateInput ?
			chipInput.value?.separateInputWrapper :
			chipInput.value?.chipsContainer
		);
		useFloatingMenu( referenceElement, menu );

		const selectedWrapper = useModelWrapper( toRef( props, 'selected' ), emit, 'update:selected' );
		const inputChipsWrapper = useModelWrapper( toRef( props, 'inputChips' ), emit, 'update:input-chips' );

		// Ref used if the inputValue prop is omitted.
		const internalInputValue = ref<MenuItemValue>( '' );
		const computedInputValue = useOptionalModelWrapper(
			internalInputValue,
			toRef( props, 'inputValue' ),
			emit,
			'update:input-value'
		);

		const showNoResults = computed( () =>
			computedInputValue.value.toString().length > 0 && slots[ 'no-results' ] );

		/**
		 * Handle input changes.
		 *
		 * @param newVal
		 */
		function onUpdateInputValue( newVal: string|number ) {
			// Set pending to true if there is a value.
			pending.value = newVal !== null && newVal !== '';

			// Emit an input event for parent components that aren't binding `inputValue`.
			emit( 'input', newVal );
		}

		/**
		 * On focus, maybe open the menu.
		 *
		 * @param event The focus event
		 */
		function onInputFocus( event: FocusEvent ) {
			isActive.value = true;

			// Open the menu if there are menu items to show, or if the no-results message should be
			// displayed.
			if ( props.menuItems.length > 0 || showNoResults.value ) {
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
				props.menuItems.length === 0 && !showNoResults.value ||
				e.key === ' ' ) {
				return;
			}
			menu.value.delegateKeyNavigation( e );
		}

		// Keep the input chips in line with the selected values.
		watch( toRef( props, 'selected' ), ( newVal ) => {
			// Compare newVal with inputChipsWrapper. If something in newVal is missing from the
			// chips, add it.
			const newSelections = newVal.filter( ( selection ) =>
				inputChipsWrapper.value.find( ( chip ) =>
					selection === chip.value ) === undefined );

			if ( newSelections.length > 0 ) {
				newSelections.forEach( ( newSelection ) => {
					const newMenuItem = props.menuItems.find( ( menuItem ) =>
						menuItem.value === newSelection );
					if ( newMenuItem ) {
						inputChipsWrapper.value.push( newMenuItem );
					}
				} );

				// Clear the input.
				computedInputValue.value = '';
			}

			// Remove any chips that no longer match a selected value.
			inputChipsWrapper.value = inputChipsWrapper.value.filter( ( chip ) => {
				return newVal.find( ( selection ) => chip.value === selection ) !== undefined;
			} );
		} );

		// Keep the selected values in line with the input chips.
		watch( toRef( props, 'inputChips' ), ( newVal ) => {
			// If a chip is added, do nothing - this can only happen via menu selection, and adding
			// a new chip is done in the `selected` watcher.

			// If a chip has been removed, update the array of selected values to match.
			if ( newVal.length < selectedWrapper.value.length ) {
				selectedWrapper.value = newVal.map( ( chip ) => chip.value );
			}
		} );

		// When the menu items change, maybe show the menu.
		// This is the main method of opening the menu of the component, since showing
		// the menu depends mostly on whether there are any items to show.
		watch( toRef( props, 'menuItems' ), ( newVal ) => {
			if ( newVal.length === 0 && !showNoResults.value ) {
				// Hide the menu if there are no menu items and no no-results content.
				expanded.value = false;
			} else if ( isActive.value && pending.value ) {
				// Open the menu if the input is focused and results were pending.
				expanded.value = true;
			}

			// Clear the pending state
			pending.value = false;
		} );

		return {
			chipInput,
			menu,
			menuId,
			highlightedId,
			expanded,
			computedDisabled,
			computedStatus,
			rootClasses,
			rootStyle,
			otherAttrs,

			selectedWrapper,
			inputChipsWrapper,
			computedInputValue,

			onUpdateInputValue,
			onInputBlur,
			onInputFocus,
			onKeydown
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';
@import ( reference ) '../../themes/mixins/pending-state.less';

.cdx-lookup-multiselect {
	position: relative;
	box-sizing: @box-sizing-base;
	vertical-align: middle;

	&--pending {
		.cdx-chip-input {
			// Put the pending background on the `<input>` wrapper, which differs depending on
			// whether there's a separate input.
			&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
			.cdx-chip-input__separate-input {
				.cdx-mixin-pending-state();
			}
		}
	}

	// Overrides when used within a Dialog component
	.cdx-dialog & {
		// The menu is positioned relative to the dialog backdrop, not the triggering element.
		position: static;
	}
}
</style>
