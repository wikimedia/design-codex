'use strict';

const StyleDictionary = require( 'style-dictionary' ),
	{ getReferencedTokens, kebabCase } = require( './lib' ),
	codexStyleDictionary = StyleDictionary.extend( {
		source: [ 'properties/**/*.json' ],
		platforms: {
			scss: {
				transforms: [
					...StyleDictionary.transformGroup.scss,
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: '_variables.scss',
					format: 'scss/variables',
				} ],
			},
			css: {
				transforms: [
					...StyleDictionary.transformGroup.css,
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: '_variables.css',
					format: 'css/variables',
				} ],
			},
			less: {
				transforms: [
					...StyleDictionary.transformGroup.less,
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: '_variables.less',
					format: 'less/variables',
				} ],
			},
			json: {
				transforms: [
					...StyleDictionary.transformGroup.web,
					'name/kebabCase',
					'attr/tokenList',
				],
				buildPath: 'dist/',
				files: [ {
					destination: 'index.json',
					format: 'json',
				} ],
			},
		},
	} );

codexStyleDictionary.registerTransform( {
	name: 'attr/tokenList',
	type: 'attribute',
	transformer: getReferencedTokens,
} );

codexStyleDictionary.registerTransform( {
	name: 'name/kebabCase',
	type: 'name',
	transformer: kebabCase,
} );

codexStyleDictionary.buildAllPlatforms();
