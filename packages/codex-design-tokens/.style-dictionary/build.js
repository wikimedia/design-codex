'use strict';

const StyleDictionary = require( 'style-dictionary' ).extend( __dirname + '/config.js' );
const {
	createCustomStyleFormatter,
	getReferencedTokens,
	getTokenType,
	kebabCase
} = require( './lib' );

StyleDictionary.registerTransform( {
	name: 'attr/tokenList',
	type: 'attribute',
	transformer: getReferencedTokens
} );

StyleDictionary.registerTransform( {
	name: 'attr/tokenType',
	type: 'attribute',
	transformer: getTokenType
} );

StyleDictionary.registerTransform( {
	name: 'name/kebabCase',
	type: 'name',
	transformer: kebabCase
} );

StyleDictionary.registerFormat( {
	name: 'custom/format/css',
	formatter: createCustomStyleFormatter( 'css' )
} );

StyleDictionary.registerFormat( {
	name: 'custom/format/less',
	formatter: createCustomStyleFormatter( 'less' )
} );

StyleDictionary.registerFormat( {
	name: 'custom/format/scss',
	formatter: createCustomStyleFormatter( 'sass' )
} );

console.log( 'Building Codex design tokens…' );

// Build all the platforms.
StyleDictionary.buildAllPlatforms();

console.log( '\nBuild completed!' );
