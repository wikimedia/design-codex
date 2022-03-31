'use strict';

/* eslint-disable jsdoc/valid-types */
/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */
/** @typedef {import('style-dictionary').Formatter} Formatter */

const { fileHeader, createPropertyFormatter, sortByReference } =
	require( 'style-dictionary' ).formatHelpers;
const { basename } = require( 'path' );

/**
 * Attribute transform that adds a "tokens" attribute, containing an array of the names of
 * other tokens referenced by this token.
 *
 * @param {TransformedToken} token
 * @return {{ tokens: string[] }}
 */
function getReferencedTokens( token ) {
	// Sadly we can't use dictionary.getReferences() here, because we don't have access
	// to a dictionary object
	const variablePattern = /{\s*(?<token>.+?)\s*}/g;

	return {
		tokens: [ ...token.original.value.matchAll( variablePattern ) ]
			.map( ( match ) => match.groups.token )
	};
}

/**
 * Attribute transform that adds a `type` attribute, set to 'theme', 'base' or 'component'.
 *
 * @param {TransformedToken} token
 * @return {{ type?: 'theme'|'base'|'component' }}
 */
function getTokenType( token ) {
	const filename = basename( token.filePath );
	if ( filename.startsWith( 'theme-' ) ) {
		return { type: 'theme' };
	} else if ( filename.startsWith( 'codex-components' ) ) {
		return { type: 'component' };
	} else if ( filename.startsWith( 'codex-base' ) ) {
		return { type: 'base' };
	}
	return {};
}

/**
 * Name transform that transforms the path to kebab case, while keeping double dashes.
 *
 * We can't use the built-in name/cti/kebab transform because it collapses double dashes to
 * single dashes.
 *
 * @param {TransformedToken} token
 * @return {string}
 */
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
	getTokenType,
	kebabCase,
	createCustomStyleFormatter
};
