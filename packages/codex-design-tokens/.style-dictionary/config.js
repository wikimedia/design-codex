'use strict';

/** @typedef {import('style-dictionary').Config} Config */
/** @typedef {import('./types').ThemeConfig} ThemeConfig */

/**
 * @param {ThemeConfig} config
 * @return {Config}
 */
module.exports = function ( { themeName, basePxFontSize } ) {
	return {
		source: [ 'src/**/*.json' ],
		tokens: {
			// Insert a "magic" font-size-base token that is set to baseFontSize
			'font-size': {
				base: {
					value: `${basePxFontSize}px`
				}
			}
		},
		platforms: {
			scss: {
				transforms: [
					'name/kebabCase',
					'value/relativeUnit'
				],
				basePxFontSize,
				buildPath: 'dist/',
				files: [ {
					destination: `theme-${themeName}.scss`,
					format: 'custom/format/scss'
				} ]
			},
			css: {
				transforms: [
					'name/kebabCase',
					'value/relativeUnit'
				],
				basePxFontSize,
				buildPath: 'dist/',
				files: [ {
					destination: `theme-${themeName}.css`,
					format: 'custom/format/css'
				} ]
			},
			less: {
				transforms: [
					'name/kebabCase',
					'value/relativeUnit'
				],
				basePxFontSize,
				buildPath: 'dist/',
				files: [ {
					destination: `theme-${themeName}.less`,
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
					'attr/tokenType',
					'value/relativeUnit'
				],
				basePxFontSize,
				buildPath: 'dist/',
				files: [ {
					destination: `theme-${themeName}.json`,
					format: 'json'
				} ]
			}
		}
	};
};
