import { regExpEscape, splitStringAtMatch } from './stringHelpers';

describe( 'regExpEscape', () => {
	it( 'should escape regular expression', () => {
		const regexpString = '/s{5}omer\\egexp?-/i';
		const escapedRegexp = '/s\\{5\\}omer\\\\egexp\\?\\-/i';
		const result = regExpEscape( regexpString );

		expect( result ).toStrictEqual( escapedRegexp );
	} );
} );

describe( 'splitStringAtMatch', () => {
	it( 'returns chunk with title only if query is not provided', () => {
		const query = '';
		const title = 'Title';
		const result = splitStringAtMatch( query, title );

		expect( result ).toStrictEqual( [ title, '', '' ] );
	} );

	it( 'returns chunk with title only if there are no matches', () => {
		const query = 'abc';
		const title = 'Title';
		const result = splitStringAtMatch( query, title );

		expect( result ).toStrictEqual( [ title, '', '' ] );
	} );

	it( 'returns string chunks if there are matches', () => {
		const query = 'tl';
		const title = 'Title';
		const result = splitStringAtMatch( query, title );

		expect( result ).toStrictEqual( [ 'Ti', 'tl', 'e' ] );
	} );

	test.each( [
		'foo',
		'ইতাল'
	] )( '%# returns the title if the query is the same as the title (%s)', ( title ) => {
		const result = splitStringAtMatch( title, title );

		expect( result ).toStrictEqual( [ '', title, '' ] );
	} );

	test.each( [
		[
			'ইতাল',
			'ইতালীয় ভাষা',
			[ '', 'ইতালী', 'য় ভাষা' ]
		],
		[
			'ইতাল',
			'ইতালির বিশ্ব ঐতিহ্যবাহী স্থানসমূহের তালিকা',
			[ '', 'ইতালি', 'র বিশ্ব ঐতিহ্যবাহী স্থানসমূহের তালিকা' ]
		]
	] )(
		'%# returns string chunks with preserved graphemes if there are matches (%s, %s)',
		( query, title, parts ) => {
			expect( splitStringAtMatch( query, title ) ).toStrictEqual( parts );
		}
	);
} );
