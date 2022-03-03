'use strict';

const StyleDictionary = require( 'style-dictionary' ),
	{ getReferencedTokens, kebabCase } = require( './lib' ),
	codexStyleDictionary = StyleDictionary.extend( {
		source: [ 'src/**/*.json' ],
		platforms: {
			scss: {
				transforms: [
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: 'theme-wikimedia-ui.scss',
					format: 'custom/format/scss',
				} ],
			},
			css: {
				transforms: [
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: 'theme-wikimedia-ui.css',
					format: 'custom/format/css',
				} ],
			},
			less: {
				transforms: [
					'name/kebabCase',
				],
				buildPath: 'dist/',
				files: [ {
					destination: 'theme-wikimedia-ui.less',
					format: 'custom/format/less'
				} ],
			},
			json: {
				transforms: [
					// Note, we don't use pre-defined transform groups for JSON.
					// See https://github.com/amzn/style-dictionary/blob/main/docs/transform_groups.md
					// For app usage of the design tokens, we probably need to reconsider using one
					// similar to `...StyleDictionary.transformGroup.web`.
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

module.exports = codexStyleDictionary;
