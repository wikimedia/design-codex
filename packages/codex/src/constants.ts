import { InjectionKey, ComputedRef, Ref } from 'vue';
import { MenuState, MenuOptionWithId } from './types';

/**
 * String prefix for use in namespacing, etc
 */
export const LibraryPrefix = 'cdx';

export const ButtonActions = [
	'default',
	'progressive',
	'destructive'
] as const;

export const ButtonTypes = [
	'normal',
	'primary',
	'quiet'
] as const;

export const MessageTypes = [
	'notice',
	'warning',
	'error',
	'success'
] as const;

export const TextInputTypes = [
	'text',
	'search'
] as const;

export const MenuStates = [
	'selected',
	'highlighted',
	'active'
] as const;

/**
 * Keys for shared data between parent and child in any menu-like scenario
 * dropdown menu, autocomplete suggestions, button with options, etc
 */
export const MenuStateKey: InjectionKey<
	Record<MenuState, Readonly<Ref<MenuOptionWithId|null>>>
> = Symbol( 'CdxMenuState' );

export const MenuOptionsKey: InjectionKey<
	ComputedRef<MenuOptionWithId[]>
> = Symbol( 'CdxMenuOptions' );
