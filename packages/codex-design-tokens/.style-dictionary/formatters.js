/** @typedef {import('style-dictionary').Dictionary} Dictionary */
/** @typedef {import('style-dictionary').File} File */
/** @typedef {import('style-dictionary').Options} Options */
/** @typedef {import('style-dictionary').Platform} Platform */
/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */
/** @typedef {import('style-dictionary').Formatter} Formatter */
/** @typedef {import('style-dictionary').Transform} Transform */
/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */
/** @typedef {import('style-dictionary').TransformedTokens} TransformedTokens */

import StyleDictionary from 'style-dictionary';
import { getTokenType } from './transformers.js';
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

// Custom Formatters (register before use) =========================================================

/**
 * Create a custom formatter that adds deprecation comments.
 *
 * This code is largely copied from style-dictionary's own css/variables formatter,
 * but it adds deprecation comments based on the 'deprecated' property.
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
		let toRet = 'export const ' + token.name + ' = ' + JSON.stringify( token.value ) + ';';
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
			allTokens = [ ...allTokens ].sort( sortByReference( dictionary ) );
		}

		const formatter = format === 'javascript/es6' ? jsFormatter : createPropertyFormatter( { outputReferences, dictionary, format } );

		// Filter out theme tokens
		// HACK this should ideally be done through Style Dictionary's filter feature,
		// but doing that causes it to throw warnings when the deprecation comment formatter
		// attempts to access filtered-out theme tokens
		const filteredTokens = allTokens.filter( ( token ) => getTokenType( token ).type !== 'theme' );

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
		const deprecationCommentFormatter = ( token ) => {
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

/**
 * Generates an experimental LESS stylesheet which includes a subset of tokens as
 * CSS variables in a :root declaration at the top of the file.
 *
 * @param {Object} args
 * @param {Dictionary} args.dictionary
 * @param {File} args.file
 * @param {Options} args.options
 * @return {string}
 */
export function experimentalLessWithCssVars( { dictionary, file, options } ) {
	const commentStyle = 'short';
	const preamble = makeComment( 'This is an experimental stylesheet not intended for production use.', commentStyle );
	const header = fileHeader( { file } );
	const { outputReferences } = options;
	let { allTokens } = dictionary;

	// Sort tokens by reference if necessary, to avoid use-before-defined issues
	if ( outputReferences ) {
		allTokens = [ ...allTokens ].sort( sortByReference( dictionary ) );
	}

	const publishedTokens = allTokens.filter( ( t ) => t.attributes?.type !== 'theme' );
	const cssVarTokens = publishedTokens.filter( ( t ) => {
		/** @todo hardcoding this here is not ideal, should this data live in config? */
		const relevantProps = [
			'color',
			'background-color',
			'border-color',
			'border',
			'filter',
			'opacity-icon'
		];

		return t.path.some( ( element ) => relevantProps.includes( element ) );
	} );

	const cssFormatter = createPropertyFormatter( { dictionary, outputReferences: false, format: 'css' } );
	const lessFormatter = createPropertyFormatter( { dictionary, outputReferences: false, format: 'less' } );

	const replacedTokens = publishedTokens.map( ( token ) => {
		const newToken = { ...token };
		if ( cssVarTokens.includes( token ) ) {
			newToken.value = `var( --${ token.name } )`;
		}
		return newToken;
	} );
	return header +
		preamble +
		'\n' +
		':root {\n' +
		cssVarTokens
			.map( ( token ) => cssFormatter( token ) )
			.filter( Boolean )
			.join( '\n' ) +
		'\n' +
		'}\n\n' +
		replacedTokens
			.map( ( token ) => lessFormatter( token ) )
			.filter( Boolean )
			.join( '\n' );
}
