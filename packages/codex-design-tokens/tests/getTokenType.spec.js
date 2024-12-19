/** @import { TransformedToken } from 'style-dictionary' */

import { getTokenType } from '../.style-dictionary/transformers.js';

describe( 'getTokenType', () => {
	/** @type {[filePath: string, expectedType: string|undefined][]} */
	const cases = [
		[ '/home/nobody/codex/packages/codex-design-tokens/themes/foo.json', 'theme' ],
		[ '/home/nobody/codex/packages/codex-design-tokens/application.json', 'base' ],
		[ '/home/nobody/codex/packages/codex-design-tokens/modes/foo.json', 'mode' ],
		[ '/home/nobody/codex/packages/codex-design-tokens/components.json', 'component' ],
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
