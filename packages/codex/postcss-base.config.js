const autoprefixer = require( 'autoprefixer' );

module.exports = {
	/** @type {import('postcss').AcceptedPlugin[]} */
	plugins: [
		autoprefixer()
	]
};
