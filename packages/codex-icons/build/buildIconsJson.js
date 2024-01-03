/** @typedef {import('../src/types').Icon} Icon */

import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Polyfill for legacy CommonJS references
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

async function buildIconsJson() {
	/** @type {Record<string, Icon>} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const icons = await import( /** @type {string} */ ( '../dist/codex-icons.js' ) );

	/** @type {Record<string, Icon>} */
	const data = {};

	for ( const key in icons ) {
		if ( key.startsWith( 'cdxIcon' ) ) {
			data[ key ] = icons[ key ];
		}
	}

	await writeFile(
		resolve( __dirname, '../dist/codex-icons.json' ),
		JSON.stringify( data ),
		{ encoding: 'utf-8' }
	);
}

buildIconsJson().catch( ( error ) => {
	console.error( error );
} );
