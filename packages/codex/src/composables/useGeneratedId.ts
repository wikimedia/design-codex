import { getCurrentInstance } from 'vue';
import { LibraryPrefix } from '../constants';
let counter = 0;

/**
 * DEPRECATED: Use Vue's useId() instead.
 *
 * Get a unique ID suitable for use in HTML templates.
 *
 * All strings begin with the library prefix "cdx-". If an optional identifier
 * string is provided, that is included as well. Alternatively, if an "id"
 * element is present on the calling component as either a prop or attribute,
 * that will be used if no identifier argument is provided. All strings include
 * a numerical suffix based on an auto-incrementing counter to ensure
 * uniqueness.
 *
 * @deprecated
 * @param identifier
 * @return Generated ID
 */
export default function useGeneratedId( identifier? : string ) : string {
	const vm = getCurrentInstance();
	const externalId = vm?.props.id as string|undefined ?? vm?.attrs.id as string|undefined;
	if ( identifier ) {
		return `${ LibraryPrefix }-${ identifier }-${ counter++ }`;
	} else if ( externalId ) {
		return `${ LibraryPrefix }-${ externalId }-${ counter++ }`;
	} else {
		return `${ LibraryPrefix }-${ counter++ }`;
	}
}
