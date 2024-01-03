import StyleDictionary from 'style-dictionary';
import {
	getReferencedTokens,
	getTokenType,
	kebabCase,
	makePathMatcher,
	makeRelativeUnitTransform,
	createCustomStyleFormatter,
	getPackageVersion
} from './lib.js';

/** @typedef {import('style-dictionary').Core} StyleDictionaryCore */
/** @typedef {import('./types').ThemeConfig} ThemeConfig */

/**
 * @param {ThemeConfig} themeConfig
 * @return {StyleDictionaryCore}
 */
export default function ( themeConfig ) {
	const dict = StyleDictionary.extend( {
		fileHeader: {
			codexDesignTokensHeader: () => {
				const packageVersion = getPackageVersion();

				return [
					'Codex Design Tokens v' + packageVersion,
					'Design System for Wikimedia',
					'See https://doc.wikimedia.org/codex/latest/design-tokens/overview.html'
				];
			}
		},
		source: [ 'src/codex-*.json', 'src/theme-wikimedia-ui.json' ],
		tokens: {
			// Insert a "magic" font-size-base token that is set to baseFontSize.
			'font-size': {
				base: {
					comment: 'This token is targeted exclusively for font-size derived calculations. Apply `font-size-medium` and similar for component font size property use.',
					value: `${ themeConfig.basePxFontSize }px`
				}
			}
		},
		platforms: {
			stylesheet: {
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
				basePxFontSize: themeConfig.basePxFontSize,
				buildPath: 'dist/',
				options: {
					// Reference to registered fileHeader above.
					// Apply to all files in this platform.
					fileHeader: 'codexDesignTokensHeader'
				},
				files: [
					{
						destination: `theme-${ themeConfig.themeName }.scss`,
						format: 'custom/format/scss'
					},
					{
						destination: `theme-${ themeConfig.themeName }.css`,
						format: 'custom/format/css'
					},
					{
						destination: `theme-${ themeConfig.themeName }.less`,
						format: 'custom/format/less'
					},
					{
						destination: `theme-${ themeConfig.themeName }.json`,
						format: 'json'
					}
				]
			},
			javascript: {
				prefix: 'cdx',
				transforms: [
					'name/cti/camel',
					'attr/tokenList',
					'attr/tokenType',
					'value/relativeUnit'
				],
				basePxFontSize: themeConfig.basePxFontSize,
				buildPath: 'dist/',
				options: {
					// Reference to registered fileHeader above.
					// Apply to all files in this platform.
					fileHeader: 'codexDesignTokensHeader'
				},
				files: [
					{
						destination: `theme-${ themeConfig.themeName }.js`,
						format: 'custom/format/js'
					}
				]
			}
		}
	} );

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

	dict.registerFormat( {
		name: 'custom/format/js',
		formatter: createCustomStyleFormatter( 'javascript/es6' )
	} );

	return dict;
}
