const autoprefixer = require( 'autoprefixer' );
const postcssRtlcss = require( 'postcss-rtlcss' );
const scoped = require( './postcss-plugin-scoped' );

module.exports = {
	plugins: [
		scoped( {
			include: '../vue-components/**',
			plugin: postcssRtlcss( {
				useCalc: true
			} )
		} ),
		autoprefixer()
	]
};
