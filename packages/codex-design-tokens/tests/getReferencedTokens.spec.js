'use strict';

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
		expect( getReferencedTokens( { original: { value: original } } ) )
			.toEqual( { tokens: expectedTokens } );
	} );
} );
