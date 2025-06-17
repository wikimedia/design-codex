/**
 * Entry point for the library. This file imports all components, composables, utility functions
 * and types that should be publicly available from the various files they live in, and exports
 * them all.
 *
 * All components, composables and public-facing utility functions and types that are ready for
 * public consumption should be listed here. Components that are still in development (and any
 * associated types) should not be added here; they should be added to components-wip/index.ts
 * instead, then moved here when they're ready.
 *
 * All types that are used to define props, slot parameters or event parameters are considered
 * public-facing and should be exported here. Types that are only used internally generally should
 * not be exported here. The Icon type lives in the icons package, and is also not exported here.
 *
 * All components and composables (except those in development) should be  exported, even if their
 * primary purpose is internal. Utility functions should be exported only if they are useful for
 * external use; most utility functions are internal-only and should not be exported.
 */

// Components
import CdxAccordion from './components/accordion/Accordion.vue';
import CdxButton from './components/button/Button.vue';
import CdxButtonGroup from './components/button-group/ButtonGroup.vue';
import CdxCard from './components/card/Card.vue';
import CdxCheckbox from './components/checkbox/Checkbox.vue';
import CdxChipInput from './components/chip-input/ChipInput.vue';
import CdxCombobox from './components/combobox/Combobox.vue';
import CdxDialog from './components/dialog/Dialog.vue';
import CdxField from './components/field/Field.vue';
import CdxIcon from './components/icon/Icon.vue';
import CdxImage from './components/image/Image.vue';
import CdxInfoChip from './components/info-chip/InfoChip.vue';
import CdxLabel from './components/label/Label.vue';
import CdxLookup from './components/lookup/Lookup.vue';
import CdxMenu from './components/menu/Menu.vue';
import CdxMenuButton from './components/menu-button/MenuButton.vue';
import CdxMenuItem from './components/menu-item/MenuItem.vue';
import CdxMessage from './components/message/Message.vue';
import CdxMultiselectLookup from './components/multiselect-lookup/MultiselectLookup.vue';
import CdxPopover from './components/popover/Popover.vue';
import CdxProgressBar from './components/progress-bar/ProgressBar.vue';
import CdxProgressIndicator from './components/progress-indicator/ProgressIndicator.vue';
import CdxRadio from './components/radio/Radio.vue';
import CdxSearchInput from './components/search-input/SearchInput.vue';
import CdxSearchResultTitle from './components/search-result-title/SearchResultTitle.vue';
import CdxSelect from './components/select/Select.vue';
import CdxTable from './components/table/Table.vue';
import CdxTab from './components/tab/Tab.vue';
import CdxTabs from './components/tabs/Tabs.vue';
import CdxTextArea from './components/text-area/TextArea.vue';
import CdxTextInput from './components/text-input/TextInput.vue';
import CdxThumbnail from './components/thumbnail/Thumbnail.vue';
import CdxToggleButton from './components/toggle-button/ToggleButton.vue';
import CdxToggleButtonGroup from './components/toggle-button-group/ToggleButtonGroup.vue';
import CdxToggleSwitch from './components/toggle-switch/ToggleSwitch.vue';
import CdxTooltip from './components/tooltip/Tooltip';
import CdxTypeaheadSearch from './components/typeahead-search/TypeaheadSearch.vue';

// Composables
import useComputedDirection from './composables/useComputedDirection';
import useComputedDisabled from './composables/useComputedDisabled';
import useComputedLanguage from './composables/useComputedLanguage';
import useFieldData from './composables/useFieldData';
import useFloatingMenu from './composables/useFloatingMenu';
import useGeneratedId from './composables/useGeneratedId';
import useI18n from './composables/useI18n';
import useIntersectionObserver from './composables/useIntersectionObserver';
import useModelWrapper from './composables/useModelWrapper';
import useResizeObserver from './composables/useResizeObserver';
import useSlotContents from './composables/useSlotContents';
import useSplitAttributes from './composables/useSplitAttributes';
import useWarnOnce from './composables/useWarnOnce';

// Utilities
import * as stringHelpers from './utils/stringHelpers';

// Types
import type {
	Placement,
	I18nMessageKey,
	I18nFunction,
	HTMLDirection,
	ButtonAction,
	ButtonWeight,
	ButtonSize,
	ButtonGroupItem,
	FloatingMenuOptions,
	IconSize,
	StatusType,
	TextInputType,
	MenuButtonItemData,
	MenuConfig,
	MenuGroupData,
	MenuState,
	MenuItemValue,
	MenuItemData,
	MenuItemDataWithId,
	MenuItemLanguageData,
	SearchResult,
	SearchResultClickEvent,
	Thumbnail,
	ModalAction,
	PrimaryModalAction,
	BoxDimensions,
	ValidationStatusType,
	ValidationMessages,
	HeadingLevel,
	ChipInputItem,
	ChipValidator,
	TableColumn,
	TableRow,
	TableSort,
	TableSortOption
} from './types';

// Constants.
import { TableRowIdentifier } from './constants';

export {
	// Components
	CdxAccordion,
	CdxButton,
	CdxButtonGroup,
	CdxCard,
	CdxCheckbox,
	CdxChipInput,
	CdxCombobox,
	CdxDialog,
	CdxField,
	CdxIcon,
	CdxImage,
	CdxInfoChip,
	CdxLabel,
	CdxLookup,
	CdxMenu,
	CdxMenuButton,
	CdxMenuItem,
	CdxMessage,
	CdxMultiselectLookup,
	CdxPopover,
	CdxProgressBar,
	CdxProgressIndicator,
	CdxRadio,
	CdxSearchInput,
	CdxSearchResultTitle,
	CdxSelect,
	CdxTable,
	CdxTab,
	CdxTabs,
	CdxTextArea,
	CdxTextInput,
	CdxThumbnail,
	CdxToggleButton,
	CdxToggleButtonGroup,
	CdxToggleSwitch,
	CdxTooltip,
	CdxTypeaheadSearch,

	// Composables
	useComputedDirection,
	useComputedDisabled,
	useComputedLanguage,
	useFieldData,
	useFloatingMenu,
	useGeneratedId,
	useI18n,
	useIntersectionObserver,
	useModelWrapper,
	useResizeObserver,
	useSlotContents,
	useSplitAttributes,
	useWarnOnce,

	// Utilities
	stringHelpers,

	// Types
	Placement,
	I18nMessageKey,
	I18nFunction,
	HTMLDirection,
	ButtonAction,
	ButtonWeight,
	ButtonSize,
	ButtonGroupItem,
	FloatingMenuOptions,
	TextInputType,
	IconSize,
	MenuButtonItemData,
	MenuConfig,
	MenuGroupData,
	MenuState,
	MenuItemValue,
	MenuItemData,
	MenuItemDataWithId,
	MenuItemLanguageData,
	SearchResult,
	SearchResultClickEvent,
	StatusType,
	Thumbnail,
	ModalAction,
	PrimaryModalAction,
	BoxDimensions,
	ValidationStatusType,
	ValidationMessages,
	HeadingLevel,
	ChipInputItem,
	ChipValidator,
	TableColumn,
	TableRow,
	TableSort,
	TableSortOption,

	// Constants.
	TableRowIdentifier
};
