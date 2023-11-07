'use strict';

const StyleDictionary = require( 'style-dictionary' );
const { kebabCase, getReferencedTokens, wrapFormatterWithFilter } = require( './lib' );

/** @typedef {import('style-dictionary').Core} StyleDictionaryCore */
/** @typedef {import('style-dictionary/types/Matcher').Matcher} Matcher */

/**
 * @return {StyleDictionaryCore}
 */
module.exports = function () {
	const dict = StyleDictionary.extend( {
		include: [ 'src/codex-*.json', 'src/theme-wikimedia-ui.json' ],
		source: [ 'src/deprecated-aliases-wikimedia-ui-base.json' ],
		fileHeader: {
			codexDesignTokensHeader: () => {
				const packageJson = require( '../package.json' );
				return [
					'Codex Design Tokens (deprecated aliases) v' + packageJson.version,
					'Design System for Wikimedia',
					'See https://doc.wikimedia.org/codex/latest/design-tokens/overview.html'
				];
			}
		},
		platforms: {
			stylesheet: {
				transforms: [
					'name/kebabCase',
					'attr/tokenList'
				],
				buildPath: 'dist/',
				files: [
					{
						destination: 'deprecated-aliases-wikimedia-ui-base.scss',
						format: 'custom/alias-scss'
					},
					{
						destination: 'deprecated-aliases-wikimedia-ui-base.css',
						format: 'custom/alias-css'
					},
					{
						destination: 'deprecated-aliases-wikimedia-ui-base.less',
						format: 'custom/alias-less'
					},
					{
						destination: 'deprecated-aliases-wikimedia-ui-base.json',
						format: 'custom/alias-json'
					}
				],
				options: {
					outputReferences: true,
					// Reference to registered fileHeader above.
					// Apply to all files in this platform.
					fileHeader: 'codexDesignTokensHeader'
				}
			}
		}
	} );

	dict.registerTransform( {
		name: 'name/kebabCase',
		type: 'name',
		transformer: kebabCase
	} );

	dict.registerTransform( {
		name: 'attr/tokenList',
		type: 'attribute',
		transformer: getReferencedTokens
	} );

	// Wrap the built-in SCSS, CSS, Less and JSON formatters with a filter that removes
	// non-alias tokens

	/** @type {Matcher} */
	function aliasFilter( token ) {
		return !!token.filePath.match( /\/deprecated-aliases-[^/]+$/ );
	}

	dict.registerFormat( {
		name: 'custom/alias-scss',
		formatter: wrapFormatterWithFilter( StyleDictionary.format[ 'scss/variables' ], aliasFilter )
	} );
	dict.registerFormat( {
		name: 'custom/alias-css',
		formatter: wrapFormatterWithFilter( StyleDictionary.format[ 'css/variables' ], aliasFilter )
	} );
	dict.registerFormat( {
		name: 'custom/alias-less',
		formatter: wrapFormatterWithFilter( StyleDictionary.format[ 'less/variables' ], aliasFilter )
	} );
	dict.registerFormat( {
		name: 'custom/alias-json',
		formatter: wrapFormatterWithFilter( StyleDictionary.format.json, aliasFilter )
	} );

	return dict;
};
