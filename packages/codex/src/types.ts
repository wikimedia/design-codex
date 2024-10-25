/*!
 * This file contains all types, both internal ones and externally exported ones.
 *
 * Exported types should be marked with `@public` comments in this file, AND explicitly
 * exported in lib.ts.
 */

import { Icon } from '@wikimedia/codex-icons';
import { Placement, OffsetOptions } from '@floating-ui/vue';

import {
	ButtonActions,
	ButtonTypes,
	ButtonWeights,
	ButtonSizes,
	IconSizes,
	TextInputTypes,
	ValidationStatusTypes,
	StatusTypes,
	MenuStates,
	TableTextAlignments,
	TableRowIdentifier,
	TablePaginationPositions,
	I18nMessageKeys
} from './constants';

export type I18nMessageValue<P> = string | ( ( ...params: P[] ) => string );

/** @public */
export type I18nMessageKey = typeof I18nMessageKeys[ number ];

/** @public */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type I18nFunction = ( messageKey: I18nMessageKey, ...params: any[] ) => string | null;

/** @public */
export type HTMLDirection = 'ltr' | 'rtl';

/** @public */
export type ButtonAction = typeof ButtonActions[ number ];
/** @public */
export type ButtonWeight = typeof ButtonWeights[ number ];
/** @public */
export type ButtonSize = typeof ButtonSizes[ number ];
/** @public */
export type ButtonType = typeof ButtonTypes[ number ];

/** @public */
export interface ButtonGroupItem {
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

/** @public */
export type IconSize = typeof IconSizes[ number ];

/** @public */
export type StatusType = typeof StatusTypes[ number ];
export type StatusIconMap = { [P in StatusType]: Icon }

/** @public */
export type TextInputType = typeof TextInputTypes[ number ];

/** @public */
export type ValidationStatusType = typeof ValidationStatusTypes[ number ];

/** @public */
export interface ValidationMessages {
	warning?: string,
	error?: string,
	success?: string
}

/** @public */
export interface Thumbnail {
	url: string;
}

/** @public */
export interface MenuItemLanguageData {
	/** lang attribute of the label. */
	label?: string,
	/** lang attribute of the match. */
	match?: string,
	/** lang attribute of the supporting text. */
	supportingText?: string,
	/** lang attribute of the description. */
	description?: string
}

/** @public */
export type MenuItemValue = string | number;

/** @public */
export interface MenuItemData {
	/** Item value or unique identifier. */
	value: MenuItemValue,
	/** Display label for the menu item. */
	label?: string,
	/** Text to be appended to the result's label, e.g. a text matching a search query. */
	match?: string,
	/** Text to display next to the item's label. */
	supportingText?: string,
	description?: string | null,
	/** Lang attributes of text properties. */
	language?: MenuItemLanguageData,
	icon?: Icon,
	thumbnail?: Thumbnail | null,
	/** If URL is included, menu item will be wrapped in an anchor element. */
	url?: string,
	disabled?: boolean
}

/** @public */
export interface MenuItemDataWithId extends MenuItemData {
	id: string
}

/** @public */
export interface MenuButtonItemData extends MenuItemData {
	action?: typeof ButtonActions[ 2 ]
}

/** @public */
export type MenuState = typeof MenuStates[ number ];

/** @public */
export interface MenuConfig {
	/** The maximum number of items visible in an expanded menu */
	visibleItemLimit?: number | null
	/** Whether to show thumbnails (or placeholder). */
	showThumbnail?: boolean,
	/** Whether to bold menu item labels. */
	boldLabel?: boolean,
	/** Whether to hide description text overflow via an ellipsis. */
	hideDescriptionOverflow?: boolean
}

/** @public */
export interface FloatingMenuOptions {
	useAvailableWidth?: boolean,
	placement?: Placement,
	offset?: OffsetOptions
}

/** @public */
export interface SearchResult extends MenuItemData {
	/** Result link. */
	url: string
}

export type SearchResultWithId = SearchResult & MenuItemDataWithId;

/** @public */
export interface SearchResultClickEvent {
	/** Search result that was clicked. */
	searchResult: SearchResult|null,
	/** Index of the search result within the array of results. */
	index: number,
	/** Number of search results. */
	numberOfResults: number
}

export type StringTypeValidator<T extends string> = ( s: unknown ) => s is T;

export interface TabData {
	name: string,
	label: string,
	id: string,
	disabled: boolean
}

/** @public */
export interface DialogAction {
	label: string,
	disabled?: boolean
}

/** @public */
export interface PrimaryDialogAction extends DialogAction {
	actionType: 'progressive' | 'destructive'
}

/** @public */
export interface BoxDimensions {
	width: number|undefined,
	height: number|undefined
}

/** @public */
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

/** @public */
export interface ChipInputItem {
	value: string|number,
	label?: string,
	icon?: Icon
}

/** @public */
export type ChipValidator = ( value: string|number ) => boolean;

/** @public */
export interface TableColumn {
	id: string,
	label?: string,
	textAlign?: typeof TableTextAlignments[ number ]
	// Value with units.
	width?: string,
	// Value with units.
	minWidth?: string,
	allowSort?: boolean
}

/** @public */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TableRow = Record<string, any>;

/** @public */
export interface TableRowWithIdentifier extends TableRow {
	// Required when sorting and row selection are both enabled.
	[TableRowIdentifier]: string|number
}

/** @public */
export type TableSortOption = 'none' | 'asc' | 'desc';

/** @public */
export type TableSort<K extends string = string> = { [P in K]?: TableSortOption };

/** @public */
export interface TablePaginationSizeOption extends MenuItemData {
	value: number;
}

/** @public */
export type TablePaginationPosition = typeof TablePaginationPositions[ number ];

export interface TooltipOptions {
	textContent: string,
	placement?: Placement
}
