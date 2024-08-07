import { computed, Ref, MaybeRef, ComputedRef } from 'vue';
import useI18n from './useI18n';
import { I18nMessageKey, I18nMessageValue } from '../types';

/**
 * Composable for using a translatable message in a component that can be overridden by a prop.
 * This is a wrapper around useI18n(), see its documentation for more information.
 *
 * If the `override` ref is non-empty, this composable returns the value of the `override` ref.
 * If the `override` ref is an empty string, the value of the i18n message is returned. Typically,
 * this `override` is a prop that the parent component can use to override the i18n message.
 *
 * The example below uses the `cdx-search-input-search-button-label` i18n message for a button
 * label, but allows the parent component to customize the button label by setting the `buttonLabel`
 * prop, overriding the i18n message.
 *
 *     const translatedSearchButtonLabel = useI18nWithOverride(
 *         toRef( props, 'buttonLabel' ),
 *         'cdx-search-input-search-button-label',
 *         'Search'
 *      );
 *
 * @param override String to use instead of the i18n message. This will be returned if non-empty.
 * @param messageKey Symbolic name of the message; see useI18n()
 * @param defaultValue Default value to use if there's no i18n function; see useI18n()
 * @param params Array of parameters to pass to the message; see useI18n()
 * @return A computed property with either the override (if non-empty), or the translated message
 *   (if the override is empty)
 */
export default function useI18nWithOverride<P>(
	override: Ref<string>,
	messageKey: I18nMessageKey,
	defaultValue: I18nMessageValue<P>,
	params: MaybeRef<P>[] = []
): ComputedRef<string> {
	const translatedMessage = useI18n( messageKey, defaultValue, params );
	return computed( () => override.value || translatedMessage.value );
}
