import getIconByName from './getIconByName';
import { cdxIconAlert } from '@wikimedia/codex-icons';

describe( 'getIconByName', () => {
	it( 'returns undefined for no icon name', () => {
		expect( getIconByName( '' ) ).toBeUndefined();
	} );

	it( 'returns undefined for an unknown icon name', () => {
		expect( getIconByName( 'cdxIconMissing' ) ).toBeUndefined();
	} );

	it( 'returns Icon object for a known icon name', () => {
		expect( getIconByName( 'cdxIconAlert' ) ).toBe( cdxIconAlert );
	} );
} );
