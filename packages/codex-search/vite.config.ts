import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// See build.mjs for build settings; this file is only used during dev mode
module.exports = defineConfig( () => {
	return {
		server: {
			host: '0.0.0.0'
		},

		plugins: [
			vue()
		]
	};
} );
