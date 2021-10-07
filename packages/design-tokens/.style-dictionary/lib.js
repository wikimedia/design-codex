'use strict';

function getReferencedTokens( prop ) {
	const variablePattern = /{\s*(?<token>.+?)\.value\s*}/g;

	return {
		tokens: [ ...prop.original.value.matchAll( variablePattern ) ]
			.map( ( match ) => match.groups.token ),
	};
}

function kebabCase( { path } ) {
	return path.join( '-' );
}

module.exports = {
	getReferencedTokens,
	kebabCase,
};
