/* eslint-disable @typescript-eslint/no-var-requires */
const { optimize } = require( 'svgo' );
const removeSvgTag = require( '../svgo-plugin-removeSvgTag' );

// See https://jestjs.io/docs/en/tutorial-react#custom-transformers.
module.exports = {
	/**
	 * Accepts a file's contents and returns the transformed result.
	 *
	 * @param {string} src
	 * @return {string}
	 */
	process( src ) {
		const optimized = optimize( src, {
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							// Use smaller, non-backwards compatible optimization for browsers only,
							// see T299738.
							convertPathData: {
								noSpaceAfterFlags: true
							},
							mergePaths: {
								noSpaceAfterFlags: true
							}
						}
					}
				},
				removeSvgTag
			]
		} );
		return 'module.exports = ' + JSON.stringify( optimized.data ) + ';';
	}
};
