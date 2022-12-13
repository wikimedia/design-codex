import { Plugin } from 'vite';
import { promises } from 'fs';
import { parse } from 'path';
import { createFilter, FilterPattern } from '@rollup/pluginutils';
import { optimize } from 'svgo';
import removeSvgTag from './svgo-plugin-removeSvgTag';

interface RawSvgOptions {
	include?: FilterPattern,
	exclude?: FilterPattern
}

/**
 * Vite plugin that transforms and inlines imported SVG files.
 *
 * This allows TypeScript code to do `import foo from './foo.svg'`, and have `foo` be a string
 * containing the contents of that SVG file. The SVG file is processed by SVGO using the default
 * preset. Additionally, all IDs in the SVG file are prefixed with `cdx-icon-foo-` (where `foo`
 * is the name of the file without the extension), and the outer <svg> tag is removed.
 *
 * @param options
 * @param options.include
 * @param options.exclude
 * @return Vite plugin
 */
export default ( options: RawSvgOptions = {
	include: '**/*.svg'
} ): Plugin => {
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
						{
							// Prefix IDs with the icon name, so that they are unique
							// Otherwise, using multiple icons on the same page causes ID
							// collisions, which result in very strange rendering bugs due
							// to <use> tags reusing something from a different icon
							name: 'prefixIds',
							params: {
								prefix: `cdx-icon-${iconName}-`,
								delim: ''
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
