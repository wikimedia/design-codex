'use strict';

/** @typedef {import('style-dictionary').Config} Config */

/** @type {Config} */
const config = {
	source: [ 'src/**/*.json' ],
	platforms: {
		scss: {
			transforms: [
				'name/kebabCase'
			],
			basePxFontSize: 16,
			buildPath: 'dist/',
			files: [ {
				destination: 'theme-wikimedia-ui.scss',
				format: 'custom/format/scss'
			} ]
		},
		css: {
			transforms: [
				'name/kebabCase'
			],
			basePxFontSize: 16,
			buildPath: 'dist/',
			files: [ {
				destination: 'theme-wikimedia-ui.css',
				format: 'custom/format/css'
			} ]
		},
		less: {
			transforms: [
				'name/kebabCase'
			],
			basePxFontSize: 16,
			buildPath: 'dist/',
			files: [ {
				destination: 'theme-wikimedia-ui.less',
				format: 'custom/format/less'
			} ]
		},
		json: {
			transforms: [
				// Note, we don't use pre-defined transform groups for JSON.
				// See https://github.com/amzn/style-dictionary/blob/main/docs/transform_groups.md
				// For app usage of the design tokens, we probably need to reconsider using one
				// similar to `...StyleDictionary.transformGroup.web`.
				'name/kebabCase',
				'attr/tokenList',
				'attr/tokenType'
			],
			buildPath: 'dist/',
			files: [ {
				destination: 'index.json',
				format: 'json'
			} ]
		}
	}
};

module.exports = config;
