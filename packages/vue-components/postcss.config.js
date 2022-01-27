const autoprefixer = require( 'autoprefixer' );
const postcssRtlcss = require( 'postcss-rtlcss' );

module.exports = {
	plugins: [
		postcssRtlcss( {
			useCalc: true,
			processKeyFrames: true
		} ),
		autoprefixer()
	]
};
