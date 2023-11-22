import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import * as allIcons from '@wikimedia/codex-icons';

export const codexIconNames = Object.keys( allIcons )
	.filter( ( key ) => key.startsWith( 'cdxIcon' ) )
	.map( ( key ) => key.replace( /[A-Z]/g, ( l ) => `-${ l.toLowerCase() }` ).replace( /^-/, '' ) )
	.join( ', ' );

/**
 * Convert a kebab-case name to PascalCase
 *
 * @param {string} name
 * @return {string}
 */
export function getPascalCaseName( name ) {
	return name
		.split( '-' )
		.map( ( s ) => s.charAt( 0 ).toUpperCase() + s.slice( 1 ) )
		.join( '' );
}

/**
 * Generate a data structure that corresponds to every component
 * in the library, represented as a record object. The keys of this
 * object are PascalCase component names, and the values are absolute
 * file paths to the corresponding Vue SFC. This data structure can be
 * passed directly to Vite as the "entry" option for library mode builds.
 *
 * @param {string} path
 * @return {Object.<string, string>} componentMap
 */
export function getComponentEntryPoints( path ) {
	const srcDir = readdirSync( path );

	return srcDir.reduce( ( map, component ) => {
		const current = resolve( path, component );

		if ( statSync( current ).isDirectory() ) {
			const sfc = readdirSync( current ).find( ( f ) => f.endsWith( '.vue' ) );

			if ( sfc ) {
				const name = getPascalCaseName( component );
				map[ `Cdx${ name }` ] = resolve( current, sfc );
			}
		}

		return map;
	}, /** @type Object.<string, string> */ ( {} ) );
}
