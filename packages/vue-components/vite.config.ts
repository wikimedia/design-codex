import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig( {
	build: {
		target: 'es2015',
		minify: true,
		emptyOutDir: true,

		lib: {
			name: 'Codex',
			entry: path.resolve( __dirname, 'src/lib.ts' ),
			formats: [ 'es', 'cjs' ]
		},

		rollupOptions: {
			output: {
				entryFileNames: 'codex.[format].js',
				assetFileNames: 'codex.[name].[ext]'
			},

			external: [ 'vue' ]
		}
	},
	plugins: [ vue() ]
} );
