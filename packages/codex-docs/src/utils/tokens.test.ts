import { flattenDesignTokensTree } from './tokens';
import { DesignToken, DesignTokensTree } from '../types';

describe( 'flattenDesignTokensTree', () => {
	it( 'flattens properly', () => {
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

		const inputTree: DesignTokensTree = {
			actualToken: exampleToken,
			nestedTree: exampleSubTree
		};
		// flattenDesignTokensTree checks for the comment key, and comments wouldn't be
		// DesignToken objects - to be able to test that code, need to bypass types,
		// and then need to bypass eslint rule preventing that
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore: see above
		inputTree.comment = 'Unused comment text';

		expect( flattenDesignTokensTree( inputTree ) ).toMatchObject( [
			exampleToken,
			subTreeToken1,
			subTreeToken2
		] );
	} );
} );
