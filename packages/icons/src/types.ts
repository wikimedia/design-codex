export interface PathIcon {
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
export type SvgIcon = string;

export type SimpleIcon = PathIcon | SvgIcon;

/**
 * An icon with a single SVG that should flip horizontally in RTL mode.
 */
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

/**
 * An icon that varies per text direction (but can't just be flipped).
 */
export interface IconVariedByDir {
	/** Icon for RTL */
	rtl: SimpleIcon,
	/** Icon for LTR */
	ltr: SimpleIcon
}

/**
 * An icon that varies per language.
 */
export interface IconVariedByLang {
	/** HTMLElement.lang code with corresponding icon. */
	langCodeMap: Record<string, SimpleIcon | IconFlipForRtl>,
	/** The default icon. */
	default: SimpleIcon | IconFlipForRtl
}

export type Icon = SimpleIcon | IconFlipForRtl | IconVariedByDir | IconVariedByLang;
