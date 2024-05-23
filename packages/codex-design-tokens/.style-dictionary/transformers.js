/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */
/** @typedef {import('style-dictionary').TransformedTokens} TransformedTokens */
/** @typedef {import('style-dictionary').Platform} Platform */
/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */
/** @typedef {import('style-dictionary').Transform} Transform */

import path from 'node:path';
import { camelCase } from 'change-case';

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
	const stringValue = String( token.original.value );

	return {
		tokens: [ ...stringValue.matchAll( variablePattern ) ]
			.map( ( match ) => /** @type {Record<string, string>} */ ( match.groups ).token )
	};
}

/**
 * Attribute transform that adds the `type` attribute.
 *
 * The `type` attribute is set to:
 * - 'theme' if the token came from the src/themes/ directory
 * - 'mode' if the token came from the src/modes/ directory
 * - 'base' if the token came from src/application.json
 * - 'component' if the token came from src/components.json
 *
 * @param {TransformedToken} token
 * @return {{ type?: 'theme'|'base'|'mode'|'component' }}
 */
export function getTokenType( token ) {
	const dirname = path.basename( path.dirname( token.filePath ) );
	const basename = path.basename( token.filePath );

	if ( dirname === 'themes' ) {
		return { type: 'theme' };
	}

	if ( dirname === 'modes' ) {
		return { type: 'mode' };
	}

	if ( basename === 'application.json' ) {
		return { type: 'base' };
	}

	if ( basename === 'components.json' ) {
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
 * @param {TransformedToken} token
 * @return {string}
 */
export function relativeSizeTransform( token ) {
	if ( isNaN( Number( token.value ) ) ) {
		return String( token.value );
	} else if ( Number( token.value ) === 0 ) {
		return '0';
	} else {
		return `${ token.value }rem`;
	}
}

/**
 * @param {TransformedToken} token
 * @param {Platform} options
 * @return {string}
 */
export function absoluteSizeTransform( token, options ) {
	if ( isNaN( Number( token.value ) ) ) {
		return String( token.value );
	} else if ( Number( token.value ) === 0 ) {
		return '0';
	} else {
		return `${ token.value * ( options.basePxFontSize ?? 16 ) }px`;
	}
}

/**
 * @param {TransformedToken} token
 * @return {string}
 */
export function cssVarTransform( token ) {
	return `var( --${ token.name }, ${ token.value } )`;
}
