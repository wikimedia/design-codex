const postcssPresetEnv = require( 'postcss-preset-env' );
const postcssNested = require( 'postcss-nested' );
const postcssMixins = require( 'postcss-mixins' );
const postcssRemoveRoot = require( 'postcss-remove-root' );

module.exports = {
	plugins: [
		postcssNested(),
		postcssMixins(),
		postcssPresetEnv( {
			stage: 0,
			preserve: false,
			features: {
				// postcss-preset-env uses the postcss-nesting plugin, but we want nesting rules
				// from postcss-nested instead (particularly for parent selector concatenation).
				'nesting-rules': false
			}
		} ),
		postcssRemoveRoot()
	]
};
