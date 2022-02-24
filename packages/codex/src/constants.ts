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
 * Default length of delay for debouncing, in milliseconds.
 */
export const DebounceInterval = 120;

/**
 * Sometimes, a menu of options will have an extra "option" that provides some
 * additional behavior, e.g. TypeaheadSearch's final option that links to the
 * search page for the current search query. This extra option will not have a
 * true value, so this string can be used in the code to identify it as a
 * footer option.
 */
export const MenuFooterValue = 'cdx-menu-footer-option';
