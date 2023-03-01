'use strict';

/** @typedef {import('./types').ThemeConfig} ThemeConfig */
/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */

const dictFactory = require( './config' );
const aliasDictFactory = require( './aliasConfig' );

// HACK: Eventually we should implement a real theme system that discovers themes based on
// theme-foo.json files, and allows themes to specify their basePxFontSize and relativeTransform
// settings in those files. For now, hard-code this information to build two themes, WikimediaUI
// and WikimediaUI legacy (which is WikimediaUI but with a 14px base font size)

const sharedConfig = {
	relativeTransformUnit: 'em',
	relativeTransformPaths: [
		'size',
		'max-width',
		'font-size',
		'position.offset'
	],
	relativeTransformExcludePaths: [
		'size.absolute',
		'size.viewport',
		'max-width.breakpoint',
		'font-size.base',
		'position.offset.border-width-base'
	]
};

/** @type {ThemeConfig[]} */
const themeConfigs = [
	{
		themeName: 'wikimedia-ui',
		themeNamePrint: 'WikimediaUI',
		basePxFontSize: 16,
		...sharedConfig
	},
	{
		themeName: 'wikimedia-ui-legacy',
		themeNamePrint: 'WikimediaUI legacy',
		basePxFontSize: 14,
		...sharedConfig
	}
];

for ( const themeConfig of themeConfigs ) {
	const dict = dictFactory( themeConfig );
	console.log( `Building Codex design tokens for ${themeConfig.themeNamePrint} theme…` );
	dict.buildAllPlatforms();
}

console.log( 'Building aliases…' );

const aliasDict = aliasDictFactory();
aliasDict.buildAllPlatforms();

console.log( '\nBuild completed!' );
