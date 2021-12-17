import { ButtonActions, ButtonTypes, TextInputTypes, MenuStates } from './constants';
import { Icon } from 'icons';

export type StringTypeValidator<T extends string> = ( s: unknown ) => s is T;
export type ButtonAction = typeof ButtonActions[ number ];
export type ButtonType = typeof ButtonTypes[ number ];

export type HTMLDirection = 'ltr' | 'rtl';
export type TextInputType = typeof TextInputTypes[ number ];

export type MenuState = typeof MenuStates[ number ];
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
