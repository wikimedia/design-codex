const { defineConfig } = require( 'vite' );
const path = require( 'path' );
const copyFiles = require( './vite-plugin-copy-files' );
const codexBaseConfig = require( './vite-base.config' );

module.exports = defineConfig( ( env ) => {
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
				srcDir: path.resolve( 'src', 'themes', 'mixins', 'public' ),
				destDir: path.resolve( 'dist', 'mixins' )
			} )
		]
	};
} );
