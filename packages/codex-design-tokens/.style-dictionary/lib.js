'use strict';

/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */
/** @typedef {import('style-dictionary').Formatter} Formatter */

const { fileHeader, createPropertyFormatter, sortByReference } =
	require( 'style-dictionary' ).formatHelpers;
const path = require( 'path' );

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
	/** @type {string} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const originalValue = token.original.value;

	return {
		tokens: [ ...originalValue.matchAll( variablePattern ) ]
			.map( ( match ) => /** @type {Record<string, string>} */ ( match.groups ).token )
	};
}

/**
 * Attribute transform that adds a `type` attribute, set to 'theme', 'base' or 'component'.
 *
 * @param {TransformedToken} token
 * @return {{ type?: 'theme'|'base'|'component' }}
 */
function getTokenType( token ) {
	const filename = path.basename( token.filePath );
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
function kebabCase( token ) {
	return token.path.join( '-' );
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
			const selector = /** @type {string} */ ( options.selector ) || ':root';
			preamble = `${selector} {\n`;
			postamble = '\n}\n';
		}

		// Duplicated from style-dictionary/lib/common/formatHelpers/formattedVariables.js
		const { outputReferences } = options;
		let { allTokens } = dictionary;
		if ( outputReferences ) {
			// sortByReference is not exported for some reason.
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			allTokens = [ ...allTokens ].sort( sortByReference );
		}

		const formatter = createPropertyFormatter( { outputReferences, dictionary, format } );

		// Filter out theme tokens
		// HACK this should ideally be done through Style Dictionary's filter feature,
		// but doing that causes it to throw warnings when the deprecation comment formatter
		// attempts to access filtered-out theme tokens
		const filteredTokens = allTokens.filter( ( token ) => getTokenType( token ).type !== 'theme' );

		// Separate deprecated and non-deprecated tokens
		const deprecatedTokens = filteredTokens.filter( ( token ) => token.deprecated );
		const nonDeprecatedTokens = filteredTokens.filter( ( token ) => !token.deprecated );

		/**
		 * @param {string} text
		 * @return {string}
		 */
		const makeComment = ( text ) => commentStyle === 'short' ?
			`// ${text}\n` :
			`/* ${text} */\n`;

		const deprecatedSectionHeader = deprecatedTokens.length > 0 ?
			'\n\n' + makeComment( 'DEPRECATED TOKENS' ) : '';

		/**
		 * Add deprecation comments above deprecated tokens.
		 *
		 * @param {TransformedToken} token
		 * @return {string}
		 */
		const deprecationCommentFormatter = ( token ) => {
			if ( !token.deprecated ) {
				return '';
			}

			// If token.deprecated is a string, add it to the end of the comment.
			const deprecatedComment = typeof token.deprecated === 'string' ?
				` (${token.deprecated})` : '';

			// If the token value references exactly one other token, add "use otherTokenName
			// instead".
			/** @type {string } */
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const originalValue = token.original.value;
			const referencedTokens = dictionary.usesReference( originalValue ) ?
				dictionary.getReferences( originalValue ) : [];
			const useInstead = referencedTokens.length === 1 &&
					// Check that the token only contains a reference and nothing else.
					originalValue.match( /^\s*{[^{}]+}\s*$/ ) &&
					// If the referenced token is not going to be output, or is itself deprecated,
					// don't add a "use instead" comment
					nonDeprecatedTokens.includes( referencedTokens[ 0 ] ) ?
				`, use ${referencedTokens[ 0 ].name} instead.` : '';

			const fullComment = 'Warning: the following token name is deprecated' +
				useInstead + deprecatedComment;
			return makeComment( fullComment );
		};

		return header +
			preamble +
			nonDeprecatedTokens
				.map( ( token ) => formatter( token ) )
				.filter( Boolean )
				.join( '\n' ) +
			deprecatedSectionHeader +
			deprecatedTokens
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
