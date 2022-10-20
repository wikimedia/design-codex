import { defineConfig } from 'vite';
import { resolve } from 'path';
import copyFiles from './vite-plugin-copy-files';
import codexBaseConfig from './vite-base.config';

export default defineConfig( ( env ) => {
	const baseConfig = codexBaseConfig( env, {
		// For --mode=sandbox, only build the sandbox. Disable the library build, and force
		// postcss-rtlcss (bidirectional CSS) to be used
		libName: env.mode === 'sandbox' ? null : 'codex',
		forceBidiCss: env.mode === 'sandbox'
	} );

	if ( env.mode === 'sandbox' ) {
		// Don't build the library, only build the sandbox (index.html)
		return {
			...baseConfig,

			// Allow the sandbox to be published underneath the documentation website,
			// under /sandbox. See also the Vitepress config in the codex-docs package
			// for how CODEX_DOC_ROOT is used there.
			base: `${process.env.CODEX_DOC_ROOT || ''}/sandbox/`,

			build: {
				...baseConfig.build,
				outDir: 'dist/sandbox'
			}
		};
	}

	// Otherwise, build the library
	return {
		...baseConfig,
		plugins: [
			...( baseConfig.plugins || [] ),

			// Copy the Less mixins from the public directory to dist/mixins/
			copyFiles( {
				srcDir: resolve( 'src', 'themes', 'mixins', 'public' ),
				destDir: resolve( 'dist', 'mixins' )
			} )
		]
	};
} );
