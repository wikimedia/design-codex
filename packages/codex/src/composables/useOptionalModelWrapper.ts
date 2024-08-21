import { computed, WritableComputedRef, Ref } from 'vue';

/**
 * Type for Vue's emit function, used below in the useOptionalModelWrapper function.
 */
type EmitFunc<EventName extends string, ParamType> =
	( event: EventName, param: ParamType ) => void;

/* eslint-disable no-redeclare */
export default function useOptionalModelWrapper<ModelValue, EventName extends 'update:modelValue'>(
	internalValueRef: Ref<ModelValue>,
	modelValueRef: Ref<ModelValue>,
	emit: EmitFunc<EventName, ModelValue>,
	eventName?: EventName
) : WritableComputedRef<ModelValue>;

export default function useOptionalModelWrapper<ModelValue, EventName extends string>(
	internalValueRef: Ref<ModelValue>,
	modelValueRef: Ref<ModelValue>,
	emit: EmitFunc<EventName, ModelValue>,
	eventName: EventName
) : WritableComputedRef<ModelValue>;

/**
 * Enable a component to optionally take in a modelValue for something, or otherwise internally
 * keep track of that value. Returns an editable computed property that emits an event if the
 * modelValue is provided, or updates the internal value ref if not. The editable computed property
 * can be bound with v-model to an internal component or element.
 *
 * Note that the optional v-model prop should have a default value of `null`.
 *
 * See the ChipInput component for sample usage, and the useModelWrapper composable for further
 * documentation of the TypeScript used here. This composable is meant for internal use only.
 *
 * @param internalValueRef A reactive reference of the value internal to the component.
 * @param modelValueRef A reactive reference of the modelValue prop optionally provided by the
 *                      parent component via v-model.
 * @param emit Vue's $emit function
 * @param eventName The name of the emitted event. Can be omitted if the component's emits option
 *                  contains the default 'update:modelValue' event name. Otherwise, one of the event
 *                  names defined in the emits option must be provided.
 * @return The computed property
 * @private
 */
export default function useOptionalModelWrapper<ModelValue, EventName extends string>(
	internalValueRef: Ref<ModelValue>,
	modelValueRef: Ref<ModelValue>,
	emit: EmitFunc<EventName, ModelValue>,
	eventName: EventName extends 'update:modelValue' ? EventName | undefined : EventName
) : WritableComputedRef<ModelValue> {
	return computed( {
		get: () => modelValueRef.value ?? internalValueRef.value,
		set: ( value: ModelValue ) => {
			if ( modelValueRef.value !== null ) {
				// If eventName is undefined, then 'update:modelValue' must be a valid EventName,
				// but TypeScript's type analysis isn't clever enough to realize that
				emit( ( eventName || 'update:modelValue' ) as EventName, value );
			} else {
				internalValueRef.value = value;
			}
		}
	} );
}
