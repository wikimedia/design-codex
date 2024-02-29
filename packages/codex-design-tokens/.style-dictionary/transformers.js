/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */
/** @typedef {import('style-dictionary').TransformedTokens} TransformedTokens */
/** @typedef {import('style-dictionary').Platform} Platform */
/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */
/** @typedef {import('style-dictionary').Transform} Transform */

import path from 'node:path';
import { camelCase } from 'change-case';

// Utility funcions; not exported ==================================================================

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

// Transformers (must be registered before use) ====================================================

/**
 * Attribute transform that adds a "tokens" attribute, containing an array of the names of
 * other tokens referenced by this token.
 *
 * @param {TransformedToken} token
 * @return {{ tokens: string[] }}
 */
export function getReferencedTokens( token ) {
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
export function getTokenType( token ) {
	if ( !token.filePath ) {
		return {};
	}

	const dirname = path.basename( path.dirname( token.filePath ) );

	if ( dirname === 'themes' ) {
		return { type: 'theme' };
	}

	if ( dirname === 'modes' ) {
		return { type: 'base' };
	}

	if ( dirname === 'components' ) {
		return { type: 'component' };
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
export function kebabCase( token ) {
	return token.path.join( '-' );
}

/**
 * A replacement for the "name/cti/camel" transform from Style Dictionary
 * which gives special treatment to the minus sign (translating it into a word)
 * to avoid name collisions between eg. "z-index.100" and "z-index.-100".
 * See https://phabricator.wikimedia.org/T355274
 *
 * @param {TransformedToken} token
 * @param {Platform} options
 * @return {string}
 */
export function camelCaseNegative( token, options ) {
	const transformedPath = token.path
		.map( ( fragment ) => fragment.replace( /^-/, 'NEGATIVE' ) )
		.join( ' ' );
	return camelCase(
		[ options.prefix, transformedPath ].join( ' ' )
	);
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
export function makeRelativeUnitTransform( targetUnit ) {
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
		return `${ relativeValue }${ targetUnit }`;
	};
}
