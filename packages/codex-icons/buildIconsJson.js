/* eslint-disable @typescript-eslint/no-var-requires */
const { writeFileSync, existsSync } = require( 'fs' );
const path = require( 'path' );

const iconsFile = path.resolve( __dirname, 'dist/codex-icons.cjs.js' );
if ( !existsSync( iconsFile ) ) {
	throw new Error( `File not found: ${iconsFile}\nRun 'npm run build' first to build this file` );
}

const iconsExport = require( iconsFile );
const allIcons = {};
for ( const key in iconsExport ) {
	if ( key.startsWith( 'cdxIcon' ) ) {
		allIcons[ key ] = iconsExport[ key ];
	}
}

writeFileSync(
	path.resolve( __dirname, 'dist/codex-icons.json' ),
	JSON.stringify( allIcons ),
	{ encoding: 'utf-8' }
);
