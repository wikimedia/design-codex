const { promises } = require( 'fs' );
const { parse } = require( 'path' );
const { createFilter } = require( '@rollup/pluginutils' );
const { optimize } = require( 'svgo' );
const removeSvgTag = require( './svgo-plugin-removeSvgTag' );

/** @typedef {import('@rollup/pluginutils').FilterPattern} FilterPattern */
/** @typedef {{ include?: FilterPattern, exclude?: FilterPattern }} RawSvgOptions */

/**
 *
 * @param {RawSvgOptions} options
 * @return {import('vite').Plugin}
 */
module.exports = function rawSvg( options = {
	include: '**/*.svg'
} ) {
	const filter = createFilter( options.include, options.exclude );
	return {
		name: 'raw-svg',
		enforce: 'pre',
		async load( id ) {
			const [ filename ] = id.split( '?', 2 );
			if ( filter( filename ) ) {
				return await promises.readFile( filename, 'utf-8' );
			}
		},
		transform( code, id ) {
			const [ filename ] = id.split( '?', 2 );
			if ( filter( filename ) ) {
				const iconName = parse( filename ).name;
				const rawSvgContents = optimize( code, {
					path: id,
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									// Prefix IDs with the icon name, so that they are unique
									// Otherwise, using multiple icons on the same page causes ID
									// collisions, which result in very strange rendering bugs due
									// to <use> tags reusing something from a different icon
									cleanupIDs: {
										prefix: `cdx-icon-${iconName}-`
									},
									// Use smaller, non-backwards compatible optimization for
									// browsers only, see T299738.
									convertPathData: {
										noSpaceAfterFlags: true
									},
									mergePaths: {
										noSpaceAfterFlags: true
									}
								}
							}
						},
						removeSvgTag
					]
				} );
				return {
					code: `export default ${JSON.stringify( rawSvgContents.data )};`,
					map: { mappings: '' }
				};
			}
		}
	};
};
