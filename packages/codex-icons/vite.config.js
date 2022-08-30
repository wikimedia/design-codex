const { defineConfig } = require( 'vite' );
const path = require( 'path' );
const rawSvg = require( './vite-plugin-raw-svg' );
const typescript = require( '@rollup/plugin-typescript' );

// https://vitejs.dev/config/
module.exports = defineConfig( {
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
		typescript( {
			tsconfig: './tsconfig-build.json'
		} )
	]
} );
