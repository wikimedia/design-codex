/** @import { TransformedToken } from 'style-dictionary' */

/**
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function shouldUseRelativeSize( token ) {
	const includedProps = [
		'font-size',
		'size',
		'max-width',
		'max-height'
	];

	return includedProps.some( ( prop ) => token.path.includes( prop ) );
}

/**
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function shouldUseAbsoluteSize( token ) {
	const includedProps = [
		'spacing',
		'min-width',
		'min-height',
		'min-size',
		'border-radius'
	];

	return includedProps.some( ( prop ) => token.path.includes( prop ) );
}

/**
 * Determine whether a token should be exposed as a CSS custom property in
 * the experimental build.
 *
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function shouldExposeCustomProperty( token ) {
	const includedProps = [
		'color',
		'background-color',
		'border-color',
		'filter',
		'opacity-icon',
		'mix-blend-mode'
	];

	// Exclude all option tokens
	if ( token.attributes?.type === 'theme' ) {
		return false;
	}

	return token.path.some( ( element ) => includedProps.includes( element ) );
}

/**
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function isPublishedToken( token ) {
	return token.attributes?.type !== 'theme';
}

/**
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function isModeToken( token ) {
	return token.attributes?.type === 'mode';
}
