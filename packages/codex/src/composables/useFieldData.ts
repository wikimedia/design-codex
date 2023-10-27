import { Ref, ComputedRef, inject, ref, computed } from 'vue';
import useComputedDisabled from './useComputedDisabled';
import { ValidationStatusType } from '../types';
import { FieldInputIdKey, FieldStatusKey } from '../constants';

/**
 * Compute data based on whether it's provided by a Field component or bound to the component.
 *
 * This function returns computed values for disabled, status, and id that take into account a
 * value provided by a parent Field component and a value bound directly to the component as a prop
 * or attribute. It makes decisions about which to prioritize based on the type of data. See inline
 * code comments for details.
 *
 * @param disabledProp The disabled prop ref
 * @param statusProp The status prop ref
 * @param idAttr The id attribute ref
 *
 * @return An object of computed data for disabled, status, and id
 */
export default function useFieldData(
	disabledProp: Ref<boolean>,
	statusProp?: Ref<ValidationStatusType>,
	idAttr?: string
) : {
	computedDisabled: ComputedRef<boolean>,
	computedStatus: ComputedRef<ValidationStatusType>,
	computedInputId: ComputedRef<string|undefined>
} {
	// disabled: Return true if either the disabled prop or provided disabled value is true.
	const computedDisabled = useComputedDisabled( disabledProp );

	// status: Return the status prop if it's not 'default', otherwise return the provided status,
	// defaulting to 'default'.
	const providedStatus = inject( FieldStatusKey, ref<ValidationStatusType>( 'default' ) );
	const computedStatus = computed( () => {
		if ( statusProp?.value && statusProp.value !== 'default' ) {
			return statusProp.value;
		}

		return providedStatus.value;
	} );

	// id: Return the provided ID if there is one. If not, return the ID attribute.
	const providedId = inject( FieldInputIdKey, undefined );
	const computedInputId = computed( () => providedId?.value ?? idAttr );

	return {
		computedDisabled,
		computedStatus,
		computedInputId
	};
}
