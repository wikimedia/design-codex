// ----------------------------------------------------------------------------
// Style Dictionary configuration for Codex Design Tokens
//
// This configuration does the following:
//
// * defines the default sources (WikimediaUI theme with no mode overrides)
// * registers various custom transforms we need
// * registers a transform group so we can re-apply those transforms
// * registers a series of platforms and file formats to output:
//   - stylesheet platform (CSS, LESS, SCSS, and JSON files)
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
	isModeToken,
	isPublishedToken
} from './matchers.js';
import { createCustomStyleFormatter } from './formatters.js';
import {
	camelCaseNegative,
	getReferencedTokens,
	getTokenType,
	kebabCase,
	relativeSizeTransform,
	absoluteSizeTransform,
	cssVarTransform
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
		},
		'custom/wrapInCssVar': {
			type: 'value',
			matcher: shouldExposeCustomProperty,
			transformer: cssVarTransform,
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
		'codex/stylesheet/wrappedInCssVars': [
			// All the same transforms as codex/stylesheet
			'custom/kebabCase',
			'custom/tokenList',
			'custom/tokenType',
			'custom/relativeSize',
			'custom/absoluteSize',
			// Plus wrapInCssVar at the end
			'custom/wrapInCssVar'
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
		'custom/scss': createCustomStyleFormatter( 'sass' ),
		'custom/js': createCustomStyleFormatter( 'javascript/es6' ),
		'custom/less': createCustomStyleFormatter( 'less' )
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
			options: {
				fileHeader: 'default'
			},
			files: [
				{
					destination: 'theme-wikimedia-ui.css',
					format: 'custom/css',
					options: {
						outputFilter: isPublishedToken,
						outputReferences: true
					}
				},
				{
					destination: 'theme-wikimedia-ui.scss',
					format: 'custom/scss',
					options: {
						outputFilter: isPublishedToken,
						outputReferences: true
					}
				},
				{
					destination: 'theme-wikimedia-ui.json',
					format: 'json'
				},
				{
					destination: 'theme-wikimedia-ui-root.css',
					format: 'custom/css',
					options: {
						// Note that shouldExposeCustomProperty also implies isPublishedToken
						outputFilter: shouldExposeCustomProperty,
						outputReferences: true
					}
				},
				{
					destination: 'theme-wikimedia-ui-reset.less',
					format: 'custom/css',
					options: {
						// Note that shouldExposeCustomProperty also implies isPublishedToken
						outputFilter: shouldExposeCustomProperty,
						outputReferences: true,
						selector: '.cdx-mode-reset()'
					}
				}
			]
		},

		// In the files in this group, some tokens reference CSS custom properties. This is needed
		// to support switching modes. The other files in the group above set tokens to static
		// values that don't reference CSS custom properties.
		stylesheetCssVars: {
			transformGroup: 'codex/stylesheet/wrappedInCssVars',
			buildPath: 'dist/',
			options: {
				fileHeader: 'default'
			},
			files: [
				{
					destination: 'theme-wikimedia-ui.less',
					format: 'custom/less',
					options: {
						outputFilter: isPublishedToken,
						outputReferences: true
					}
				}
			]
		},

		javascript: {
			prefix: 'cdx',
			transformGroup: 'codex/js',
			buildPath: 'dist/',
			options: {
				fileHeader: 'default'
			},
			files: [
				{
					destination: 'theme-wikimedia-ui.js',
					format: 'custom/js',
					options: {
						outputFilter: isPublishedToken
					}
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
				fileHeader: 'default'
			},
			files: [
				{
					destination: 'theme-wikimedia-ui-mode-dark.css',
					format: 'css/variables',
					filter: isModeToken
				},
				{
					destination: 'theme-wikimedia-ui-mixin-dark.less',
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
