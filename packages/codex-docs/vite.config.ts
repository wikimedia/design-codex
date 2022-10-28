import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig( {
	resolve: {
		alias: {
			'@wikimedia/codex': '../codex/src/lib-wip.ts'
		}
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
