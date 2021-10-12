const postcssPresetEnv = require( 'postcss-preset-env' );
const postcssRemoveRoot = require( 'postcss-remove-root' );

module.exports = {
	plugins: [
		postcssPresetEnv( {
			stage: 0,
			preserve: false
		} ),
		postcssRemoveRoot()
	]
};
