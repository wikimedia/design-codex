import { DesignToken, DesignTokensTree } from '../types';

/**
 * Flatten a tree of design tokens into an array. This takes a nested DesignTokensTree structure and
 * transforms it to a flat array.
 *
 * @param tree Token tree
 * @param excludeTokens Name of tokens or token groups to skip
 * @return All tokens in tree as an array. Keys listed in excludeTokens (and their children) are not
 *  included.
 */
export function flattenDesignTokensTree( tree: DesignTokensTree, excludeTokens: string[] = [] )
: DesignToken[] {
	const result : DesignToken[] = [];
	for ( const key in tree ) {
		if ( key === 'comment' ) {
			// TODO visualize comments at these levels too
			continue;
		}
		if ( key === 'deprecated' ) {
			continue;
		}
		if ( excludeTokens.includes( key ) ) {
			// This is an excluded token; don't add it to the output and don't recurse into it
			continue;
		}
		const tokenOrTree = tree[ key ];
		if ( 'value' in tokenOrTree ) {
			// TypeScript doesn't realize it, but we know tokenOrTree is a token in this case
			result.push( tokenOrTree as DesignToken );
		} else {
			result.push( ...flattenDesignTokensTree( tokenOrTree, excludeTokens ) );
		}
	}
	return result;
}
