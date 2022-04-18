import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import * as allIcons from '../src/icons';

describe( 'type definitions', () => {
	const iconDefsPath = resolve( __dirname, '../dist/types/icons.d.ts' );
	if ( !existsSync( iconDefsPath ) ) {
		throw new Error( `File not found: ${iconDefsPath}\nRun 'npm run build' first to build this file` );
	}
	const iconDefs = readFileSync( iconDefsPath, { encoding: 'utf-8' } );

	// The generated type definitions are fragile: if the right syntax isn't used, TypeScript might
	// generate something like import svgAdd from './images/add.svg';, and that would fail because
	// the module declaration for *.svg isn't considered. Using the correct syntax ensures that
	// the type definitions look like export declare const cdxIconAdd: string;
	it( 'does not refer to .svg file paths', () => {
		expect( iconDefs ).not.toContain( '.svg' );
	} );

	it( 'contains all icons', () => {
		const typedefIcons = iconDefs.split( '\n' ).map( ( line ) => {
			const match = /^export declare const (cdxIcon[a-zA-Z0-9]+):/.exec( line );
			return match ? match[ 1 ] : null;
		} ).filter( Boolean );
		expect( typedefIcons ).toEqual( Object.keys( allIcons ) );
	} );
} );
