'use strict';

/** @typedef {import('./types').ThemeConfig} ThemeConfig */

const StyleDictionary = require( 'style-dictionary' );
const configFactory = require( './config' );
const {
	createCustomStyleFormatter,
	getReferencedTokens,
	getTokenType,
	makePathMatcher,
	makeRelativeUnitTransform,
	kebabCase
} = require( './lib' );

// HACK: Eventually we should implement a real theme system that discovers themes based on
// theme-foo.json files, and allows themes to specify their basePxFontSize and relativeTransform
// settings in those files. For now, hard-code this information to build two themes, wikimedia-ui
// and wikimedia-ui-legacy (which is wikimedia-ui but with a 14px base font size)

const sharedConfig = {
	relativeTransformUnit: 'em',
	relativeTransformPaths: [
		'size',
		'max-width',
		'font-size'
	],
	relativeTransformExcludePaths: [
		'size.absolute',
		'size.viewport',
		'max-width.breakpoint',
		'font-size.base'
	]
};

/** @type {ThemeConfig[]} */
const themeConfigs = [
	{
		themeName: 'wikimedia-ui',
		basePxFontSize: 16,
		...sharedConfig
	},
	{
		themeName: 'wikimedia-ui-legacy',
		basePxFontSize: 14,
		...sharedConfig
	}
];

for ( const themeConfig of themeConfigs ) {
	const dict = StyleDictionary.extend( configFactory( themeConfig ) );

	dict.registerTransform( {
		name: 'attr/tokenList',
		type: 'attribute',
		transformer: getReferencedTokens
	} );

	dict.registerTransform( {
		name: 'attr/tokenType',
		type: 'attribute',
		transformer: getTokenType
	} );

	dict.registerTransform( {
		name: 'name/kebabCase',
		type: 'name',
		transformer: kebabCase
	} );

	dict.registerTransform( {
		name: 'value/relativeUnit',
		type: 'value',
		matcher: makePathMatcher(
			themeConfig.relativeTransformPaths,
			themeConfig.relativeTransformExcludePaths
		),
		transformer: makeRelativeUnitTransform( themeConfig.relativeTransformUnit ),
		transitive: true
	} );

	dict.registerFormat( {
		name: 'custom/format/css',
		formatter: createCustomStyleFormatter( 'css' )
	} );

	dict.registerFormat( {
		name: 'custom/format/less',
		formatter: createCustomStyleFormatter( 'less' )
	} );

	dict.registerFormat( {
		name: 'custom/format/scss',
		formatter: createCustomStyleFormatter( 'sass' )
	} );

	console.log( 'Building Codex design tokens…' );

	// Build all the platforms.
	dict.buildAllPlatforms();
}

console.log( '\nBuild completed!' );
