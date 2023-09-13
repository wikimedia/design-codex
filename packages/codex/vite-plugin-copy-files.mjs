import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { resolve } from 'path';

/**
 * @typedef {Object} CopyFilesOptions
 * @property {string} srcDir
 * @property {string} destDir
 */

/**
 * A simple Vite plugin that copies files from a given source directory to a given destination
 * directory. Intended to be used to copy source files to the dist/ directory.
 *
 * @param {CopyFilesOptions} options
 * @return {import('vite').Plugin}
 *
 */
export default ( options ) => {
	return {
		name: 'copy-files',
		writeBundle() {
			// Create the destination dierctory if it does not yet exist
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			if ( !( existsSync( options.destDir ) ) ) {
			// eslint-disable-next-line security/detect-non-literal-fs-filename
				mkdirSync( options.destDir );
			}

			// Copy any files in the source directory to the destination directory
			// eslint-disable-next-line security/detect-non-literal-fs-filename
			if ( existsSync( options.srcDir ) ) {
				// eslint-disable-next-line security/detect-non-literal-fs-filename
				readdirSync( options.srcDir ).forEach( ( file ) => {

					copyFileSync(
						resolve( options.srcDir, file ),
						resolve( options.destDir, file )
					);
				} );
			}
		}
	};
};
