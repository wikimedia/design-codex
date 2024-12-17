// TypeScript uses types.d.ts for type checking.
/** @import { PackageJson } from './types.js' */

import path from 'node:path';
import { createRequire } from 'node:module';

// Polyfill CommonJS require() for use in ES modules.
const require = createRequire( import.meta.url );

/**
 * Get the version number from package.json.
 *
 * @return {string}
 */
export function getPackageVersion() {
	const packageJsonPath = path.join( '..', 'package.json' );
	/** @type {PackageJson} */
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { version } = require( packageJsonPath );
	return version;
}

/**
 * Escapes special characters.
 *
 * Unfortunately this is duplicated from stringHelpers.ts in Codex, which we can't import here
 * because it's a TypeScript file (and because it would be a wrong-way dependency).
 *
 * @param {string} value Value to be escaped
 *
 * @return {string}
 */
export function regExpEscape( value ) {
	return value.replace( /([\\{}()|.?*+\-^$[\]])/g, '\\$1' );
}
