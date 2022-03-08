/*!
 * This file contains all types, both internal ones and externally exported ones.
 *
 * Exported types should be marked with `@public` comments in this file, AND explicitly
 * exported in lib.ts.
 */

import { Icon } from '@wikimedia/codex-icons';
import {
	ButtonActions,
	ButtonTypes,
	MessageTypes,
	TextInputTypes,
	MenuStates
} from './constants';

/** @public */
export type HTMLDirection = 'ltr' | 'rtl';

/** @public */
export type ButtonAction = typeof ButtonActions[ number ];
/** @public */
export type ButtonType = typeof ButtonTypes[ number ];

/** @public */
export type MessageType = typeof MessageTypes[ number ];
export type MessageIconMap = {
	[P in MessageType]: Icon
}

/** @public */
export type TextInputType = typeof TextInputTypes[ number ];

/** @public */
export interface Thumbnail {
	url: string;
	/** Image width in pixels. */
	width?: number | null;
	/** Image height in pixels. */
	height?: number | null;
}

/** @public */
export interface MenuItemData {
	/** Item value or unique identifier. */
	value: string | number,
	/** Display label for the menu item. */
	label?: string,
	description?: string | null,
	icon?: Icon,
	thumbnail?: Thumbnail | null,
	/** If URL is included, menu item will be wrapped in an anchor element. */
	url?: string,
	disabled?: boolean
}

export interface MenuItemDataWithId extends MenuItemData {
	id: string
}
export type MenuState = typeof MenuStates[ number ];

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
