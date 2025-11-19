import { defineConfig } from 'vite';
import { resolve } from 'path';
import rawSvg from './vite-plugin-raw-svg';
import typescript from '@rollup/plugin-typescript';

export default defineConfig( {
	build: {
		target: 'es2017',
		minify: true,
		emptyOutDir: true,

		lib: {
			name: 'codex-icons',
			entry: resolve( __dirname, 'src/index.ts' ),
			formats: [ 'es', 'cjs' ]
		}
	},
	plugins: [
		rawSvg( {
			include: 'src/images/*.svg'
		} ),
		typescript( {
			tsconfig: './tsconfig.json'
		} )
	]
} );
