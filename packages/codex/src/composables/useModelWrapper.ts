import { computed, WritableComputedRef, Ref } from 'vue';

/**
 * Type for Vue's emit function, used below in the useModelWrapper function.
 */
type EmitFunc<EventName extends string, ParamType> =
	( event: EventName, param: ParamType ) => void;

// See the docblock comment below for details on these function signatures.
/* eslint-disable no-redeclare */
export default function useModelWrapper<ModelValue, EventName extends 'update:modelValue'>(
	modelValueRef: Ref<ModelValue>,
	emit: EmitFunc<EventName, ModelValue>,
	eventName?: EventName
) : WritableComputedRef<ModelValue>;

export default function useModelWrapper<ModelValue, EventName extends string>(
	modelValueRef: Ref<ModelValue>,
	emit: EmitFunc<EventName, ModelValue>,
	eventName: EventName
) : WritableComputedRef<ModelValue>;

/**
 * Returns an editable computed property that emits an event when changed.
 *
 * This is useful when v-model will be set on a component in the parent, but that modelValue needs
 * to be bound via v-model to an input within the component. We can't just reuse the first
 * modelValue because that would mean mutating a prop. Instead, we need a separate computed property
 * that manually handles setting the value and emitting an event when the input is changed.
 *
 * This function returns a new computed property with get() and set() functions. get() returns the
 * current value of the provided modelValue. When the input is changed, set() emits an event with
 * the new value. The value bound to v-model on the component in the parent updates automatically.
 * The event emitted by the component can be customized via the eventName parameter.
 *
 * This approach was inspired by https://www.vuemastery.com/blog/vue-3-data-down-events-up/.
 *
 * See the Radio component for sample usage.
 *
 * useModelWrapper uses TypeScript's function overloading feature, where you can provide different
 * signatures for the same function. This approach allows components that include the default
 * eventName, 'update:modelValue', in their emits option to omit the eventName parameter. Components
 * that do not include that default event name in their emits option must provide the eventName
 * parameter.
 *
 * @param modelValueRef A reactive reference of the modelValue prop provided by the parent component
 *                      via v-model.
 * @param emit Vue's $emit function
 * @param eventName The name of the emitted event. Can be omitted if the component's emits option
 *                  contains the default 'update:modelValue' event name. Otherwise, one of the event
 *                  names defined in the emits option must be provided.
 * @return The computed property
 */
export default function useModelWrapper<ModelValue, EventName extends string>(
	modelValueRef: Ref<ModelValue>,
	emit: EmitFunc<EventName, ModelValue>,
	eventName: EventName extends 'update:modelValue' ? EventName | undefined : EventName
) : WritableComputedRef<ModelValue> {
	return computed( {
		get: () => modelValueRef.value,
		set: ( value: ModelValue ) =>
			// If eventName is undefined, then 'update:modelValue' must be a valid EventName,
			// but TypeScript's type analysis isn't clever enough to realize that
			emit( ( eventName || 'update:modelValue' ) as EventName, value )
	} );
}
