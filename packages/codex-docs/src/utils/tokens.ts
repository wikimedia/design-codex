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

/**
 * If the given token is deprecated, and consists entirely of a reference to another token that
 * isn't deprecated, add "(use `xyz` instead)" to the end of the deprecation message.
 *
 * Similar functionality is implemented in createCustomStyleFormatter in the tokens package.
 *
 * @param token Token to modify
 * @return Token with possibly modified deprecation message
 */
export function expandDeprecationMessage( token: DesignToken ): DesignToken {
	if (
		token.deprecated &&
		token.attributes.tokens.length === 1 &&
		token.original.value.match( /^\s*{[^{}]+}\s*$/ )
	) {
		const useInsteadToken = token.attributes.tokens[ 0 ].replace( /\./g, '-' );

		return {
			...token,
			deprecated: typeof token.deprecated === 'string' ?
				`${token.deprecated} (use \`${useInsteadToken}\` instead)` :
				`Use \`${useInsteadToken}\` instead.`
		};
	}
	return token;
}
