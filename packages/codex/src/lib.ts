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
import CdxInfoChip from './components/info-chip/InfoChip.vue';
import CdxCombobox from './components/combobox/Combobox.vue';
import CdxDialog from './components/dialog/Dialog.vue';
import CdxField from './components/field/Field.vue';
import CdxIcon from './components/icon/Icon.vue';
import CdxLabel from './components/label/Label.vue';
import CdxLookup from './components/lookup/Lookup.vue';
import CdxMenu from './components/menu/Menu.vue';
import CdxMenuItem from './components/menu-item/MenuItem.vue';
import CdxMessage from './components/message/Message.vue';
import CdxProgressBar from './components/progress-bar/ProgressBar.vue';
import CdxRadio from './components/radio/Radio.vue';
import CdxSearchInput from './components/search-input/SearchInput.vue';
import CdxSearchResultTitle from './components/search-result-title/SearchResultTitle.vue';
import CdxSelect from './components/select/Select.vue';
import CdxTab from './components/tab/Tab.vue';
import CdxTabs from './components/tabs/Tabs.vue';
import CdxTextArea from './components/text-area/TextArea.vue';
import CdxTextInput from './components/text-input/TextInput.vue';
import CdxThumbnail from './components/thumbnail/Thumbnail.vue';
import CdxToggleButton from './components/toggle-button/ToggleButton.vue';
import CdxToggleButtonGroup from './components/toggle-button-group/ToggleButtonGroup.vue';
import CdxToggleSwitch from './components/toggle-switch/ToggleSwitch.vue';
import CdxTypeaheadSearch from './components/typeahead-search/TypeaheadSearch.vue';

// Composables
import useComputedDirection from './composables/useComputedDirection';
import useComputedDisabled from './composables/useComputedDisabled';
import useComputedLanguage from './composables/useComputedLanguage';
import useFieldData from './composables/useFieldData';
import useGeneratedId from './composables/useGeneratedId';
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
	HTMLDirection,
	ButtonAction,
	ButtonWeight,
	ButtonSize,
	ButtonGroupItem,
	IconSize,
	StatusType,
	TextInputType,
	MenuConfig,
	MenuState,
	MenuItemData,
	MenuItemDataWithId,
	MenuItemLanguageData,
	SearchResult,
	SearchResultClickEvent,
	Thumbnail,
	DialogAction,
	PrimaryDialogAction,
	BoxDimensions,
	ValidationStatusType,
	ValidationMessages,
	HeadingLevel,
	ChipInputItem
} from './types';

export {
	// Components
	CdxAccordion,
	CdxButton,
	CdxButtonGroup,
	CdxCard,
	CdxCheckbox,
	CdxInfoChip,
	CdxCombobox,
	CdxDialog,
	CdxField,
	CdxIcon,
	CdxLabel,
	CdxLookup,
	CdxMessage,
	CdxMenu,
	CdxMenuItem,
	CdxProgressBar,
	CdxRadio,
	CdxSearchInput,
	CdxSearchResultTitle,
	CdxSelect,
	CdxTab,
	CdxTabs,
	CdxTextArea,
	CdxTextInput,
	CdxThumbnail,
	CdxToggleButton,
	CdxToggleButtonGroup,
	CdxToggleSwitch,
	CdxTypeaheadSearch,

	// Composables
	useComputedDirection,
	useComputedDisabled,
	useComputedLanguage,
	useFieldData,
	useGeneratedId,
	useIntersectionObserver,
	useModelWrapper,
	useResizeObserver,
	useSlotContents,
	useSplitAttributes,
	useWarnOnce,

	// Utilities
	stringHelpers,

	// Types
	HTMLDirection,
	ButtonAction,
	ButtonWeight,
	ButtonSize,
	ButtonGroupItem,
	TextInputType,
	IconSize,
	MenuConfig,
	MenuState,
	MenuItemData,
	MenuItemDataWithId,
	MenuItemLanguageData,
	SearchResult,
	SearchResultClickEvent,
	StatusType,
	Thumbnail,
	DialogAction,
	PrimaryDialogAction,
	BoxDimensions,
	ValidationStatusType,
	ValidationMessages,
	HeadingLevel,
	ChipInputItem
};
