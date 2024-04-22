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
//
// In the future additional "mode" files of the WikimediaUI theme can be produced
// by calling sd.extend() and providing different files via "source" and "include"
// properties.

import StyleDictionary from 'style-dictionary';
import { getPackageVersion } from './utils.js';
import {
	shouldUseRelativeSize,
	shouldUseAbsoluteSize,
	shouldExposeCustomProperty,
	isModeToken
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

// WikimediaUI theme, all platforms
const sdBase = StyleDictionary.extend( {
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

	// Use "include" for the base files, so that the dark mode build can be added in "source" below
	include: [
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

	// Platforms are populated separately for each build below
	platforms: {}
} );

// Build the regular Codex build
sdBase.extend( {
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
		}
	}
} ).buildAllPlatforms();

// Build the dark mode variables
sdBase.extend( {
	// Use "source" for the dark mode tokens so that they override the base files in "include"
	source: [
		'src/modes/dark.json'
	],

	platforms: {
		stylesheet: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: {
				fileHeader: 'experimental'
			},
			files: [
				{
					destination: 'theme-codex-wikimedia-mode-dark.css',
					format: 'css/variables',
					filter: isModeToken
				},
				{
					destination: 'theme-codex-wikimedia-mode-dark.less',
					format: 'css/variables',
					filter: isModeToken,
					options: {
						selector: '.cdx-mode-dark()'
					}
				}
			]
		}
	}
} ).buildAllPlatforms();

console.log( '\nBuild completed!' );
