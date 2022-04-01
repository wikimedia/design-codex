const autoprefixer = require( 'autoprefixer' );
const postcssRtlcss = require( 'postcss-rtlcss' );

module.exports = {
	/** @type {import('postcss').AcceptedPlugin[]} */
	plugins: [
		postcssRtlcss( {
			useCalc: true,
			processKeyFrames: true,
			safeBothPrefix: true
		} ),
		autoprefixer()
	]
};
