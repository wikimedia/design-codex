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
export interface SlotConfig extends BaseConfig {
	type: 'slot',
	default: string
}
export type ControlConfig = RadioPropConfig | BooleanPropConfig | TextPropConfig | SlotConfig;

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
	DefaultToValue<TextPropConfig>;
export type SlotConfigWithValue = DefaultToValue<SlotConfig>;
export type ControlConfigWithValue = PropConfigWithValue | SlotConfigWithValue;

export type PropValues = Record<string, string | number | boolean>;
export type SlotValues = Record<string, string>;
