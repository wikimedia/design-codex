import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as allIcons from '../src/icons';

// Polyfill for legacy CommonJS references
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

describe( 'type definitions', () => {
	const iconDefsPath = resolve( __dirname, '../dist/types/icons.d.ts' );
	if ( !existsSync( iconDefsPath ) ) {
		throw new Error( `File not found: ${ iconDefsPath }\nRun 'npm run build' first to build this file` );
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
		expect( typedefIcons.sort() ).toEqual( Object.keys( allIcons ).sort() );
	} );
} );
