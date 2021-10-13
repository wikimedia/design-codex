import { StringTypeValidator } from './types';

/**
 * Make a validator function for a string-based type.
 *
 * This takes an array of allowed string values, and returns a function that
 * indicates whether the given value is one of the allowed values. This is
 * useful for when you have a prop whose type is a set of string constants, and
 * you need a validator for that prop.
 *
 * @example
 *     import { ButtonAction } from './types';
 *     import { ButtonActions } from './constants';
 *     import { makeStringTypeValdiator } from './utils';
 *     const isButtonAction = makeStringTypeValidator( ButtonActions );
 *
 *     // in a component definition:
 *     props: {
 *         action: {
 *             type: String as PropType<ButtonAction>
 *             validator: isButtonAction
 *         }
 *     }
 *
 *     // You can shorten this by inlining the isButtonAction variable, but
 *     // then you have to explicitly specify the type to avoid errors:
 *     props: {
 *         action: {
 *             type: String as PropType<ButtonAction>
 *             validator: makeStringTypeValidator<ButtonAction>( ButtonActions )
 *         }
 *     }
 *
 * @param {string[]} allowedValues Allowed values
 * @return {Function} Function that takes a value and returns whether it is one of allowedValues
 */
export function makeStringTypeValidator<T extends string>(
	allowedValues: readonly T[]
) : StringTypeValidator<T> {
	return ( s: unknown ) : s is T => typeof s === 'string' &&
		( allowedValues as readonly string[] ).indexOf( s ) !== -1;
}
