'use strict';

/** @typedef {import('style-dictionary').TransformedToken} TransformedToken */

const { getTokenType } = require( '../.style-dictionary/lib' );

describe( 'getTokenType', () => {
	/** @type {[filePath: string, expectedType: string|undefined][]} */
	const cases = [
		[ '/home/nobody/codex/packages/codex-design-tokens/theme-foo.json', 'theme' ],
		[ '/home/nobody/codex/packages/codex-design-tokens/codex-base.json', 'base' ],
		[ '/home/nobody/codex/packages/codex-design-tokens/codex-components.json', 'component' ],
		[ '/home/nobody/codex/packages/codex-design-tokens/codex-foo.json', undefined ]
	];

	test.each( cases )( 'derives token type from %s: %p', ( filePath, expectedType ) => {
		/** @type {TransformedToken} */
		const token = {
			filePath,
			value: '#123abc',
			original: { value: '#123abc' },
			name: 'foo',
			path: [ 'foo' ],
			isSource: true
		};
		expect( getTokenType( token ).type )
			.toEqual( expectedType );
	} );
} );
