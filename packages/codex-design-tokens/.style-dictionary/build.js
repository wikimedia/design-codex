// Style Dictionary configuration for Codex Design Tokens
//
// This configuration does the following:
//
// * defines the default sources (WikimediaUI theme with no mode overrides)
// * registers various custom transforms we need
// * registers a transform group so we can re-apply those transforms
// * registers a series of platforms and file formats to output:
//   - stylesheet platform (CSS, Less, SCSS, and JSON files)
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
	isPublishedToken,
	isColorProperty,
	isTypographyProperty
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

// WikimediaUI theme, all platforms.
const sdBase = new StyleDictionary( {
	// Use "include" for the base files, so that the dark mode build can be added in "source" below
	include: [
		'src/themes/wikimedia-ui.json',
		'src/application.json',
		'src/components.json'
	],

	// Platforms are populated separately for each build below.
	platforms: {},

	hooks: {
		fileHeaders: {
			codexDefaultFileHeader: () => {
				const packageVersion = getPackageVersion();
				return [
					'Codex Design Tokens v' + packageVersion,
					'Design System for Wikimedia',
					'See https://doc.wikimedia.org/codex/latest/design-tokens/overview.html'
				];
			}
		},
		formats: {
			'custom/css': createCustomStyleFormatter( 'css' ),
			'custom/less': createCustomStyleFormatter( 'less' ),
			'custom/scss': createCustomStyleFormatter( 'sass' ),
			'custom/js': createCustomStyleFormatter( 'javascript/es6' )
		},
		transforms: {
			'custom/kebabCase': {
				type: 'name',
				transform: kebabCase
			},
			'custom/camelWithNegative': {
				type: 'name',
				filter: ( token ) => token.path.some( ( fragment ) => fragment.startsWith( '-' ) ),
				transform: camelCaseNegative
			},
			'custom/tokenList': {
				type: 'attribute',
				transform: getReferencedTokens
			},
			'custom/tokenType': {
				type: 'attribute',
				transform: getTokenType
			},
			'custom/relativeSize': {
				type: 'value',
				filter: shouldUseRelativeSize,
				transform: relativeSizeTransform,
				transitive: true
			},
			'custom/absoluteSize': {
				type: 'value',
				filter: shouldUseAbsoluteSize,
				transform: absoluteSizeTransform,
				transitive: true
			},
			'custom/wrapInCssVar': {
				type: 'value',
				filter: shouldExposeCustomProperty,
				transform: cssVarTransform,
				transitive: true
			}
		},
		transformGroups: {
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
				'name/camel',
				'custom/camelWithNegative',
				'custom/tokenList',
				'custom/tokenType',
				'custom/relativeSize',
				'custom/absoluteSize'
			]
		}
	}
} );

await sdBase.hasInitialized;

// Build the regular Codex build.
await ( await sdBase.extend( {
	platforms: {
		stylesheet: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: {
				fileHeader: 'codexDefaultFileHeader'
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
					destination: 'theme-wikimedia-ui-mixin-mode-reset.less',
					format: 'custom/css',
					options: {
						// Note that shouldExposeCustomProperty also implies isPublishedToken
						outputFilter: shouldExposeCustomProperty,
						outputReferences: true,
						selector: '.cdx-mode-reset()'
					}
				},
				{
					destination: 'theme-wikimedia-ui-mixin-light.less',
					format: 'custom/css',
					options: {
						outputFilter: isColorProperty,
						outputReferences: true,
						selector: '.cdx-mode-light()'
					}
				},
				{
					destination: 'theme-wikimedia-ui-mixin-medium.less',
					format: 'custom/css',
					options: {
						outputFilter: isTypographyProperty,
						outputReferences: true,
						selector: '.cdx-mode-medium()'
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
				fileHeader: 'codexDefaultFileHeader'
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
				fileHeader: 'codexDefaultFileHeader'
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
} ) ).buildAllPlatforms();

// Build the dark mode variables
await ( await sdBase.extend( {
	// Use "source" for the dark mode tokens so that they override the base files in "include".
	source: [
		'src/modes/dark.json'
	],

	platforms: {
		stylesheet: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: {
				fileHeader: 'codexDefaultFileHeader'
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
				},
				// Full build of tokens including dark overrides.
				{
					destination: 'theme-wikimedia-ui-mode-dark.json',
					format: 'json'
				}
			]
		}
	}
} ) ).buildAllPlatforms();

// Build the small mode variables
await ( await sdBase.extend( {
	// Use "source" for the small mode tokens so that they override the base files in "include".
	source: [
		'src/modes/small.json'
	],

	platforms: {
		stylesheet: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: {
				fileHeader: 'codexDefaultFileHeader'
			},
			files: [
				{
					destination: 'theme-wikimedia-ui-mode-small.css',
					format: 'css/variables',
					filter: isModeToken
				},
				{
					destination: 'theme-wikimedia-ui-mixin-small.less',
					format: 'css/variables',
					filter: isModeToken,
					options: {
						selector: '.cdx-mode-small()'
					}
				},
				// Full build of tokens including small overrides.
				{
					destination: 'theme-wikimedia-ui-mode-small.json',
					format: 'json'
				}
			]
		}
	}
} ) ).buildAllPlatforms();

// Build the large mode variables
await ( await sdBase.extend( {
	// Use "source" for the large mode tokens so that they override the base files in "include".
	source: [
		'src/modes/large.json'
	],

	platforms: {
		stylesheet: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: {
				fileHeader: 'codexDefaultFileHeader'
			},
			files: [
				{
					destination: 'theme-wikimedia-ui-mode-large.css',
					format: 'css/variables',
					filter: isModeToken
				},
				{
					destination: 'theme-wikimedia-ui-mixin-large.less',
					format: 'css/variables',
					filter: isModeToken,
					options: {
						selector: '.cdx-mode-large()'
					}
				},
				// Full build of tokens including large overrides.
				{
					destination: 'theme-wikimedia-ui-mode-large.json',
					format: 'json'
				}
			]
		}
	}
} ) ).buildAllPlatforms();

// Build the x-large mode variables
await ( await sdBase.extend( {
	// Use "source" for the x-large mode tokens so that they override the base files in "include".
	source: [
		'src/modes/x-large.json'
	],

	platforms: {
		stylesheet: {
			transformGroup: 'codex/stylesheet',
			buildPath: 'dist/',
			options: {
				fileHeader: 'codexDefaultFileHeader'
			},
			files: [
				{
					destination: 'theme-wikimedia-ui-mode-x-large.css',
					format: 'css/variables',
					filter: isModeToken
				},
				{
					destination: 'theme-wikimedia-ui-mixin-x-large.less',
					format: 'css/variables',
					filter: isModeToken,
					options: {
						selector: '.cdx-mode-x-large()'
					}
				},
				// Full build of tokens including x-large overrides.
				{
					destination: 'theme-wikimedia-ui-mode-x-large.json',
					format: 'json'
				}
			]
		}
	}
} ) ).buildAllPlatforms();

console.log( '\nBuild completed!' );
