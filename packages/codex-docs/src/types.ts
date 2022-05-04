// Used for the value of icon properties
import { Icon } from '@wikimedia/codex-icons';

// For Icon properties, the value for code generation is going to be a string, but it should be
// output using a v-bind expression because it is not a literal string, but rather the name
// of an object that will have been made available in the relevant context. Such props can
// be wrapped in a `BoundProp` object so that generateProps() knows to use the v-bind
// form
export class BoundProp {
	readonly value: string;

	constructor( value: string ) {
		this.value = value;
	}
}

// For Icons being used in slots, we don't want the <cdx-icon> part to be escaped by the code
// that generates example snippets for the configurable demos, but the actual slot text that
// the user sets should be escaped. In Wrapper.vue the text is escaped before the <cdx-icon>
// is added, and then it gets wrapped in a EscapedSlotContent to avoid being escaped again
export class EscapedSlotContent {
	readonly value: string;

	constructor( value: string ) {
		this.value = value;
	}
}

/**
 * There are various types of controls, each defined here. All types include a name property.
 */
interface BaseConfig {
	name: string
}
export interface RadioPropConfig extends BaseConfig {
	type: 'radio',
	options: Array<string | number>,
	default?: string | number
}
export interface BooleanPropConfig extends BaseConfig {
	type: 'boolean',
	default?: false
}
export interface TextPropConfig extends BaseConfig {
	type: 'text'
	default?: string | number
}
export interface IconPropConfig extends BaseConfig {
	type: 'icon',
	default?: string
}
export interface SlotConfig extends BaseConfig {
	type: 'slot',
	default: string
}
// For icons in slots, the name must be *-icon corresponding to a slot with the same name (without
// the -icon suffix) that it should be added to. Make this a part of the type interface so that
// TypeScript validates usage.
export interface SlotIconConfig extends BaseConfig {
	name: `${string}-icon`,
	type: 'slot-icon',
	default?: string
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
// and adds a 'value' key with the same type as the removed 'default' key
type DefaultToValue<T extends { default?: string | number | boolean }> = Omit<T, 'default'> & {
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

export type PropValues = Record<string, string | number | boolean | BoundProp>;
// When being used to actually render a demo, Icon properties have actual Icon objects as their
// values, but the rest of the time the value is the icon name, for looking up an icon by the name
// in a configurable demo and generating code with the name instead of the underlying data. For
// no icon being configured, the value is undefined.
export type PropValuesWithIcons = Record<string, string | number | boolean | Icon | undefined>;
// EscapedSlotContent is only used for generating display code
export type SlotValues = Record<string, string | EscapedSlotContent>;

export interface DesignToken {
	name: string,
	value: string,
	comment?: string
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
