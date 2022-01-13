import { ButtonActions, ButtonTypes, TextInputTypes, MenuStates } from './constants';
import { Icon } from 'icons';

/** @public */
export type ButtonAction = typeof ButtonActions[ number ];
/** @public */
export type ButtonType = typeof ButtonTypes[ number ];

/** @public */
export type HTMLDirection = 'ltr' | 'rtl';

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
