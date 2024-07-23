import { computed, Ref, MaybeRef, ComputedRef } from 'vue';
import useI18n from './useI18n';
import { I18nMessageKey, I18nMessageValue } from '../types';

export default function useI18nWithOverride<P>(
	override: Ref<string>,
	messageKey: I18nMessageKey,
	defaultValue: I18nMessageValue<P>,
	params: MaybeRef<P>[] = []
): ComputedRef<string> {
	const translatedMessage = useI18n( messageKey, defaultValue, params );
	return computed( () => override.value || translatedMessage.value );
}
