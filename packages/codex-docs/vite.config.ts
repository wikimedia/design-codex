import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig( {
	resolve: {
		alias: [
			{
				// Use the experimental entry point so that work-in-progress (WIP) components are
				// available.
				find: '@wikimedia/codex',
				replacement: '../codex/src/lib-wip.ts'
			},

			{
				// Alias imports without /dist/ from codex-design-tokens to the dist/ directory.
				find: /^@wikimedia\/codex-design-tokens\/([^/]+\.(less|css|scss|json))$/,
				replacement: resolve( __dirname, '../codex-design-tokens/dist/$1' )
			}
		]
	},

	build: {
		emptyOutDir: false,

		lib: {
			fileName: 'codex-demos',
			name: 'codex-demos',
			entry: 'src/lib.ts',
			formats: [ 'es', 'cjs' ]
		},

		rollupOptions: {
			output: {
				entryFileNames: 'codex-demos.[format].js',
				globals: {
					vue: 'Vue'
				}
			},

			// Codex is *not* externalized in this build, because we want to
			// ensure that experimental components (which are not yet part
			// of the published Codex release) can be used in demos.
			external: [ 'vue' ]
		},

		target: [ 'es2015', 'edge18', 'safari11' ],
		minify: true
	},

	plugins: [
		vue()
	]
} );
