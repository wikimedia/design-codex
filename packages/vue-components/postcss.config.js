const customProperties = require( 'postcss-custom-properties' );

module.exports = {
	plugins: [
		require( 'autoprefixer' ),
		require( 'postcss-nested' ),
		customProperties( { preserve: false } ),
		require( 'postcss-remove-root' )
	]
};
