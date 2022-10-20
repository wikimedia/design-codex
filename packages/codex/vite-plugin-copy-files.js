const fs = require( 'fs' );
const path = require( 'path' );

/** @typedef {{ srcDir: string, destDir: string }} CopyFilesOptions */

/**
 * A simple Vite plugin that copies files from a given source directory to a given destination
 * directory. Intended to be used to copy source files to the dist/ directory.
 *
 * @param {CopyFilesOptions} options
 * @return {import('vite').Plugin}
 */
module.exports = function ( options ) {
	return {
		name: 'copy-files',
		writeBundle() {
			// Create the destination dierctory if it does not yet exist
			if ( !( fs.existsSync( options.destDir ) ) ) {
				fs.mkdirSync( options.destDir );
			}

			// Copy any files in the source directory to the destination directory
			if ( fs.existsSync( options.srcDir ) ) {
				fs.readdirSync( options.srcDir ).forEach( ( file ) => {
					fs.copyFileSync(
						path.resolve( options.srcDir, file ),
						path.resolve( options.destDir, file )
					);
				} );
			}
		}
	};
};
