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
	value: string | number,
	disabled?: boolean,
	label?: string,
	icon?: Icon,
	description?: string
}

export interface MenuOptionWithId extends MenuOption {
	id: string
}
export type MenuState = typeof MenuStates[ number ];

export type StringTypeValidator<T extends string> = ( s: unknown ) => s is T;
