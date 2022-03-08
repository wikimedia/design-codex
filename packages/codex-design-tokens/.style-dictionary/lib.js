'use strict';

/* eslint-disable jsdoc/valid-types */
/** @typedef {import('style-dictionary').Formatter} Formatter */

const { fileHeader, createPropertyFormatter, sortByReference } =
	require( 'style-dictionary' ).formatHelpers;

function getReferencedTokens( prop ) {
	// TODO use getReferences() / usesReference() from style-dictionary
	const variablePattern = /{\s*(?<token>.+?)\s*}/g;

	return {
		tokens: [ ...prop.original.value.matchAll( variablePattern ) ]
			.map( ( match ) => match.groups.token )
	};
}

function kebabCase( { path } ) {
	return path.join( '-' );
}

/**
 * Create a custom formatter that adds deprecation comments.
 *
 * This code is largely copied from style-dictionary's own css/variables formatter,
 * but it adds deprecation comments based on the 'deprecated' property.
 *
 * @param {'css'|'less'|'sass'} format
 * @return {Formatter}
 */
function createCustomStyleFormatter( format ) {
	const commentStyle = ( {
		css: 'long',
		less: 'short',
		sass: 'short'
	} )[ format ];

	return function ( { dictionary, options, file } ) {
		// Duplicated from css/variables in style-dictionary/lib/common/format.js
		const header = fileHeader( { file, commentStyle } );
		let preamble = '', postamble = '';
		if ( format === 'css' ) {
			const selector = options.selector || ':root';
			preamble = `${selector} {\n`;
			postamble = '\n}\n';
		}

		// Duplicated from style-dictionary/lib/common/formatHelpers/formattedVariables.js
		const { outputReferences } = options;
		let { allTokens } = dictionary;
		if ( outputReferences ) {
			allTokens = [ ...allTokens ].sort( sortByReference );
		}

		const formatter = createPropertyFormatter( { outputReferences, dictionary, format } );
		// Add deprecation comments above deprecated tokens.
		const deprecationCommentFormatter = ( token ) => {
			if ( !token.deprecated ) {
				return '';
			}

			// If token.deprecated is a string, add it to the end of the comment.
			const deprecatedComment = typeof token.deprecated === 'string' ?
				` (${token.deprecated})` : '';

			// If the token value references exactly one other token, add "use otherTokenName
			// instead".
			const referencedTokens = dictionary.usesReference( token.original.value ) ?
				dictionary.getReferences( token.original.value ) : [];
			const useInstead = referencedTokens.length === 1 &&
					// Check that the token only contains a reference and nothing else.
					token.original.value.match( /^\s*{[^{}]+}\s*$/ ) ?
				`, use ${referencedTokens[ 0 ].name} instead.` : '';

			const fullComment = 'Warning: the following token name is deprecated' +
				useInstead + deprecatedComment;
			return commentStyle === 'short' ?
				`// ${fullComment}\n` :
				`/* ${fullComment} */\n`;
		};

		return header +
			preamble +
			allTokens
				.map( ( token ) => deprecationCommentFormatter( token ) + formatter( token ) )
				.filter( Boolean )
				.join( '\n' ) +
			postamble;
	};
}

module.exports = {
	getReferencedTokens,
	kebabCase,
	createCustomStyleFormatter
};
