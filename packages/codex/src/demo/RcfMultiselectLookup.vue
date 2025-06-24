<template>
	<div class="rcf-filter-selector">
		<cdx-toggle-button-group
			id="rcf-filter-group"
			v-model="currentFilterSet"
			:buttons="toggleButtons"
		/>
		<div
			class="rcf-multiselect-lookup"
			:class="rootClasses"
			:style="rootStyle"
		>
			<cdx-chip-input
				ref="chipInput"
				v-model:input-chips="inputChipsWrapper"
				v-model:input-value="computedInputValue"
				v-bind="otherAttrs"
				class="rcf-multiselect-lookup__chip-input"
				role="combobox"
				autocomplete="off"
				aria-autocomplete="list"
				:aria-controls="menuId"
				:aria-expanded="expanded"
				:aria-activedescendant="highlightedId"
				:separate-input="true"
				:readonly="readonly"
				:disabled="computedDisabled"
				:status="computedStatus"
				@update:input-value="onUpdateInputValue"
				@focus="onInputFocus"
				@blur="onInputBlur"
				@keydown="onKeydown"
				@chip-click="( chip ) => onChipClick( chip )"
			/>

			<cdx-menu
				:id="menuId"
				ref="menu"
				v-model:selected="selectedWrapper"
				v-model:expanded="expanded"
				:menu-items="computedMenuItems"
				v-bind="menuConfig"
				@menu-item-click="onMenuItemClick"
				@load-more="$emit( 'load-more' )"
			>
				<!-- Use the default slot, which has a binding for each menu item. -->
				<template #default="{ menuItem }">
					<!-- Check for the header menu item value using v-if. -->
					<!-- Stop propagation of clicks to prevent selecting this item. -->
					<span
						v-if="menuItem.value === 'rcf-menu-header'"
						class="rcf-multiselect-lookup__menu-header"
						@click.stop
					>
						<span class="rcf-multiselect-lookup__menu-header__title">
							<!-- Conditional rendering depending on which menu is showing. -->
							{{ currentFilterSetLabel }}
						</span>
						<!-- Note that all of the interactive elements in menu items are not
						accessible via keyboard navigation. This is true of the current RCF UI,
						but is far from ideal. For this reason, we don't advertise that you can
						put buttons etc. inside menu items. -->
						<span class="rcf-multiselect-lookup__menu-header__actions">
							<!-- Conditional rendering depending on which menu is showing. -->
							<cdx-toggle-button
								v-if="currentFilterSet !== 'filters'"
								v-model="excludeButton"
								:quiet="true"
							>
								Exclude selected
							</cdx-toggle-button>
							<cdx-toggle-button v-model="highlightButton" :quiet="true">
								<cdx-icon :icon="cdxIconHighlight" /> Highlight results
							</cdx-toggle-button>
						</span>
					</span>
					<!-- Custom display of actual menu items. -->
					<span v-else class="rcf-multiselect-lookup__menu-item">
						<span class="cdx-menu-item__text">
							<span class="cdx-menu-item__text__label">
								{{ menuItem.label }}
							</span>

							<span
								v-if="menuItem.description"
								class="cdx-menu-item__text__description"
							>
								{{ menuItem.description }}
							</span>
						</span>
						<span class="rcf-multiselect-lookup__menu-item__actions">
							<cdx-toggle-button
								v-model="menuItem.isHighlighted"
								:quiet="true"
								aria-label="Highlight"
								@click.stop="onHighlight( menuItem )"
							>
								<cdx-icon :icon="cdxIconHighlight" />
							</cdx-toggle-button>
						</span>
					</span>
				</template>

				<template #no-results>
					<!--
						@slot Message to show if there are no results to display.
					-->
					<slot name="no-results" />
				</template>
			</cdx-menu>
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	ComponentPublicInstance,
	Ref,
	PropType,
	ref,
	toRef,
	computed,
	provide,
	watch,
	nextTick,
	useId
} from 'vue';
// TODO: would all be imported from '@wikimedia/codex'.
import {
	CdxChipInput, CdxIcon, CdxMenu, CdxToggleButton, CdxToggleButtonGroup,
	useFieldData, useFloatingMenu, useModelWrapper, useSplitAttributes,
	ChipInputItem, MenuItemData, MenuItemValue, MenuGroupData, MenuConfig, ValidationStatusType,
	MenuItemDataWithId
} from '../lib';
import { cdxIconHighlight, cdxIconNotBright } from '@wikimedia/codex-icons';

// TODO: not included in lib. Probably don't need useOptionalModelWrapper and can recreate the rest.
import useOptionalModelWrapper from '../composables/useOptionalModelWrapper';
import { ValidationStatusTypes, AllowArbitraryKey } from '../constants';
import { makeStringTypeValidator } from '../utils/stringTypeValidator';

const statusValidator = makeStringTypeValidator( ValidationStatusTypes );

/**
 * A predictive text input with a dropdown menu of items from which multiple selections can be made.
 */
export default defineComponent( {
	name: 'RcfMultiselectLookup',

	components: {
		CdxChipInput,
		CdxIcon,
		CdxMenu,
		CdxToggleButton,
		CdxToggleButtonGroup
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
		 * Menu items and/or menu group definitions. Initialize to an empty array if there are no
		 * initial menu items.
		 *
		 * Menu groups and individual menu items will be output in the order they appear here.
		 */
		menuItems: {
			type: Array as PropType<( MenuItemData|MenuGroupData )[]>,
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
		 * Whether the entire component is disabled.
		 */
		disabled: {
			type: Boolean,
			default: false
		},
		/**
		 * Whether the MultiselectLookup is readonly.
		 */
		readonly: {
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
		 *
		 * @default {}
		 */
		menuConfig: {
			type: Object as PropType<MenuConfig>,
			default: () => ( {} as MenuConfig )
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
		 * When a chip is clicked.
		 *
		 * @property {ChipInputItem} chip The clicked chip
		 */
		'chip-click',
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
		const menuId = useId();
		const highlightedId = computed( () => menu.value?.getHighlightedMenuItem()?.id );

		const pending = ref( false );
		const expanded = ref( false );
		const isActive = ref( false );

		// Tell the child ChipInput not to allow arbitrary chips.
		provide( AllowArbitraryKey, ref( false ) );

		// Add header item to the beginning of menu items.
		const computedMenuItems = computed( () => [ { value: 'rcf-menu-header' }, ...props.menuItems ] );

		// Filter changer.
		const currentFilterSet = ref( 'filters' );
		const toggleButtons = [
			{ value: 'filters', label: 'Filters' },
			{ value: 'namespaces', label: 'Namespaces' },
			{ value: 'tagged', label: 'Tagged edits' }
		];
		const currentFilterSetLabel = computed( () => toggleButtons.find(
			( button ) => button.value === currentFilterSet.value )?.label );

		// Menu item contents.
		const excludeButton = ref( false );
		const highlightButton = ref( false );

		// TODO: If the RCFilters input won't be inside a Field component, this can be removed and
		// the disabled and status props can be used directly.
		const {
			computedDisabled,
			computedStatus
		} = useFieldData(
			toRef( props, 'disabled' ),
			toRef( props, 'status' )
		);

		const internalClasses = computed( () => ( {
			'rcf-multiselect-lookup--disabled': computedDisabled.value,
			'rcf-multiselect-lookup--pending': pending.value
		} ) );
		// TODO: since this isn't a reusable component, we don't need to do this (since RCF can add
		// its own classes and attributes in this file directly).
		const {
			rootClasses,
			rootStyle,
			otherAttrs
		} = useSplitAttributes( attrs, internalClasses );

		useFloatingMenu( chipInput as Ref<ComponentPublicInstance>, menu );

		const selectedWrapper = useModelWrapper( toRef( props, 'selected' ), emit, 'update:selected' );
		const inputChipsWrapper = useModelWrapper( toRef( props, 'inputChips' ), emit, 'update:input-chips' );

		// TODO: could simplify this and probably remove use of useOptionalModelWrapper.
		// Ref used if the inputValue prop is omitted.
		const internalInputValue = ref<MenuItemValue>( '' );
		const computedInputValue = useOptionalModelWrapper(
			internalInputValue,
			toRef( props, 'inputValue' ),
			emit,
			'update:input-value'
		);

		const showNoResults = computed( () => computedInputValue.value.toString().length > 0 && slots[ 'no-results' ] );

		/**
		 * Handle input changes.
		 *
		 * @param newVal
		 */
		async function onUpdateInputValue( newVal: string|number ) {
			// Await nextTick before emitting an input event so the component's `selected` prop can
			// catch up. This is necessary when the user edits a chip, because the menu might open
			// with new results before the selected prop has been updated to remove the edited chip,
			// which will highlight that chip's related option unintentionally.
			await nextTick();

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
		 * On blur, maybe close the menu.
		 *
		 * @param event The focus event
		 */
		function onInputBlur( event: FocusEvent ) {
			// If the filter group ToggleButtonGroup was clicked, keep menu open.
			if ( event.relatedTarget instanceof HTMLElement && event.relatedTarget?.closest( '#rcf-filter-group' ) ) {
				return;
			}
			isActive.value = false;
			expanded.value = false;
			emit( 'blur', event );
		}

		// Custom for RCFilters.
		function onChipClick( chip: ChipInputItem ) {
			const menuItem = menu.value?.computedMenuItems.find(
				( item ) => item.value === chip.value );
			// TODO: Change menu items to ensure the selected one is displayed.
			if ( menuItem ) {
				// TODO: Highlight chip.
				// Open menu.
				expanded.value = true;
				// Focus the input.
				chipInput.value?.focusInput();
				menu.value?.handleMenuItemChange( 'highlighted', menuItem );
			}
		}

		// Custom for RCFilters.
		function onHighlight( menuItem: MenuItemDataWithId ) {
			// If this item is not selected, add it to the input chips with a special CSS class.
			// TODO: CSS class, or change a new `status` property of the input chip?
			if ( !inputChipsWrapper.value.find( ( chip ) => chip.value === menuItem.value ) ) {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { id, ...newMenuItemWithoutId } = menuItem;
				const newChip = { className: 'rcf-multiselect-lookup__chip--unselected', ...newMenuItemWithoutId };
				inputChipsWrapper.value.push( newChip as ChipInputItem );
			}

			// Add the highlight color to the chip.
			inputChipsWrapper.value = inputChipsWrapper.value.map( ( chip ) => {
				if ( chip.value === menuItem.value ) {
					chip.icon = cdxIconNotBright;
				}
				return chip;
			} );

			// TODO: handle un-highlighting (and removing the chip if it's not selected).
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

		// Custom for RCFilters.
		function onMenuItemClick( menuItem: MenuItemDataWithId ) {
			const menuItemWasRemoved = selectedWrapper.value.includes( menuItem.value );
			if ( menuItemWasRemoved ) {
				// Remove value from selected array.
				selectedWrapper.value = selectedWrapper.value.filter(
					( selectedValue ) => selectedValue !== menuItem.value );

				// Remove chip.
				inputChipsWrapper.value = inputChipsWrapper.value.filter(
					( chip ) => chip.value !== menuItem.value );

				return;
			}

			// Add value to selected array.
			selectedWrapper.value.push( menuItem.value );

			const chipAlreadyExists = inputChipsWrapper.value.find(
				( chip ) => chip.value === menuItem.value );
			if ( chipAlreadyExists ) {
				// TODO: set chip's status to default (or remove unselected class);
			} else {
				// Add chip.
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const { id, ...newMenuItemWithoutId } = menuItem;
				inputChipsWrapper.value.push( newMenuItemWithoutId as MenuItemData );
			}
		}

		// Custom for RCFilters.
		// Keep the selected values in line with the input chips.
		// TODO: better to do on `update:inputChips` instead of this watcher?
		watch( toRef( props, 'inputChips' ), () => {
			// If a chip is added, do nothing - this can only happen via menu selection, and adding
			// a new chip is done in the `selected` watcher.

			// Remove selected values that do not have a corresponding chip.
			selectedWrapper.value = selectedWrapper.value.filter( ( selectedValue ) => {
				const matchingChip = inputChipsWrapper.value.find(
					( chip ) => chip.value === selectedValue );
				return !!matchingChip;
			} );
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
			computedMenuItems,

			currentFilterSet,
			toggleButtons,
			currentFilterSetLabel,

			excludeButton,
			highlightButton,
			onHighlight,

			selectedWrapper,
			inputChipsWrapper,
			computedInputValue,

			onUpdateInputValue,
			onInputBlur,
			onInputFocus,
			onChipClick,
			onKeydown,
			onMenuItemClick,

			cdxIconHighlight
		};
	}
} );
</script>

<style lang="less">
@import ( reference ) '@wikimedia/codex-design-tokens/theme-wikimedia-ui.less';

.rcf-multiselect-lookup {
	position: relative;
	box-sizing: @box-sizing-base;
	vertical-align: middle;

	&--pending {
		.cdx-chip-input {
			// Put the pending background on the `<input>` wrapper, which differs depending on
			// whether there's a separate input.
			&:not( .cdx-chip-input--has-separate-input ) .cdx-chip-input__chips,
			.cdx-chip-input__separate-input {
				// TODO: This isn't a public mixin.
				// .cdx-mixin-pending-state();
			}
		}
	}

	&__chip {
		&--unselected {
			// TODO: Not the real styles; just for demo purposes.
			background-color: @background-color-disabled;
			color: @color-subtle;
		}

		&--active {
			background-color: @background-color-progressive-subtle;
			color: @color-emphasized;
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
