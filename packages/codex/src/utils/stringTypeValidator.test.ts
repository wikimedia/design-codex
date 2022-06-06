import { makeStringTypeValidator } from './stringTypeValidator';

describe( 'makeStringTypeValidator', () => {
	it( 'should validate correctly', () => {
		const TypeValues = [ 'foo', 'bar' ] as const;
		const validator = makeStringTypeValidator( TypeValues );

		// non-string
		expect( validator( false ) ).toBe( false );

		// string not included in the values
		expect( validator( 'baz' ) ).toBe( false );

		// string included in the values
		expect( validator( 'foo' ) ).toBe( true );
	} );
} );
