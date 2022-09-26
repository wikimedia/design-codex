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

### ButtonType

See [ButtonTypes](#buttontypes).

```ts
// Allowed values: 'normal', 'primary', 'quiet'
type ButtonType = typeof ButtonTypes[ number ];
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

### MessageType

See [MessageTypes](#messagetypes).

```ts
// Allowed values: 'notice', 'warning', 'error', 'success'
type MessageType = typeof MessageTypes[ number ];
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

### TextInputType

See [TextInputTypes](#textinputtypes).

```ts
// Allowed values: 'text', 'search'
type TextInputType = typeof TextInputTypes[ number ];
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

### ButtonTypes

```ts
const ButtonTypes = [
	'normal',
	'primary',
	'quiet'
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

### MessageTypes

```ts
const MessageTypes = [
	'notice',
	'warning',
	'error',
	'success'
];
```

### TextInputTypes

```ts
const TextInputTypes = [
	'text',
	'search'
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
