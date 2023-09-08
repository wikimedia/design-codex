import { computed, inject, unref, ComputedRef, MaybeRef } from 'vue';
import { I18nMessageKey, I18nFunction } from '../types';

type I18nDefault<P> = string | ( ( ...params: P[] ) => string );

/**
 * Composable for using translatable messages in a component.
 *
 * This function takes a symbolic message key, and returns the translation of that message as a
 * computed property. The message translation will be obtained from the function provided with
 * `provide( 'CdxI18nFunction' )`, which is passed the message key and the parameters. If no i18n
 * function was provided, or if the provided i18n function returns null for the requested message
 * key, the default value is used.
 *
 * Note that parameters are passed to this composable as a function that returns an array, which is
 * done to support reactivity. See also the example below.
 *
 * Providing an i18n function looks like this:
 *
 *     provide( 'CdxI18nFunction', ( messageKey, ...params ) => {
 *         // return a string, or null if you don't recognize the message key
 *     } );
 *
 * Usage in components looks like this:
 *
 *     // Without parameters:
 *     const translatedMessage = useI18n( 'cdx-componentname-messagename', 'Default value' );
 *
 *     // With parameters:
 *     const translatedMessageWithParams = useI18n(
 *         'cdx-componentname-messagename',
 *         ( r, n ) => `Row ${r} of ${n}`,
 *         [ currentRow, totalRows ]
 *     );
 *
 * @param messageKey Symbolic name of the message. Must be prefixed with cdx-
 * @param defaultValue Default value to use if there is no provided i18n function
 *   (or if it returns null). This can be a string, or a function that returns a string. You must
 *   pass a function if the message takes parameters, or if the default value needs to be reactive
 *   (e.g. is a prop value rather than a hardcoded string).
 * @param params Array of parameters to pass to the message. Parameters can be plain values or refs;
 *   refs will be unwrapped automatically, and will behave reactively. This is optional and can be
 *   omitted if the message doesn't take any parameters.
 * @return A computed property with the translated message. This computed property updates when the
 *   parameters change, or when reactive refs accessed by the provided i18n function change.
 */
export default function useI18n<P>(
	messageKey: I18nMessageKey,
	defaultValue: I18nDefault<P>,
	params: MaybeRef<P>[] = []
): ComputedRef<string> {
	const providedI18nFunc = inject<I18nFunction|undefined>( 'CdxI18nFunction', undefined );
	return computed( () => {
		const unwrappedParams = params.map( unref );
		const fromProvidedFunc = providedI18nFunc?.( messageKey, ...unwrappedParams );
		if ( fromProvidedFunc !== undefined && fromProvidedFunc !== null ) {
			return fromProvidedFunc;
		}
		return typeof defaultValue === 'function' ?
			defaultValue( ...unwrappedParams ) :
			defaultValue;
	} );
}
