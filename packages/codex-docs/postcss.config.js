const autoprefixer = require( 'autoprefixer' );
const postcssRtlcss = require( 'postcss-rtlcss' );
const scoped = require( './postcss-plugin-scoped' );

module.exports = {
	/** @type {import('postcss').AcceptedPlugin[]} */
	plugins: [
		scoped( {
			include: '../codex/**',
			plugin: postcssRtlcss( {
				useCalc: true,
				processKeyFrames: true,
				safeBothPrefix: true
			} )
		} ),
		autoprefixer()
	]
};
