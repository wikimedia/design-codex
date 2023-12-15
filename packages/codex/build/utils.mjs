import { resolve } from 'path';
import * as url from 'url';
import { readFileSync } from 'fs';
import ts from 'typescript';
import * as allIcons from '@wikimedia/codex-icons';

const __dirname = url.fileURLToPath( /** @type {url.URL} */ ( new URL( '.', import.meta.url ) ) );

export const codexIconNames = Object.keys( allIcons )
	.filter( ( key ) => key.startsWith( 'cdxIcon' ) )
	.map( ( key ) => key.replace( /[A-Z]/g, ( l ) => `-${ l.toLowerCase() }` ).replace( /^-/, '' ) )
	.join( ', ' );

/**
 * Statically analyze the lib.ts file to generate an object representing
 * module names as keys and module paths as values. This data structure
 * is passed to Vite as the "entry" option for library mode builds.
 *
 * @return {Object.<string, string>}
 */
export function getLibEntries() {
	const libPath = resolve( __dirname, '..', 'src', 'lib.ts' );
	const lib = readFileSync( libPath, 'utf-8' );
	const source = ts.createSourceFile( libPath, lib, ts.ScriptTarget.ES2015 );

	/** @type {Object.<string, string>} */
	const entryMap = {};

	for ( const statement of source.statements ) {
		if ( !ts.isImportDeclaration( statement ) ) {
			continue;
		}

		const { importClause, moduleSpecifier } = statement;

		if (
			!importClause ||
			importClause.isTypeOnly ||
			!importClause?.name ||
			!ts.isStringLiteral( moduleSpecifier )
		) {
			continue;
		}

		const moduleName = String( importClause.name.escapedText );
		const modulePath = resolve( __dirname, '..', 'src', moduleSpecifier.text );

		entryMap[ moduleName ] = modulePath;
	}

	return entryMap;
}
