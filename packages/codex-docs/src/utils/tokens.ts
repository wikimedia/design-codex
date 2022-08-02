import { DesignToken, DesignTokensTree } from '../types';

export function flattenDesignTokensTree( tree: DesignTokensTree ) : DesignToken[] {
	const result : DesignToken[] = [];
	for ( const key in tree ) {
		if ( key === 'comment' ) {
			// TODO visualize comments at these levels too
			continue;
		}
		if ( key === 'deprecated' ) {
			continue;
		}
		const tokenOrTree = tree[ key ];
		if ( 'value' in tokenOrTree ) {
			// TypeScript doesn't realize it, but we know tokenOrTree is a token in this case
			result.push( tokenOrTree as DesignToken );
		} else {
			result.push( ...flattenDesignTokensTree( tokenOrTree ) );
		}
	}
	return result;
}
