import { ComputedRef, Ref, InjectionKey, WritableComputedRef } from 'vue';
import { TabData, ValidationStatusType } from './types';
import { makeStringTypeValidator } from './utils/stringTypeValidator';

/**
 * String prefix for use in namespacing, etc
 */
export const LibraryPrefix = 'cdx';

export const ButtonActions = [
	'default',
	'progressive',
	'destructive'
] as const;

export const ButtonWeights = [
	'normal',
	'primary',
	'quiet'
] as const;

export const ButtonSizes = [
	'medium',
	'large'
] as const;

/**
 * Corresponds to the native button types, see
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attributes.
 */
export const ButtonTypes = [
	'button',
	'submit',
	'reset'
] as const;

export const IconSizes = [
	'x-small',
	'small',
	'medium'
] as const;

export const StatusTypes = [
	'notice',
	'warning',
	'error',
	'success'
] as const;

export const statusTypeValidator = makeStringTypeValidator( StatusTypes );

export const TextInputTypes = [
	'text',
	'search',
	'number',
	'email',
	'month',
	'password',
	'tel',
	'url',
	'week',
	'date',
	'datetime-local',
	'time'
] as const;

export const ValidationStatusTypes = [
	'default',
	'warning',
	'error',
	'success'
] as const;

export const MenuStates = [
	'selected',
	'highlighted',
	'highlightedViaKeyboard',
	'active'
] as const;

export const TableTextAlignments = [
	'start',
	'center',
	'end',
	// Numbers should be aligned to the right in all reading directionalities.
	'number'
];

/**
 * Default length of delay for debouncing, in milliseconds.
 */
export const DebounceInterval = 120;

/**
 * Default length of delay for displaying pending state, in milliseconds.
 */
export const PendingDelay = 500;

/**
 * Sometimes, a menu will have an extra item at the end that provides some
 * additional behavior, e.g. TypeaheadSearch's final menu item that links to the
 * search page for the current search query. This extra item will not have a
 * true value, so this string can be used in the code to identify it as a
 * footer item.
 */
export const MenuFooterValue = 'cdx-menu-footer-item';

export const TabsKey: InjectionKey<ComputedRef<Map<string, TabData>>> = Symbol( 'CdxTabs' );
export const ActiveTabKey: InjectionKey<WritableComputedRef<string>> = Symbol( 'CdxActiveTab' );

// Keys for data provided by the Field component.
export const FieldInputIdKey: InjectionKey<ComputedRef<string|undefined>> = Symbol( 'CdxFieldInputId' );
export const FieldDescriptionIdKey: InjectionKey<ComputedRef<string|undefined>> = Symbol( 'CdxFieldDescriptionId' );
export const FieldStatusKey: InjectionKey<Ref<ValidationStatusType>> = Symbol( 'CdxFieldStatus' );

export const DisabledKey: InjectionKey<Ref<boolean>> = Symbol( 'CdxDisabled' );

/**
 * A utility class to indicate that certain elements (like thumbnail images)
 * should be excluded from any invert-based "dark mode" theming applied
 * downstream (by the DarkMode extension, for example). No styles are applied
 * to this class within Codex.
 *
 * https://phabricator.wikimedia.org/T345281
 */
export const NoInvertClass = `${ LibraryPrefix }-no-invert` as const;
