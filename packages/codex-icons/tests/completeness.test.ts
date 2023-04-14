import { readFileSync } from 'fs';
import { resolve } from 'path';
import { globSync } from 'glob';

describe( 'all image files are used', () => {
	const iconsTs = readFileSync( resolve( __dirname, '../src/icons.ts' ), { encoding: 'utf-8' } );
	const iconImports = iconsTs.matchAll( /^import [^ ]+ from '.\/images\/([^/]+)';$/gm );
	if ( !iconImports ) {
		throw new Error( 'Failed to find import statements in src/icons.ts' );
	}
	const importedIcons = Array.from( iconImports ).map( ( match ) => match[ 1 ] );
	const imagesDir = resolve( __dirname, '../src/images' );
	const imageFiles = globSync( '*.svg', { cwd: imagesDir } );

	test.each( imageFiles )( 'icons.ts imports %s', ( imageFile ) => {
		expect( importedIcons ).toContain( imageFile );
	} );
} );
