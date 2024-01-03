/** @typedef {import('../src/types').Icon} Icon */

import { writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getLessVariableName, getIconOutput } from './utils.js';

// Polyfill for legacy CommonJS references
const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

async function buildIconsLess() {
	/** @type {Record<string, Icon>} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const icons = await import( /** @type {string} */ ( '../dist/codex-icons.js' ) );
	let output = '';

	for ( const key in icons ) {
		if ( key.startsWith( 'cdxIcon' ) ) {
			const icon = icons[ key ];
			const lessVariableName = getLessVariableName( key );
			const iconString = getIconOutput( lessVariableName, icon );
			output += iconString;
		}
	}

	await writeFile(
		resolve( __dirname, '../dist/codex-icon-paths.less' ),
		output,
		{ encoding: 'utf-8' }
	);
}

buildIconsLess().catch( ( error ) => {
	console.error( error );
} );
