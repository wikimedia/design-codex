import { generateHashId } from './generateHashId';
import { LibraryPrefix } from '../constants';

describe( 'generateHashId', () => {
	it( 'should be deterministic', () => {
		const hash1 = generateHashId( 'hello' );
		const hash2 = generateHashId( 'hello' );
		expect( hash2 ).toEqual( hash1 );
	} );

	it( 'should generate different IDs for different inputs', () => {
		const hash1 = generateHashId( 'hello' );
		const hash2 = generateHashId( 'world' );
		expect( hash2 ).not.toEqual( hash1 );
	} );

	it( 'should prefix IDs with the LibraryPrefix by default', () => {
		const hash1 = generateHashId( 'hello' );
		expect( hash1.startsWith( LibraryPrefix ) ).toBe( true );
	} );

	it( 'should accept alternate prefixes if provided', () => {
		const hash1 = generateHashId( 'hello', 'foo' );
		expect( hash1.startsWith( 'foo' ) ).toBe( true );
	} );

	it( 'should correctly handle overflow for long strings', () => {
		const longString = 'a'.repeat( 1000 );
		const id = generateHashId( longString );
		expect( id ).toMatch( /^cdx-[0-9a-z]+$/ );
	} );

	it( 'should handle strings with special characters', () => {
		const withSpecialChars = 'hello!@#$%^&*()';
		const withEmoji = 'hello😀🌍';
		expect( generateHashId( withSpecialChars ) ).toMatch( /^cdx-[0-9a-z]+$/ );
		expect( generateHashId( withEmoji ) ).toMatch( /^cdx-[0-9a-z]+$/ );
	} );

	it( 'should handle non-latin scripts', () => {
		const arabicString = 'ويكيبيديا العربية';
		expect( generateHashId( arabicString ) ).toMatch( /^cdx-[0-9a-z]+$/ );
	} );
} );
