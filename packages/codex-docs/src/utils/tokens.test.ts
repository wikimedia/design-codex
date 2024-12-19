import { expandDeprecationMessage, flattenDesignTokensTree } from './tokens';
import { DesignToken, DesignTokensTree } from '../types';

const baseTokenData = {
	filePath: 'src/codex-base.json',
	original: {
		value: ''
	},
	attributes: {
		tokens: []
	},
	path: []
};

describe( 'flattenDesignTokensTree', () => {
	it( 'flattens properly', () => {
		// A few demo tokens based on design tokens package
		const exampleToken: DesignToken = {
			...baseTokenData,
			name: 'font-family-base',
			value: 'sans-serif'
		};

		const subTreeToken1: DesignToken = {
			...baseTokenData,
			name: 'cursor-base',
			value: 'default'
		};
		const subTreeToken2: DesignToken = {
			...baseTokenData,
			name: 'cursor-base--hover',
			value: 'pointer'
		};
		const exampleSubTree: DesignTokensTree = {
			firstToken: subTreeToken1,
			secondToken: subTreeToken2
		};

		const treeWithComment: DesignTokensTree = {
			actualToken: exampleToken,
			nestedTree: exampleSubTree
		};
		// flattenDesignTokensTree checks for the comment key, and comments wouldn't be
		// DesignToken objects - to be able to test that code, need to bypass types,
		// and then need to bypass eslint rule preventing that
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: see above
		treeWithComment.comment = 'Unused comment text';

		expect( flattenDesignTokensTree( treeWithComment ) ).toMatchObject( [
			exampleToken,
			subTreeToken1,
			subTreeToken2
		] );

		const treeWithDeprecated: DesignTokensTree = {
			actualToken: exampleToken,
			nestedTree: exampleSubTree
		};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: see comment above for treeWithComment
		treeWithDeprecated.deprecated = 'Unused deprecation message';

		expect( flattenDesignTokensTree( treeWithDeprecated ) ).toMatchObject( [
			exampleToken,
			subTreeToken1,
			subTreeToken2
		] );

		expect( flattenDesignTokensTree( treeWithComment, [ 'firstToken' ] ) ).toMatchObject( [
			exampleToken,
			subTreeToken2
		] );

		expect( flattenDesignTokensTree( treeWithComment, [ 'nestedTree' ] ) ).toMatchObject( [
			exampleToken
		] );
	} );
} );

describe( 'expandDeprecationMessage', () => {
	it( 'does not modify non-deprecated tokens', () => {
		const regularToken: DesignToken = {
			...baseTokenData,
			name: 'foo-bar',
			value: 'baz',
			original: {
				value: 'baz'
			},
			attributes: {
				tokens: []
			}
		};
		expect( expandDeprecationMessage( regularToken ) ).toEqual( regularToken );
	} );

	it( 'does not modify deprecated tokens that do not use another token', () => {
		const deprecatedTokenWithoutReference: DesignToken = {
			...baseTokenData,
			name: 'old-foo-bar',
			value: 'quux',
			original: {
				value: 'quux'
			},
			attributes: {
				tokens: []
			},
			deprecated: 'You should use foo-bar now'
		};
		expect( expandDeprecationMessage( deprecatedTokenWithoutReference ) )
			.toEqual( deprecatedTokenWithoutReference );
	} );

	it( 'does not modify deprecated tokens that use multiple other tokens', () => {
		const deprecatedTokenWithMultiRefs: DesignToken = {
			...baseTokenData,
			name: 'old-foo-bar',
			value: '1px 2px',
			original: {
				value: '{ foo.bar } { foo.baz }'
			},
			attributes: {
				tokens: [ 'foo.bar', 'foo.baz' ]
			},
			deprecated: true
		};
		expect( expandDeprecationMessage( deprecatedTokenWithMultiRefs ) )
			.toEqual( deprecatedTokenWithMultiRefs );
	} );

	it( 'generates a deprecation message for tokens that use one other token', () => {
		const deprecatedTokenWithRef: DesignToken = {
			...baseTokenData,
			name: 'old-foo-bar',
			value: '1px',
			original: {
				value: '{ foo.bar }'
			},
			attributes: {
				tokens: [ 'foo.bar' ]
			},
			deprecated: true
		};
		expect( expandDeprecationMessage( deprecatedTokenWithRef ) ).toEqual( {
			...deprecatedTokenWithRef,
			deprecated: 'Use `foo-bar` instead.'
		} );
	} );

	it( 'appends to the existing deprecation message if there is one', () => {
		const deprecatedTokenWithMessage: DesignToken = {
			...baseTokenData,
			name: 'old-foo-bar',
			value: '1px',
			original: {
				value: '{ foo.bar }'
			},
			attributes: {
				tokens: [ 'foo.bar' ]
			},
			deprecated: 'This is old'
		};
		expect( expandDeprecationMessage( deprecatedTokenWithMessage ) ).toEqual( {
			...deprecatedTokenWithMessage,
			deprecated: 'This is old (use `foo-bar` instead)'
		} );
	} );
} );
