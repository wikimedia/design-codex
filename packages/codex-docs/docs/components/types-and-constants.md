---
outline: deep
---

# Types and constants

## Type definitions

Since Codex is written in TypeScript, we often make use of special types for things like complex
props. Below is documentation of all public types.

### BreadcrumbItem

```ts
interface BreadcrumbItem {
	/** Text displayed for the breadcrumb item. */
	label: string;
	/** URL for navigation when the breadcrumb item is clicked. */
	url: string;
}
```

### ContainerSize

Refer to [ContainerSizes](#containersizes).

```ts
// Allowed values: 'medium', 'large', 'x-large', 'full'
type ContainerSize = typeof ContainerSizes[ number ];
```

### ButtonAction

Refer to [ButtonActions](#buttonactions).

```ts
// Allowed values: 'default', 'progressive', 'destructive'
type ButtonAction = typeof ButtonActions[ number ];
```

### ButtonGroupItem

```ts
interface ButtonGroupItem {
	/** Button value or unique identifier */
	value: string | number,
	/**
	 * Display label for the button, or null to show no label (for icon-only buttons).
	 * If the label property is missing, the value property is used as the label.
	 */
	label?: string|null,
	/** Icon to display before the label */
	icon?: Icon,
	/** ARIA label for the button. Used for accessibility for icon-only buttons. */
	ariaLabel?: string,
	/** Whether the button is disabled */
	disabled?: boolean
}
```

### ButtonSize

Refer to [ButtonSizes](#buttonsizes).

```ts
// Allowed values: 'small', 'medium', 'large'
type ButtonSize = typeof ButtonSizes[ number ];
```

### ButtonType

Refer to [ButtonTypes](#buttontypes).

```ts
// Allowed values: 'button', 'submit', 'reset'
type ButtonType = typeof ButtonTypes[ number ];
```

### ButtonWeight

Refer to [ButtonWeights](#buttonweights).

```ts
// Allowed values: 'normal', 'primary', 'quiet'
type ButtonWeight = typeof ButtonWeights[ number ];
```

### ChipInputItem

```ts
interface ChipInputItem {
	value: string|number,
	label?: string,
	icon?: Icon,
	className?: string
}
```

### ChipValidator

```ts
type ChipValidator = ( value: string|number ) => boolean;
```

### FloatingMenuOptions

Options which can be passed to the `useFloatingMenu` composable.
The `Placement` and `OffsetOptions` types come from the 3rd-party
[FloatingUI package.](https://floating-ui.com/)

```ts
interface FloatingMenuOptions {
	useAvailableWidth?: boolean,
	placement?: Placement,
	offset?: OffsetOptions
}
```

### HTMLDirection

```ts
type HTMLDirection = 'ltr' | 'rtl';
```

### I18nFunction
```ts
export type I18nFunction = ( messageKey: I18nMessageKey, ...params: any[] ) => string | null;
```

### Icon

The `Icon` type is a union of several other types.

```ts
type Icon = SimpleIcon | IconFlipForRtl | IconVariedByDir | IconVariedByLang;
```

### IconSize

Refer to [IconSizes](#iconsizes).

```ts
// Allowed values: 'medium', 'small', 'x-small'
type IconSize = typeof IconSizes[ number ];
```

### IconFlipForRtl

An icon with a single SVG that should flip horizontally in RTL mode.

```ts
interface IconFlipForRtl {
	/** LTR version of the icon. */
	ltr: SimpleIcon,
	/** Indicates that the icon should be flipped via CSS in RTL mode. */
	shouldFlip: true,
	/**
	 * Language codes that are exceptions to the above property (e.g. the help
	 * icon should flip in RTL mode, but not for Hebrew or Yiddish).
	 */
	shouldFlipExceptions?: string[]
}
```

### IconVariedByDir

An icon that varies per text direction (but can't only be flipped).

```ts
interface IconVariedByDir {
	/** Icon for RTL */
	rtl: SimpleIcon,
	/** Icon for LTR */
	ltr: SimpleIcon
}
```

### IconVariedByLang

An icon that varies per language.

```ts
interface IconVariedByLang {
	/** HTMLElement.lang code with corresponding icon. */
	langCodeMap: Record<string, SimpleIcon | IconFlipForRtl>,
	/** The default icon. */
	default: SimpleIcon | IconFlipForRtl
}
```

### ImageAspectRatio

Refer to [ImageAspectRatios](#imageaspectratios).

```ts
// Allowed values: '16:9','3:2','4:3','1:1','3:4','2:3'
export type ImageAspectRatio = typeof ImageAspectRatios[ number ];
```

### MenuConfig

```ts
interface MenuConfig {
	/** The maximum number of items visible in an expanded menu. */
	visibleItemLimit?: number | null,
	/** Whether to show thumbnails (or placeholder). */
	showThumbnail?: boolean,
	/** Whether to bold menu item labels. */
	boldLabel?: boolean,
	/** Whether to hide description text overflow via an ellipsis. */
	hideDescriptionOverflow?: boolean
}
```

### MenuGroupData

```ts
interface MenuGroupData {
	/** Required label for the group. */
	label: string,
	/** The menu items that appear in this group. */
	items: MenuItemData[],
	/** Optional description for the group. */
	description?: string,
	/** Optional icon for the group. */
	icon?: Icon,
	/** Whether to visually hide the label. */
	hideLabel?: boolean
}
```

### MenuItemValue

```ts
type MenuItemValue = string | number;
```

### MenuItemData

```ts
interface MenuItemData {
	/** Item value or unique identifier. */
	value: MenuItemValue,
	/** Display label for the menu item. */
	label?: string,
	/** Text to be appended to the result's label, e.g. text matching a search query. */
	match?: string,
	description?: string | null,
	/** Lang attributes of text properties. */
	language?: MenuItemLanguageData,
	icon?: Icon,
	thumbnail?: Thumbnail | null,
	/** If URL is included, menu item will be wrapped in an anchor element. */
	url?: string,
	/** Whether to open the URL in a new tab. */
	urlNewTab?: boolean,
	disabled?: boolean
}
```

### MenuItemDataWithId

```ts
interface MenuItemDataWithId extends MenuItemData {
	id: string
}
```

### MenuButtonItemData

```ts
interface MenuButtonItemData extends MenuItemData {
	// Only the "destructive" action is allowed for now
	action?: typeof ButtonActions[ 2 ]
}
```

### MenuItemLanguageData

```ts
interface MenuItemLanguageData {
	/** lang attribute of the label. */
	label?: string,
	/** lang attribute of the match. */
	match?: string,
	/** lang attribute of the description. */
	description?: string
}
```

### MenuState

Refer to [MenuStates](#menustates).

```ts
// Allowed values: 'selected', 'highlighted', 'active'
type MenuState = typeof MenuStates[ number ];
```

### ModalAction

```ts
interface ModalAction {
	label: string,
	disabled?: boolean
}
```

### Placement

Codex re-exports the `Placement` type from [FloatingUI](https://floating-ui.com/) for convenience.

```ts
type Placement = "top" | "right" | "bottom" | "left" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end";
```

### PrimaryModalAction

Refer to [ModalAction](#modalaction).

```ts
interface PrimaryModalAction extends ModalAction {
	actionType: 'progressive' | 'destructive'
}
```

### SearchResult

```ts
interface SearchResult extends MenuItemData {
	/** Result link. */
	url: string
}
```

### SearchResultClickEvent

```ts
interface SearchResultClickEvent {
	/** Search result that was clicked. */
	searchResult: SearchResult|null,
	/** Index of the search result within the array of results. */
	index: number,
	/** Number of search results. */
	numberOfResults: number
}
```

### SimpleIcon

Either an object with a `path` property or a string.

```ts
interface PathIcon {
	/**
	 * An SVG path string, e.g. 'M3 3H1v16h18v-2H3z'
	 */
	path: string
}

/**
 * An SVG string, e.g. '<path d="M3 3H1v16h18v-2H3z"/>'. An SVG string may contain multiple elements/tags,
 * e.g. '<circle x="..." y="..." r="..."/><path d="..."/>'. SVG strings should not contain an
 * <?xml ...?> declaration or a wrapping `<svg>` element.
 */
type SvgIcon = string;

type SimpleIcon = PathIcon | SvgIcon;
```

### StatusType

Refer to [StatusTypes](#statustypes).

```ts
// Allowed values: 'notice', 'warning', 'error', 'success'
type StatusType = typeof StatusTypes[ number ];
```

### TableSort

```ts
type TableSort<K extends string = string> = { [P in K]?: TableSortOption };
```

### TableSortOption

```ts
type TableSortOption = 'none' | 'asc' | 'desc';
```

### TableColumn

```ts
interface TableColumn {
	id: string,
	label?: string,
	// Allowed values: 'start' (default), 'center', 'end', 'number'
	textAlign?: typeof TableTextAlignments[ number ]
	// Value with units.
	width?: string,
	// Value with units.
	minWidth?: string,
	allowSort?: boolean
}
```

### TableRow

```ts
type TableRow = Record<string, any>;
```

### TableRowWithIdentifier

When both sorting and row selection are enabled, an extra unique idenfitier is needed for each
row. Check [TableRowIdentifier](#tablerowidentifier).

```ts
interface TableRowWithIdentifier extends TableRow {
	[TableRowIdentifier]: string
}
```

### TablePaginationPosition

```ts
type TablePaginationPosition = 'top' | 'bottom' | 'both';
```

### TablePaginationSizeOption

Like [MenuItemData](#menuitemdata), but `value` must be a number.

```ts
export interface TablePaginationSizeOption extends MenuItemData {
	value: number;
}
```

### TextInputType

Refer to [TextInputTypes](#textinputtypes).

```ts
// Allowed values: 'text', 'search', 'number', 'email', 'password', 'tel', 'url', 'week', 'month', 'date', 'datetime-local', 'time'
type TextInputType = typeof TextInputTypes[ number ];
```

### Thumbnail

```ts
interface Thumbnail {
	url: string;
}
```


### ValidationMessages

```ts
interface ValidationMessages {
	warning?: string,
	error?: string,
	success?: string
}
```

### ValidationStatusType

Refer to [ValidationStatusTypes](#validationstatustypes).

```ts
// Allowed values: 'default', 'error'
type ValidationStatusType = typeof ValidationStatusTypes[ number ];
```

## Constants

### ContainerSizes

```ts
const ContainerSizes = [
	'medium',
	'large',
	'x-large',
	'full'
];
```

### ButtonActions

```ts
const ButtonActions = [
	'default',
	'progressive',
	'destructive'
];
```

### ButtonSizes

```ts
const ButtonSizes = [
	'small',
	'medium',
	'large'
];
```

### ButtonTypes

```ts
const ButtonTypes = [
	'button',
	'submit',
	'reset'
];
```

### ButtonWeights

```ts
const ButtonWeights = [
	'normal',
	'primary',
	'quiet'
];
```

### IconSizes

```ts
const IconSizes = [
	'x-small',
	'small',
	'medium'
];
```

### ImageAspectRatios

```ts
const ImageAspectRatios = [
    '16:9',
    '3:2',
    '4:3',
    '1:1',
    '3:4',
    '2:3'
];
```

### MenuStates

```ts
const MenuStates = [
	'selected',
	'highlighted',
	'active'
];
```

### ObjectFitOptions

```ts
const ObjectFitOptions = [
	'fill',
	'contain',
	'cover',
	'none',
	'scale-down'
];
```

### ObjectPositions

```ts
const ObjectPositions = [
	'top',
	'bottom',
	'left',
	'right',
	'center'
];
```

### StatusTypes

```ts
const StatusTypes = [
	'notice',
	'warning',
	'error',
	'success'
];
```

### TableRowIdentifier

Special property of a table row for a unique identifier. Required when both sorting and row
selection are enabled.

```ts
const TableRowIdentifier = Symbol( 'CdxTableRowIdentifier' );
```

### TableTextAlignments
```ts
const TableTextAlignments = [
	'start',
	'center',
	'end',
	// Numbers should be aligned to the right in all reading directionalities.
	'number'
];
```

### TextInputTypes

```ts
const TextInputTypes = [
	'text',
	'search',
	'number',
	'email',
	'password',
	'tel',
	'url',
	'week',
	'month',
	'date',
	'datetime-local',
	'time'
];
```

### ValidationStatusTypes

```ts
const ValidationStatusTypes = [
	'default',
	'warning',
	'error',
	'success'
];
```

### DebounceInterval

Default length of delay for debouncing, in milliseconds.

```ts
const DebounceInterval = 120;
```

### PendingDelay

Default length of delay for displaying pending state, in milliseconds.

```ts
const PendingDelay = 500;
```

### NoInvertClass

A utility class to indicate that certain elements (like thumbnail images) should
be excluded from any invert-based "dark mode" theming applied downstream (by the
DarkMode extension, for example). No styles are applied to this class within
Codex.

```js
const NoInvertClass = 'cdx-no-invert';
```

Any user of Codex applying an invert-based color theme can use this class
to exclude certain elements from color inversion so that they appear in their
natural colors.
