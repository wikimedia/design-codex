import { defineConfig } from 'vite';
import path from 'path';
import rawSvg from './vite-plugin-raw-svg';
import typescript from '@rollup/plugin-typescript';

// https://vitejs.dev/config/
export default defineConfig( {
	build: {
		target: 'es2015',
		minify: true,
		emptyOutDir: true,

		lib: {
			name: 'codex-icons',
			entry: path.resolve( __dirname, 'src/index.ts' ),
			formats: [ 'es', 'umd' ]
		},

		rollupOptions: {
			output: {
				entryFileNames: 'codex-icons.[format].js',
				assetFileNames: 'codex-icons.[name].[ext]'
			}
		}
	},
	plugins: [
		rawSvg( {
			include: 'src/images/*.svg'
		} ),
		typescript()
	]
} );
