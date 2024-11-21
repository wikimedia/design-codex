// TODO figure out how to not duplicate this in docgen-config.js, that needs to have a
// CommonJS export and Wrapper.vue needs an ES module export, couldn't get them to coexist.

/**
 * Transform a PascalCase component name to kebab-case.
 *
 * @param {string} componentName
 * @return {string}
 */
function toKebabCase( componentName: string ) : string {
	// For each letter in the name...
	return componentName.split( '' ).map(
		// If the letter is uppercase, add a dash before it (unless it's the first letter), then
		// transform the letter to lowercase. Otherwise, just add the letter as-is.
		( letter, index ) => letter.toUpperCase() === letter ?
			`${ index !== 0 ? '-' : '' }${ letter.toLowerCase() }` :
			letter
	).join( '' );
}

export default toKebabCase;
