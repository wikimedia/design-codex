import { Ref, ComputedRef, ref, inject, computed } from 'vue';
import { DisabledKey } from '../constants';

/**
 * Provides a computed ref describing whether the component is disabled.
 *
 * This is based on two sources:
 * 1. The `disabled` prop or attribute of the component itself
 * 2. A provided `disabled` value, if there is one
 *
 * If either of these is true, the component should be disabled.
 *
 * @param disabledProp The disabled prop or attribute ref
 * @return A computed ref with a boolean value
 */
export default function useComputedDisabled( disabledProp: Ref<boolean> ) : ComputedRef<boolean> {
	// See if there is a provided value. If not, just set this to false.
	const providedDisabled = inject( DisabledKey, ref( false ) );
	// Return true if either the provided value or the prop/attribute value is true.
	return computed( () => providedDisabled.value || disabledProp.value );
}
