import getFormattedDate from './getFormattedDate';

describe( 'getFormattedDate', () => {
	it( 'returns properly formatted date', () => {
		expect( getFormattedDate( 1703743920000 ) ).toBe( '06:12, 2023-12-28' );
	} );
} );
