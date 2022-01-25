import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig( {
	server: {
		/**
		 * Explicitly allow dev server to serve files from other workspaces.
		 */
		fs: { allow: [ '../..' ] }
	},

	build: {
		minify: true
	},

	resolve: {
		alias: {
			'@': path.resolve( __dirname, './../docs' )
		}
	}

} );
