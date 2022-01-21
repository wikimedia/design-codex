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
export interface MenuOption {
	/** Option value or unique identifier. */
	value: string | number,
	/** Display label for the option. */
	label?: string,
	disabled?: boolean,
	icon?: Icon,
	description?: string | null
}

export interface MenuOptionWithId extends MenuOption {
	id: string
}
export type MenuState = typeof MenuStates[ number ];

/** @public */
export interface SearchResultThumbnail {
	url: string;
	/** Image width in pixels. */
	width?: number | null;
	/** Image height in pixels. */
	height?: number | null;
}

/** @public */
export interface SearchResult extends MenuOption {
	/** Result link. */
	url: string,
	/** Result image. */
	thumbnail?: SearchResultThumbnail | null;
}

export type SearchResultWithId = SearchResult & MenuOptionWithId;

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
