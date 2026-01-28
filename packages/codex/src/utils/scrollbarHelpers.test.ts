import { getScrollbarWidth } from './scrollbarHelpers';

describe( 'getScrollbarWidth', () => {
	// Helper function to set document element dimensions
	function setDocumentDimensions( scrollHeight: number, clientHeight: number ) {
		Object.defineProperty( document.documentElement, 'scrollHeight', {
			writable: true,
			configurable: true,
			value: scrollHeight
		} );
		Object.defineProperty( document.documentElement, 'clientHeight', {
			writable: true,
			configurable: true,
			value: clientHeight
		} );
	}

	// Helper function to create a mock element with specific dimensions
	function createMockElement( offsetWidth: number, clientWidth: number ): HTMLElement {
		const element = document.createElement( 'div' );
		Object.defineProperty( element, 'offsetWidth', {
			writable: true,
			configurable: true,
			value: offsetWidth
		} );
		Object.defineProperty( element, 'clientWidth', {
			writable: true,
			configurable: true,
			value: clientWidth
		} );
		return element;
	}

	let originalScrollHeight: number;
	let originalClientHeight: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let createElementSpy: jest.SpyInstance<any, any> | null = null;

	beforeEach( () => {
		originalScrollHeight = document.documentElement.scrollHeight;
		originalClientHeight = document.documentElement.clientHeight;
	} );

	afterEach( () => {
		// Restore document dimensions
		setDocumentDimensions( originalScrollHeight, originalClientHeight );
		if ( createElementSpy ) {
			createElementSpy.mockRestore();
			createElementSpy = null;
		}
	} );

	it( 'returns 0 when there is no vertical overflow', () => {
		setDocumentDimensions( 1000, 1000 );

		const result = getScrollbarWidth();

		expect( result ).toBe( 0 );
	} );

	it( 'returns 0 when scrollHeight is less than clientHeight', () => {
		setDocumentDimensions( 800, 1000 );

		const result = getScrollbarWidth();

		expect( result ).toBe( 0 );
	} );

	it( 'calculates scrollbar width using temporary element', () => {
		setDocumentDimensions( 2000, 1000 );

		const mockElement = createMockElement( 117, 100 );
		createElementSpy = jest.spyOn( document, 'createElement' ).mockReturnValue( mockElement );
		const appendChildSpy = jest.spyOn( document.body, 'appendChild' );
		const removeChildSpy = jest.spyOn( document.body, 'removeChild' );

		const result = getScrollbarWidth();

		expect( result ).toBe( 17 );
		expect( createElementSpy ).toHaveBeenCalledWith( 'div' );
		expect( appendChildSpy ).toHaveBeenCalledTimes( 1 );
		expect( removeChildSpy ).toHaveBeenCalledTimes( 1 );
		expect( appendChildSpy.mock.calls[ 0 ][ 0 ] ).toBe( removeChildSpy.mock.calls[ 0 ][ 0 ] );
	} );

	it( 'sets correct styles on measurement element', () => {
		setDocumentDimensions( 2000, 1000 );

		const mockElement = createMockElement( 117, 100 );
		createElementSpy = jest.spyOn( document, 'createElement' ).mockReturnValue( mockElement );

		getScrollbarWidth();

		expect( mockElement.style.position ).toBe( 'absolute' );
		expect( mockElement.style.top ).toBe( '-9999px' );
		expect( mockElement.style.width ).toBe( '100px' );
		expect( mockElement.style.height ).toBe( '100px' );
		expect( mockElement.style.overflow ).toBe( 'scroll' );
	} );

	it( 'handles different scrollbar widths correctly', () => {
		setDocumentDimensions( 2000, 1000 );

		const testCases = [
			{ offsetWidth: 120, clientWidth: 100, expected: 20 },
			{ offsetWidth: 115, clientWidth: 100, expected: 15 },
			{ offsetWidth: 100, clientWidth: 100, expected: 0 }
		];

		testCases.forEach( ( { offsetWidth, clientWidth, expected } ) => {
			const mockElement = createMockElement( offsetWidth, clientWidth );
			createElementSpy = jest.spyOn( document, 'createElement' ).mockReturnValue( mockElement );
			jest.spyOn( document.body, 'removeChild' ).mockClear();

			const result = getScrollbarWidth();

			expect( result ).toBe( expected );
			if ( createElementSpy ) {
				createElementSpy.mockRestore();
				createElementSpy = null;
			}
		} );
	} );
} );
