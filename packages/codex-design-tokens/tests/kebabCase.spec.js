import { kebabCase } from '../.style-dictionary/lib.js';

describe( 'kebabCase', () => {

	it( 'builds a token name from a path', () => {
		expect( kebabCase( {
			value: 'bold',
			original: { value: 'bold' },
			name: 'font.weight.style.h1',
			path: [ 'font', 'weight', 'style', 'h1' ],
			filePath: 'foo.json',
			isSource: true
		} ) ).toBe( 'font-weight-style-h1' );
	} );

} );
