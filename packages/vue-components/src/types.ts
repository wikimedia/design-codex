import { ButtonActions, ButtonTypes } from './constants';

export type StringTypeValidator<T extends string> = ( s: unknown ) => s is T;
export type ButtonAction = typeof ButtonActions[ number ];
export type ButtonType = typeof ButtonTypes[ number ];
