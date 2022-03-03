'use strict';

const StyleDictionary = require( 'style-dictionary' ).extend( __dirname + '/config.js' );
const { createCustomStyleFormatter } = require( './lib' );

console.log( 'Building Codex design tokens…' );

StyleDictionary.registerFormat({
	name: 'custom/format/css',
	formatter: createCustomStyleFormatter( 'css' )
});

StyleDictionary.registerFormat( {
	name: 'custom/format/less',
	formatter: createCustomStyleFormatter( 'less' )
} );

StyleDictionary.registerFormat({
	name: 'custom/format/scss',
	formatter: createCustomStyleFormatter( 'sass' )
});

// Build all the platforms.
StyleDictionary.buildAllPlatforms();

console.log( '\nBuild completed!' );