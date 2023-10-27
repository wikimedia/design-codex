'use strict';

/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */
/** @typedef {import('style-dictionary').TransformedTokens} TransformedTokens */
/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */
/** @typedef {import('style-dictionary').Transform} Transform */
/** @typedef {import('style-dictionary').Formatter} Formatter */
/** @typedef {import('style-dictionary').Dictionary} Dictionary */

const { fileHeader, createPropertyFormatter } =
	require( 'style-dictionary' ).formatHelpers;

// The type of sortByReference is wrong upstream, see https://github.com/amzn/style-dictionary/issues/918
const sortByReference =
	/** @type {( dict: Dictionary ) => ( a: TransformedToken, b: TransformedToken ) => number} */ (
		/** @type {unknown} */ (
			require( 'style-dictionary' ).formatHelpers.sortByReference
		)
	);
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
	// According to the type information, token.filePath can't be undefined, but that's wrong
	// It's undefined for the font-size-base token that we add through the 'tokens' property
	// in config.js
	const filename = path.basename( token.filePath ?? '' );
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
function makePathMatcher( matchPaths, excludePaths ) {
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

/**
 * Create a wrapped version of a formatter that applies a filter.
 *
 * When using outputReferences, or when the formatter calls usesReference() or getReferences()
 * for references to tokens that are filtered out, Style Dictionary throws noisy warnings that
 * can't be suppressed. This function is a workaround for that: instead of using Style Dictionary's
 * built-in filter feature, this function returns a formatter that applies the given filter and then
 * runs the given formatter on the remaining tokens.
 *
 * @param {Formatter} formatter
 * @param {Matcher} filter
 * @return {Formatter}
 */
function wrapFormatterWithFilter( formatter, filter ) {
	/**
	 * @param {TransformedTokens} tokens
	 * @return {TransformedTokens}
	 */
	function filterTokens( tokens ) {
		/** @type {TransformedTokens} */
		const result = {};
		for ( const key in tokens ) {
			if ( typeof tokens[ key ] !== 'object' ) {
				continue;
			}
			if ( 'value' in tokens[ key ] ) {
				if ( filter( /** @type {TransformedToken} */ ( tokens[ key ] ) ) ) {
					result[ key ] = tokens[ key ];
				}
			} else {
				const filtered = filterTokens( tokens[ key ] );
				if ( Object.keys( filtered ).length > 0 ) {
					result[ key ] = filtered;
				}
			}
		}
		return result;
	}

	return function ( args ) {
		const filteredDictionary = {
			...args.dictionary,
			tokens: filterTokens( args.dictionary.tokens ),
			allTokens: args.dictionary.allTokens.filter( filter )
		};
		return formatter( { ...args, dictionary: filteredDictionary } );
	};
}

/**
 * Round a number to a certain number of decimal places.
 *
 * This is like num.toFixed( decimals ) except that it doesn't add leading zeroes:
 * (1/2).toFixed( 3 ) returns '0.500', but roundToDecimals( 1/2, 3 ) returns '0.5'.
 *
 * @param {number} num Number to round
 * @param {number} decimals How many decimal places to round to
 * @return {number} Rounded number
 */
function roundToDecimals( num, decimals ) {
	const factor = 10 ** decimals;
	return Math.round( num * factor ) / factor;
}

/**
 * Make a transformer that converts token values in px to a relative unit.
 *
 * For tokens whose value is a number followed by 'px', this transform divides the number by the
 * basePxFontSize, and changes the unit to targetUnit. Tokens whose value is not simply a number
 * in px are not transformed.
 *
 * @param {string} targetUnit Unit to transform to (e.g. 'em' or 'rem').
 * @return {Transform['transformer']}
 */
function makeRelativeUnitTransform( targetUnit ) {
	return function ( token, platform ) {
		const basePxFontSize = platform?.basePxFontSize ?? 16;
		/** @type {string} */
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const tokenValue = token.value;

		// Don't transform if the token value is not just a number in px
		// (e.g. has a different unit or is complex).
		if ( !tokenValue.match( /^-?[0-9.]+px$/ ) ) {
			return tokenValue;
		}

		const relativeValue = roundToDecimals( parseFloat( tokenValue ) / basePxFontSize, 7 );
		return `${relativeValue}${targetUnit}`;
	};
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
			allTokens = [ ...allTokens ].sort( sortByReference( dictionary ) );
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
	makePathMatcher,
	wrapFormatterWithFilter,
	makeRelativeUnitTransform,
	createCustomStyleFormatter
};
