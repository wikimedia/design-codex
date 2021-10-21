/* eslint-env node */
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
					name: 'preset-default'
				},
				removeSvgTag
			]
		} );
		return 'module.exports = ' + JSON.stringify( optimized.data ) + ';';
	}
};
