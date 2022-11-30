import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig( {
	server: {
		/**
		 * Explicitly allow dev server to serve files from other workspaces and from the
		 * node_modules directory in the repo root.
		 */
		fs: { allow: [ '../../..' ] },
		// Listen on all IP addresses, in case Vite is run inside a VM
		host: '0.0.0.0'
	},

	build: {
		minify: true
	},

	resolve: {
		alias: [
			// Alias @ to the docs directory, so that import statements and <<< file inclusions
			// in the Markdown files in this directory can use the same paths
			{
				find: '@',
				replacement: resolve( __dirname, './../docs' )
			},
			// Alias @wikimedia/codex to the entry point file, so that import statements in
			// component demos look realistic, but hot reloading still works.
			// We use lib-wip.ts rather than lib.ts, so that components under development
			// can have demos too. Use a regex to target only the exact string '@wikimedia/codex',
			// otherwise this breaks imports like '@wikimedia/codex/foo'
			{
				find: /^@wikimedia\/codex$/,
				replacement: resolve( __dirname, '../../codex/src/lib-wip.ts' )
			},
			// Alias mixin imports to the source mixin files, so that hot module reloading works.
			{
				find: /^@wikimedia\/codex\/mixins\/(.*)$/,
				replacement: resolve( __dirname, '../../codex/src/themes/mixins/public/$1' )
			},
			// Alias imports without /dist/ from codex-design-tokens to the dist/ directory.
			// The published package has these files at the top level, but in development those
			// files aren't there because they're placed there by the prepublishOnly script.
			// Hot module reloading is provided by the doc:dev script watching the design tokens
			// source files and rebuilding the dist files when the source files change.
			{
				find: /^@wikimedia\/codex-design-tokens\/([^/]+\.(less|css|scss|json))$/,
				replacement: resolve( __dirname, '../../codex-design-tokens/dist/$1' )
			}
		]
	}

} );
