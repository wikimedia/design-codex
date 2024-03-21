/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */
/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */

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
		'border',
		'filter',
		'opacity-icon'
	];

	// Exclude all option tokens
	if ( token.attributes?.type === 'theme' ) {
		return false;
	}

	return token.path.some( ( element ) => includedProps.includes( element ) );
}
