const autoprefixer = require( 'autoprefixer' );
const postcssRtlcss = require( 'postcss-rtlcss' );
const scoped = require( './postcss-plugin-scoped' );

module.exports = {
	plugins: [
		scoped( {
			include: '../codex/**',
			plugin: postcssRtlcss( {
				useCalc: true
			} )
		} ),
		autoprefixer()
	]
};
