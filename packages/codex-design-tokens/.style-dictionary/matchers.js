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
