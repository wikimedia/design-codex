import { Ref, ref, getCurrentInstance } from 'vue';
import { LibraryPrefix } from '../constants';
let counter = 0;

/**
 * Get a ref for a unique ID suitable for use in HTML templates.
 *
 * All strings begin with the library prefix "cdx-". If an optional identifier
 * string is provided, that is included as well. Alternatively, if an "id"
 * element is present on the calling component as either a prop or attribute,
 * that will be used if no identifier argument is provided. All strings include
 * a numerical suffix based on an auto-incrementing counter to ensure
 * uniqueness.
 *
 * @param identifier
 * @return generatedId
 */
export default function useGeneratedId( identifier? : string ) : Ref<string> {
	const vm = getCurrentInstance();
	const externalId = <string|undefined> vm?.props.id || <string|undefined> vm?.attrs.id;
	let generatedId : string;
	if ( identifier ) {
		generatedId = `${LibraryPrefix}-${identifier}-${counter++}`;
	} else if ( externalId ) {
		generatedId = `${LibraryPrefix}-${externalId}-${counter++}`;
	} else {
		generatedId = `${LibraryPrefix}-${counter++}`;
	}
	return ref( generatedId );
}
