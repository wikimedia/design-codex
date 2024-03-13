---
outline: deep
---

# Types and constants

## Type definitions

Since Codex is written in TypeScript, we often make use of special types for things like complex
props. Below is documentation of all public types.

### ButtonAction

See [ButtonActions](#buttonactions).

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

See [ButtonSizes](#buttonsizes).

```ts
// Allowed values: 'medium', 'large'
type ButtonSize = typeof ButtonSizes[ number ];
```

### ButtonType

See [ButtonTypes](#buttontypes).

```ts
// Allowed values: 'button', 'submit', 'reset'
type ButtonType = typeof ButtonTypes[ number ];
```

### ButtonWeight

See [ButtonWeights](#buttonweights).

```ts
// Allowed values: 'normal', 'primary', 'quiet'
type ButtonWeight = typeof ButtonWeights[ number ];
```

### ChipInputItem

```ts
interface ChipInputItem {
	value: string,
	icon?: Icon
}
```

### DialogAction

```ts
interface DialogAction {
	label: string,
	disabled?: boolean
}
```

### HTMLDirection

```ts
type HTMLDirection = 'ltr' | 'rtl';
```

### Icon

Icons are a special type defined in the `@wikimedia/codex-icons` package. The `Icon` type is a union
of several different other types.

```ts
type Icon = SimpleIcon | IconFlipForRtl | IconVariedByDir | IconVariedByLang;
```

#### SimpleIcon

Either an object with a `path` property or a string.

```ts
interface PathIcon {
	/**
	 * An SVG path string, e.g. 'M3 3H1v16h18v-2H3z'
	 */
	path: string
}

/**
 * An SVG string, e.g. '<path d="M3 3H1v16h18v-2H3z"/>'. An SVG string may contain multiple tags,
 * e.g. '<circle x="..." y="..." r="..."/><path d="..."/>'. SVG strings should not contain an
 * <?xml ...?> tag or a wrapping <svg> tag.
 */
type SvgIcon = string;

type SimpleIcon = PathIcon | SvgIcon;
```

#### IconSize

See [IconSizes](#iconsizes).

```ts
// Allowed values: 'medium', 'small', 'x-small'
type IconSize = typeof IconSizes[ number ];
```

#### IconFlipForRtl

An icon with a single SVG that should flip horizontally in RTL mode.

```ts
export interface IconFlipForRtl {
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

#### IconVariedByDir

An icon that varies per text direction (but can't just be flipped).

```ts
interface IconVariedByDir {
	/** Icon for RTL */
	rtl: SimpleIcon,
	/** Icon for LTR */
	ltr: SimpleIcon
}
```

#### IconVariedByLang

An icon that varies per language.

```ts
interface IconVariedByLang {
	/** HTMLElement.lang code with corresponding icon. */
	langCodeMap: Record<string, SimpleIcon | IconFlipForRtl>,
	/** The default icon. */
	default: SimpleIcon | IconFlipForRtl
}
```

### MenuConfig

```ts
interface MenuConfig {
	/** The maximum number of items visible in an expanded menu. */
	visibleItemLimit?: number | null
	/** Whether to show thumbnails (or placeholder). */
	showThumbnail?: boolean,
	/** Whether to bold menu item labels. */
	boldLabel?: boolean,
	/** Whether to hide description text overflow via an ellipsis. */
	hideDescriptionOverflow?: boolean
}
```

### MenuItemData

```ts
interface MenuItemData {
	/** Item value or unique identifier. */
	value: string | number,
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
	disabled?: boolean
}
```

### MenuItemDataWithId

```ts
interface MenuItemDataWithId extends MenuItemData {
	id: string
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

See [MenuStates](#menustates).

```ts
// Allowed values: 'selected', 'highlighted', 'active'
type MenuState = typeof MenuStates[ number ];
```

### PrimaryDialogAction

See [DialogAction](#dialogaction).

```ts
interface PrimaryDialogAction extends DialogAction {
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

### StatusType

See [StatusTypes](#statustypes).

```ts
// Allowed values: 'notice', 'warning', 'error', 'success'
type StatusType = typeof StatusTypes[ number ];
```

### TableColumn

```ts
interface TableColumn {
	id: string,
	label: string,
	// Allowed values: 'start' (default), 'center', 'end'
	textAlign?: typeof TableTextAlignments[ number ]
}
```

### TableRow

```ts
type TableRow = Record<string, any>;
```

### TextInputType

See [TextInputTypes](#textinputtypes).

```ts
// Allowed values: 'text', 'search', 'number', 'email', 'password', 'tel', 'url', 'week', 'month', 'date', 'datetime-local', 'time'
type TextInputType = typeof TextInputTypes[ number ];
```

### ValidationMessages

```ts
interface ValidationMessages {
	error?: string
}
```

### ValidationStatusType

See [ValidationStatusTypes](#validationstatustypes).

```ts
// Allowed values: 'default', 'error'
type ValidationStatusType = typeof ValidationStatusTypes[ number ];
```

### Thumbnail

```ts
interface Thumbnail {
	url: string;
	/** Image width in pixels. */
	width?: number | null;
	/** Image height in pixels. */
	height?: number | null;
}
```

## Constants

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

### MenuStates

```ts
const MenuStates = [
	'selected',
	'highlighted',
	'active'
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

### TableTextAlignments
```ts
const TableTextAlignments = [
	'start',
	'center',
	'end'
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
