/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */

/**
 * Generate a matcher function based on a set of paths.
 *
 * For example, if matchPaths = [ 'foo', 'bar' ] and excludePaths = [ 'foo.x', 'bar.y.z' ],
 * the returned matcher will match foo.y, bar.x and bar.y.a, but will not match foo.x, foo.x.a,
 * or bar.y.z.
 *
 * The paths must match entire path components, they're not just prefixes. For example, if
 * matchPaths = [ 'foo' ], the returned matcher will match foo.x, but not foobar.
 *
 * @param {string[]} matchPaths List of paths to match
 * @param {string[]} excludePaths List of paths not to match even if they would otherwise
 * @return {Matcher}
 */
export function makePathMatcher( matchPaths, excludePaths ) {
	return function ( token ) {
		let matched = false;
		for ( const matchPath of matchPaths ) {
			if ( token.path.slice( 0, matchPath.split( '.' ).length ).join( '.' ) === matchPath ) {
				matched = true;
				break;
			}
		}
		if ( matched ) {
			for ( const excludePath of excludePaths ) {
				if ( token.path.slice( 0, excludePath.split( '.' ).length ).join( '.' ) === excludePath ) {
					matched = false;
					break;
				}
			}
		}
		return matched;
	};
}
