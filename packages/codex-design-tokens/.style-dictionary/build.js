// ----------------------------------------------------------------------------
// Style Dictionary configuration for Codex Design Tokens
//
// This configuration does the following:
//
// * defines the default sources (WikimediaUI theme with no mode overrides)
// * registers various custom transforms we need
// * registers a transform group so we can re-apply those transforms
// * registers a series of platforms and file formats to output:
//   - stylesheet platform (CSS, LESS, SCSS, and JSON files); this also
//     includes the "experimental" LESS file with CSS vars
//   - javascript platform (JS file)
//   - "legacy" stylesheet and JS platforms (same as above but with a 14px
//      base font size).
//
// In the future additional "mode" files of the WikimediaUI theme can be produced
// by calling sd.extend() and providing different files via "source" and "include"
// properties.

import StyleDictionary from 'style-dictionary';
import { getPackageVersion } from './utils.js';
import {
	shouldUseRelativeSize,
	shouldUseAbsoluteSize,
	shouldExposeCustomProperty
} from './matchers.js';
import {
	createCustomStyleFormatter,
	experimentalLessVariables
} from './formatters.js';
import {
	camelCaseNegative,
	getReferencedTokens,
	getTokenType,
	kebabCase,
	relativeSizeTransform,
	absoluteSizeTransform
} from './transformers.js';

// WikimediaUI theme, all platforms, including "experimental" and "legacy" builds
const sd = StyleDictionary.extend( {
	fileHeader: {
		default: () => {
			const packageVersion = getPackageVersion();
			return [
				'Codex Design Tokens v' + packageVersion,
				'Design System for Wikimedia',
				'See https://doc.wikimedia.org/codex/latest/design-tokens/overview.html'
			];
		},
		experimental: () => {
			const packageVersion = getPackageVersion();
			return [
				'Codex Design Tokens v' + packageVersion,
				'Design System for Wikimedia',
				'See https://doc.wikimedia.org/codex/latest/design-tokens/overview.html',
				'',
				'This is an experimental stylesheet not intended for production use.'
			];
		}
	},

	source: [
		'src/themes/wikimedia-ui.json',
		'src/application.json',
		'src/components.json'
	],

	transform: {
		'custom/kebabCase': {
			type: 'name',
			transformer: kebabCase
		},
		'custom/camelWithNegative': {
			type: 'name',
			matcher: ( token ) => token.path.some( ( fragment ) => fragment.startsWith( '-' ) ),
			transformer: camelCaseNegative
		},
		'custom/tokenList': {
			type: 'attribute',
			transformer: getReferencedTokens
		},
		'custom/tokenType': {
			type: 'attribute',
			transformer: getTokenType
		},
		'custom/relativeSize': {
			type: 'value',
			matcher: shouldUseRelativeSize,
			transformer: relativeSizeTransform,
			transitive: true
		},
		'custom/absoluteSize': {
			type: 'value',
			matcher: shouldUseAbsoluteSize,
			transformer: absoluteSizeTransform,
			transitive: true
		}
	},

	transformGroup: {
		'codex/stylesheet': [
			'custom/kebabCase',
			'custom/tokenList',
			'custom/tokenType',
			'custom/relativeSize',
			'custom/absoluteSize'
		],
		'codex/js': [
			'name/cti/camel',
			'custom/camelWithNegative',
			'custom/tokenList',
			'custom/tokenType',
			'custom/relativeSize',
			'custom/absoluteSize'
		]
	},

	format: {
		'custom/css': createCustomStyleFormatter( 'css' ),
		'custom/less': createCustomStyleFormatter( 'less' ),
		'custom/scss': createCustomStyleFormatter( 'sass' ),
		'custom/js': createCustomStyleFormatter( 'javascript/es6' ),
		'custom/less-experimental': experimentalLessVariables
	},

	platforms: {
		stylesheet: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: { fileHeader: 'default' },
			files: [
				{
					destination: 'theme-wikimedia-ui.css',
					format: 'custom/css'
				},
				{
					destination: 'theme-wikimedia-ui.less',
					format: 'custom/less'
				},
				{
					destination: 'theme-wikimedia-ui.scss',
					format: 'custom/scss'
				},
				{
					destination: 'theme-wikimedia-ui.json',
					format: 'json'
				},
				{
					destination: 'theme-codex-wikimedia-experimental.less',
					format: 'custom/less-experimental',
					options: {
						fileHeader: 'experimental'
					}
				},
				{
					destination: 'theme-codex-wikimedia-experimental.css',
					format: 'css/variables',
					filter: shouldExposeCustomProperty,
					options: {
						fileHeader: 'experimental'
					}
				}
			]
		},

		javascript: {
			prefix: 'cdx',
			transformGroup: 'codex/js',
			buildPath: 'dist/',
			options: { fileHeader: 'default' },
			files: [
				{
					destination: 'theme-wikimedia-ui.js',
					format: 'custom/js'
				}
			]
		},

		// These files are identical but are still generated for compatibility purposes
		stylesheetLegacy: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: { fileHeader: 'default' },
			files: [
				{
					destination: 'theme-wikimedia-ui-legacy.css',
					format: 'custom/css'
				},
				{
					destination: 'theme-wikimedia-ui-legacy.less',
					format: 'custom/less'
				},
				{
					destination: 'theme-wikimedia-ui-legacy.scss',
					format: 'custom/scss'
				},
				{
					destination: 'theme-wikimedia-ui-legacy.json',
					format: 'json'
				},
				{
					destination: 'theme-codex-wikimedia-legacy-experimental.less',
					format: 'custom/less-experimental',
					options: {
						fileHeader: 'experimental'
					}
				},
				{
					destination: 'theme-codex-wikimedia-legacy-experimental.css',
					format: 'css/variables',
					filter: shouldExposeCustomProperty,
					options: {
						fileHeader: 'experimental'
					}
				}
			]
		},

		// These files are identical but are still generated for compatibility purposes
		javascriptLegacy: {
			prefix: 'cdx',
			transformGroup: 'codex/js',
			buildPath: 'dist/',
			options: { fileHeader: 'default' },
			files: [
				{
					destination: 'theme-wikimedia-ui-legacy.js',
					format: 'custom/js'
				}
			]
		}
	}
} );

// Build the normal version
sd.buildAllPlatforms();

console.log( '\nBuild completed!' );
