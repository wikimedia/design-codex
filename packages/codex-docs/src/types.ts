// Used for the value of icon properties
import { Icon } from '@wikimedia/codex-icons';

/**
 * There are various types of controls, each defined here. All types include a name property.
 */
interface BaseConfig {
	name: string
}
export interface RadioPropConfig extends BaseConfig {
	type: 'radio',
	options: ( string | number )[],
	default?: string | number,
	initial?: string | number
}
export interface BooleanPropConfig extends BaseConfig {
	type: 'boolean',
	default?: false,
	initial?: boolean
}
export interface TextPropConfig extends BaseConfig {
	type: 'text',
	default?: string | number,
	initial?: string | number
}
export interface IconPropConfig extends BaseConfig {
	type: 'icon',
	default?: string,
	initial?: string
}
export interface SlotConfig extends BaseConfig {
	type: 'slot',
	default: string,
	initial?: string
}
// For icons in slots, the name must be *-icon corresponding to a slot with the same name (without
// the -icon suffix) that it should be added to. Make this a part of the type interface so that
// TypeScript validates usage.
export interface SlotIconConfig extends BaseConfig {
	name: `${string}-icon`,
	type: 'slot-icon',
	default?: string,
	initial?: string
}
export type ControlConfig =
	RadioPropConfig |
	BooleanPropConfig |
	TextPropConfig |
	IconPropConfig |
	SlotConfig |
	SlotIconConfig;

/**
 * ControlsConfig is an array of control config items.
 */
export type ControlsConfig = ControlConfig[];

// Utility type that maps one of the ControlConfig types to a type that removes the 'default' key
// and 'initial' key and adds a 'value' key with the same type as the removed 'default' key
type DefaultToValue<T extends { default?: string | number | boolean }> = Omit<T, 'default' | 'initial'> & {
	// For BooleanPropConfig, the type of 'default' is false, but we want the type of 'value'
	// to be boolean, so that true is also allowed
	value: T['default'] extends false|undefined ? boolean : NonNullable<T['default']>
};

export type PropConfigWithValue =
	DefaultToValue<RadioPropConfig> |
	DefaultToValue<BooleanPropConfig> |
	DefaultToValue<TextPropConfig> |
	DefaultToValue<IconPropConfig>;
export type SlotConfigWithValue = DefaultToValue<SlotConfig> | DefaultToValue<SlotIconConfig>;
export type ControlConfigWithValue = PropConfigWithValue | SlotConfigWithValue;

// When being used to actually render a demo, Icon properties have actual Icon objects as their
// values. For no icon being configured, the value is undefined.
export type PropValuesWithIcons = Record<string, string | number | boolean | Icon | undefined>;
// This SlotValues type is only used for rendering, Icon slots are passed by name to
// CdxDemoSlotIcon, everything is text.
export type SlotValues = Record<string, string>;

export interface DesignToken {
	name: string,
	value: string,
	comment?: string,
	deprecated?: string|true,
	filePath: string,
	original: {
		value: string
	},
	attributes: {
		tokens: string[],
		type?: 'theme' | 'base' | 'component'
	},
	path: string[]
}

export interface DesignTokensTree {
	// We'd like to exclude 'name', 'value', etc. from key here, but that doesn't seem possible
	// Using [ key: Exclude<string, 'value'> ] doesn't change anything
	// Adding value: never breaks type inference and causes TypeScript to think that
	// 'value' in tokenOrTree can never be false
	[ key: string ]: DesignToken|DesignTokensTree
}
