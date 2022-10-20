import { Plugin } from 'vite';
import { existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { resolve } from 'path';

interface CopyFilesOptions {
	srcDir: string,
	destDir: string
}

/**
 * A simple Vite plugin that copies files from a given source directory to a given destination
 * directory. Intended to be used to copy source files to the dist/ directory.
 *
 * @param options
 * @return Vite plugin
 */
export default ( options: CopyFilesOptions ): Plugin => {
	return {
		name: 'copy-files',
		writeBundle() {
			// Create the destination dierctory if it does not yet exist
			if ( !( existsSync( options.destDir ) ) ) {
				mkdirSync( options.destDir );
			}

			// Copy any files in the source directory to the destination directory
			if ( existsSync( options.srcDir ) ) {
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
