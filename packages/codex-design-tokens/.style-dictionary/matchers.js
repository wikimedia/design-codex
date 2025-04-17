/** @import { TransformedToken } from 'style-dictionary/types' */

/**
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function shouldUseRelativeSize( token ) {
	const includedProps = [
		'font-size',
		'line-height',
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
	return isColorProperty( token ) || isTypographyProperty( token );
}

/**
 * Determines if a token is related to color properties.
 * Used for color-mode specific resets.
 *
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function isColorProperty( token ) {
	const includedProps = [
		'accent-color',
		'color',
		'background-color',
		'border-color',
		'filter',
		'opacity-icon',
		'mix-blend-mode',
		'box-shadow.color'
	];

	if ( !isPublishedToken( token ) ) {
		return false;
	}

	return token.path.some( ( element ) => includedProps.includes( element ) );
}

/**
 * Determines if a token is related to typography properties.
 * Used for font-mode specific resets.
 *
 * @param {TransformedToken} token
 * @return {boolean}
 */
export function isTypographyProperty( token ) {
	const includedProps = [
		'font-size',
		'line-height'
	];

	if ( !isPublishedToken( token ) ) {
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
