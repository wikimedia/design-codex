'use strict';

/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */

const { getReferencedTokens } = require( '../.style-dictionary/lib' );

describe( 'getReferencedTokens', () => {
	it.each( [
		[ '#fff', [] ],
		[ '{dimension.250}', [ 'dimension.250' ] ],
		[
			'{box-shadow.inset.style.thin} {color.accent.50}',
			[ 'box-shadow.inset.style.thin', 'color.accent.50' ]
		],
		[ '    {    silly-whitespace }', [ 'silly-whitespace' ] ]
	] )( 'extracts tokens from %s: %p', ( original, expectedTokens ) => {
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
