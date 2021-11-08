import { defineConfig } from 'vite';

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
	}
} );
