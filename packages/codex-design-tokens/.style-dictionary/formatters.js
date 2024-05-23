/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */
/** @typedef {import('style-dictionary').Formatter} Formatter */
/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */

import StyleDictionary from 'style-dictionary';
import { regExpEscape } from './utils.js';
const { formatHelpers } = StyleDictionary;
const { fileHeader, createPropertyFormatter, sortByReference } = formatHelpers;

/**
 * Wrap a string of text in the appropriate comment syntax
 *
 * @param {string} text
 * @param {string} commentStyle
 * @return {string}
 */
function makeComment( text, commentStyle = 'short' ) {
	if ( commentStyle === 'short' ) {
		return `// ${ text }\n`;
	} else {
		return `/* ${ text } */\n`;
	}
}

/**
 * Format a reference to a token.
 *
 * @param {TransformedToken} token
 * @param {'css'|'less'|'sass'} styleFormat
 * @return {string}
 */
function formatStyleVariableReference( token, styleFormat ) {
	return ( {
		css: `var( --${ token.name } )`,
		less: `@${ token.name }`,
		sass: `$${ token.name }`
	} )[ styleFormat ];
}

// Custom Formatters (register before use) =========================================================

/**
 * Create a custom formatter that adds deprecation comments.
 *
 * This code is largely copied from style-dictionary's own css/variables formatter,
 * but it with some additional features:
 * - It adds deprecation comments based on the 'deprecated' property
 * - It implements outputReferences correctly, which upstream doesn't
 * - It supports combining `filter` and `outputReferences`, but the filter must be passed in as
 *   `options.outputFilter`
 *
 * @param {'css'|'less'|'sass'|'javascript/es6'} format
 * @return {Formatter}
 */
export function createCustomStyleFormatter( format ) {
	const commentStyle = ( {
		css: 'long',
		less: 'short',
		sass: 'short',
		'javascript/es6': 'short'
	} )[ format ];

	/**
	 * Format a JS token.
	 *
	 * Duplicated from javascript/es6 in style-dictionary/lib/common/format.js
	 *
	 * @param {TransformedToken} token
	 * @return {string}
	 */
	function jsFormatter( token ) {
		let toRet = 'export const ' + token.name + ' = ' + JSON.stringify( String( token.value ) ) + ';';
		if ( token.comment ) {
			toRet = toRet.concat( ' // ' + token.comment );
		}
		return toRet;
	}

	return function ( { dictionary, options, file } ) {
		// Duplicated from css/variables in style-dictionary/lib/common/format.js
		const header = fileHeader( { file, commentStyle } );
		let preamble = '', postamble = '';
		if ( format === 'css' ) {
			const selector = /** @type {string} */ ( options.selector ) || ':root';
			preamble = `${ selector } {\n`;
			postamble = '\n}\n';
		}

		// Duplicated from style-dictionary/lib/common/formatHelpers/formattedVariables.js
		const { outputReferences } = options;
		let { allTokens } = dictionary;
		if ( outputReferences ) {
			// sortByReference() correctly sorts A after B if A refers to B, and sorts all tokens
			// with references after tokens without references, but within the tokens without
			// references it reverses the sort order. We don't want output where size-50 comes
			// before size-25, so work around this annoying behavior by reversing the tokens array
			// before it's passed to sortByReference().
			allTokens = [ ...allTokens ].reverse().sort( sortByReference( dictionary ) );
		}

		const outputFilter = /** @type {Matcher} */ ( options.outputFilter ) ?? ( () => true );

		const formatter = format === 'javascript/es6' ?
			jsFormatter :
			createPropertyFormatter( {
				dictionary,
				format,
				// Do not use Style Dictionary's built-in outputReferences feature, because it
				// generates references to tokens that are filtered out
				outputReferences: false
			} );

		// Filter out theme tokens
		// HACK: This should ideally be done through Style Dictionary's filter feature,
		// but doing that causes it to throw warnings when the deprecation comment formatter
		// attempts to access filtered-out theme tokens
		let filteredTokens = allTokens.filter( outputFilter );

		// HACK: Implement our own version of outputReferences, because Style Dictionary's doesn't
		// work well, especially when combined with a filter.
		if ( outputReferences && format !== 'javascript/es6' ) {
			filteredTokens = filteredTokens.map( ( token ) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				const originalValue = /** @type {string} */ ( token.original.value );
				const referencedTokens = dictionary.usesReference( originalValue ) ?
					dictionary.getReferences( originalValue ) : [];

				// If this token doesn't contain any references, or only references tokens that
				// are not going to be in the output, don't modify it
				if ( !referencedTokens.some( outputFilter ) ) {
					return token;
				}

				// Start with the original value, which contains references like '{ foo.bar }'
				let newValue = originalValue;
				for ( const referencedToken of referencedTokens ) {
					// Find and replace each reference
					newValue = newValue.replace(
						// Search for '{ foo.bar }' or '{ foo.bar.value }'
						// eslint-disable-next-line security/detect-non-literal-regexp
						new RegExp( '\\{\\s*' + regExpEscape( referencedToken.path.join( '.' ) ) + '(\\.value)?\\s*\\}' ),
						// If the referenced token is going to be in the output...
						outputFilter( referencedToken ) ?
							// ...then replace it with a variable reference like 'var( --foo-bar )'
							formatStyleVariableReference( referencedToken, format ) :
							// otherwise, replace it with the value of the referenced token
							/** @type {string} */ ( referencedToken.value )
					);
				}

				return {
					...token,
					value: newValue
				};
			} );
		}

		// Separate deprecated and non-deprecated tokens
		const deprecatedTokens = filteredTokens.filter( ( token ) => token.deprecated );
		const nonDeprecatedTokens = filteredTokens.filter( ( token ) => !token.deprecated );

		const deprecatedSectionHeader = deprecatedTokens.length > 0 ?
			'\n\n' + makeComment( 'DEPRECATED TOKENS', commentStyle ) : '';

		/**
		 * Add deprecation comments above deprecated tokens.
		 *
		 * @param {TransformedToken} token
		 * @return {string}
		 */
		function deprecationCommentFormatter( token ) {
			if ( !token.deprecated ) {
				return '';
			}

			// If token.deprecated is a string, add it to the end of the comment.
			const deprecatedComment = typeof token.deprecated === 'string' ?
				` (${ token.deprecated })` : '';

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
				`, use ${ referencedTokens[ 0 ].name } instead.` : '';

			const fullComment = 'Warning: the following token name is deprecated' +
				useInstead + deprecatedComment;
			return makeComment( fullComment, commentStyle );
		}

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
