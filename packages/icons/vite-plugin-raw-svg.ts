import { promises } from 'fs';
import { parse } from 'path';
import { Plugin } from 'vite';
import { createFilter, FilterPattern } from '@rollup/pluginutils';
import { optimize } from 'svgo';
import removeSvgTag from './svgo-plugin-removeSvgTag';

type RawSvgOptions = {
	include?: FilterPattern,
	exclude?: FilterPattern
};

export default function rawSvg( options: RawSvgOptions = {
	include: '**/*.svg'
} ) : Plugin {
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
		transform( code: string, id: string ) {
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
}
