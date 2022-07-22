import { getButtonLabel } from './buttonHelpers';
import { ButtonGroupItem } from '../types';

describe( 'getButtonLabel', () => {
	type Case = [ msg: string, item: ButtonGroupItem, expectedLabel: string ];
	const cases: Case[] = [
		[ 'label is used if set', { label: 'Foo', value: 'Bar' }, 'Foo' ],
		[ 'value is used if label not set', { value: 'Bar' }, 'Bar' ],
		[ 'empty string is returned if label is null', { label: null, value: 'Bar' }, '' ]
	];

	test.each( cases )( 'Case %#: %s (%p) => %s', ( _, item, expectedLabel ) => {
		expect( getButtonLabel( item ) ).toBe( expectedLabel );
	} );
} );
