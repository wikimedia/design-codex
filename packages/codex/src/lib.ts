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
import CdxButton from './components/button/Button.vue';
import CdxButtonGroup from './components/button-group/ButtonGroup.vue';
import CdxCard from './components/card/Card.vue';
import CdxCheckbox from './components/checkbox/Checkbox.vue';
import CdxCombobox from './components/combobox/Combobox.vue';
import CdxIcon from './components/icon/Icon.vue';
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
import CdxTextInput from './components/text-input/TextInput.vue';
import CdxThumbnail from './components/thumbnail/Thumbnail.vue';
import CdxToggleButton from './components/toggle-button/ToggleButton.vue';
import CdxToggleButtonGroup from './components/toggle-button-group/ToggleButtonGroup.vue';
import CdxToggleSwitch from './components/toggle-switch/ToggleSwitch.vue';
import CdxTypeaheadSearch from './components/typeahead-search/TypeaheadSearch.vue';

// Composables
import useComputedDirection from './composables/useComputedDirection';
import useComputedLanguage from './composables/useComputedLanguage';
import useGeneratedId from './composables/useGeneratedId';
import useIntersectionObserver from './composables/useIntersectionObserver';
import useModelWrapper from './composables/useModelWrapper';
import useResizeObserver from './composables/useResizeObserver';
import useSplitAttributes from './composables/useSplitAttributes';

// Utilities
import * as stringHelpers from './utils/stringHelpers';

// Types
import type {
	HTMLDirection,
	ButtonAction,
	ButtonType,
	ButtonGroupItem,
	MessageType,
	TextInputType,
	MenuConfig,
	MenuState,
	MenuItemData,
	MenuItemDataWithId,
	MenuItemLanguageData,
	SearchResult,
	SearchResultClickEvent,
	Thumbnail
} from './types';

export {
	// Components
	CdxButton,
	CdxButtonGroup,
	CdxCard,
	CdxCheckbox,
	CdxCombobox,
	CdxIcon,
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
	CdxTextInput,
	CdxThumbnail,
	CdxToggleButton,
	CdxToggleButtonGroup,
	CdxToggleSwitch,
	CdxTypeaheadSearch,

	// Composables
	useComputedDirection,
	useComputedLanguage,
	useGeneratedId,
	useIntersectionObserver,
	useModelWrapper,
	useResizeObserver,
	useSplitAttributes,

	// Utilities
	stringHelpers,

	// Types
	HTMLDirection,
	ButtonAction,
	ButtonType,
	ButtonGroupItem,
	MessageType,
	TextInputType,
	MenuConfig,
	MenuState,
	MenuItemData,
	MenuItemDataWithId,
	MenuItemLanguageData,
	SearchResult,
	SearchResultClickEvent,
	Thumbnail
};
