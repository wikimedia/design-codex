import toKebabCase from './toKebabCase';

describe( 'toKebabCase', () => {
	it( 'converts component names', () => {
		expect( toKebabCase( 'CdxToggleButton' ) ).toBe( 'cdx-toggle-button' );
	} );
} );
