'use strict';

const { getReferencedTokens } = require( '../.style-dictionary/lib' );

describe( 'getReferencedTokens', () => {
	it.each( [
		[ '#fff', [] ],
		[ '{dimension.static.size.250.value}', [ 'dimension.static.size.250' ] ],
		[
			'{box-shadow.inset.style.thin.value} {color.accent.50.value}',
			[ 'box-shadow.inset.style.thin', 'color.accent.50' ]
		],
		[ '    {    silly-whitespace.value }', [ 'silly-whitespace' ] ]
	] )( 'extracts tokens from %s: %p', ( original, expectedTokens ) => {
		expect( getReferencedTokens( { original: { value: original } } ) )
			.toEqual( { tokens: expectedTokens } );
	} );
} );
