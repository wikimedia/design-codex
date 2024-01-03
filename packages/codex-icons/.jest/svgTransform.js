import { optimize } from 'svgo';
import removeSvgTag from '../svgo-plugin-removeSvgTag.js';

// See https://jestjs.io/docs/en/tutorial-react#custom-transformers.
export default {
	/**
	 * Accepts a file's contents and returns the transformed result.
	 *
	 * @param {string} src
	 * @return {{ code: string }}
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
		return {
			code: 'module.exports = ' + JSON.stringify( optimized.data ) + ';'
		};
	}
};
