/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */

import { getReferencedTokens } from '../.style-dictionary/lib.js';

describe( 'getReferencedTokens', () => {
	/** @type {[original: string, expectedTokens: string[]][]} */
	const cases = [
		[ '#fff', [] ],
		[ '{dimension.250}', [ 'dimension.250' ] ],
		[
			'{box-shadow.inset.style.thin} {color.accent.50}',
			[ 'box-shadow.inset.style.thin', 'color.accent.50' ]
		],
		[ '    {    silly-whitespace }', [ 'silly-whitespace' ] ]
	];

	test.each( cases )( 'extracts tokens from %s: %p', ( original, expectedTokens ) => {
		/** @type {TransformedToken} */
		const token = {
			value: original,
			original: { value: original },
			name: 'foo',
			path: [ 'foo' ],
			filePath: 'foo.json',
			isSource: true
		};
		expect( getReferencedTokens( token ) )
			.toEqual( { tokens: expectedTokens } );
	} );
} );
