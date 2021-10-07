'use strict';

const { kebabCase } = require( '../.style-dictionary/lib' );

describe( 'kebabCase', () => {

	it( 'builds a token name from a path', () => {
		expect( kebabCase( {
			path: [ 'font', 'weight', 'style', 'h1' ],
		} ) ).toBe( 'font-weight-style-h1' );
	} );

} );
