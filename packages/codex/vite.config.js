const { defineConfig } = require( 'vite' );
const vue = require( '@vitejs/plugin-vue' ).default;
const rtlcss = require( 'rtlcss' );
const postcssRtlcss = require( 'postcss-rtlcss' );
const postcssBaseConfig = require( './postcss-base.config' );
const fs = require( 'fs' );
const path = require( 'path' );

// https://vitejs.dev/config/
// Take an extra libName parameter so it can be customized in packages/codex-search/vite.config.ts
module.exports = defineConfig( ( { command, mode }, libName = 'codex' ) => {
	// In library mode, we run the build twice: first with --mode=rtl, then without.
	// The --mode=rtl build builds the RTL version of the stylesheet, flipped using rtlcss,
	// and puts it at codex.style-rtl.css
	const isRtlBuild = command === 'build' && mode === 'rtl';

	const postcssConfig = postcssBaseConfig;
	if ( isRtlBuild ) {
		// Add rtlcss to the beginning of the plugins list, before autoprefixer,
		// otherwise things break
		postcssConfig.plugins.unshift( rtlcss( /** @type {rtlcss.ConfigOptions} */ ( {
			useCalc: true
		} ) ) );
	} else if ( command === 'serve' || mode === 'sandbox' ) {
		// For the sandbox (in dev mode or in build mode), use postcss-rtlcss instead, so that the
		// direction switcher works. Add it to the beginning of the plugins list, before
		// autoprefixer, otherwise things break.
		postcssConfig.plugins.unshift( postcssRtlcss( {
			useCalc: true,
			processKeyFrames: true,
			safeBothPrefix: true
		} ) );
	}

	// Common config shared between the library build and the sandbox build
	/** @type {Partial<import('vite').UserConfig>} */
	const commonConfig = {
		server: {
			// Listen on all IP addresses, in case Vite is run inside a VM
			host: '0.0.0.0'
		},
		build: {
			// The es2015 build target doesn't
			// - include Edge 18, but we do support it in our Modern support browser group and it
			//   enables output of design-first `rgba()` over RGBA hexadecimal color notation.
			// - include Safari 11-14, but we do support those
			//   browsers. Including them here is important, because otherwise esbuild's CSS
			//   minifier will output CSS that uses the 'inset:' property, which isn't supported in
			//   Safari 14 and below.
			target: [ 'es2015', 'edge18', 'safari11' ],
			minify: true

		},
		css: {
			postcss: postcssConfig
		},
		plugins: [
			vue(),
			{
				// A basic Vite plugin which copies any public Less mixins in a pre-defined
				// directory, and copies them unchanged into dist/mixins
				name: 'copyPublicLessMixins',

				// Use the Rollup writeBundle() hook to ensure that bundle files
				// have been written to disk
				writeBundle( options ) {
					const inputDir = path.resolve( 'src', 'themes', 'mixins', 'public' );
					const outputDir = path.resolve( ( options.dir || 'dist' ), 'mixins' );

					// create the mixins sub-directory if it does not yet exist
					if ( !( fs.existsSync( outputDir ) ) ) {
						fs.mkdirSync( outputDir );
					}

					// copy any files inside of the public mixins directory
					// into the mixins dist directory
					if ( fs.existsSync( inputDir ) ) {
						fs.readdirSync( inputDir ).forEach( ( file ) => {
							fs.copyFileSync(
								path.resolve( inputDir, file ),
								path.resolve( outputDir, file )
							);
						} );
					}
				}
			}
		]
	};

	if ( mode === 'sandbox' ) {
		// Don't build the library, only build the sandbox (index.html)
		return {
			...commonConfig,

			// Allow the sandbox to be published underneath the documentation website,
			// under /sandbox. See also the Vitepress config in the codex-docs package
			// for how CODEX_DOC_ROOT is used there.
			base: `${process.env.CODEX_DOC_ROOT || ''}/sandbox/`,

			build: {
				...commonConfig.build,
				outDir: 'dist/sandbox'
			}
		};
	}

	// Regular library build
	return {
		...commonConfig,

		build: {
			...commonConfig.build,

			// Since we run Vite twice, don't empty the dist directory in between runs
			// We do this in the build command in package.json instead.
			emptyOutDir: false,

			lib: {
				name: libName,
				entry: 'src/lib.ts',
				formats: [ 'es', 'umd' ]
			},

			rollupOptions: {
				output: {
					entryFileNames: `${libName}.[format].js`,
					assetFileNames: isRtlBuild ? `${libName}.[name]-rtl.[ext]` : `${libName}.[name].[ext]`,
					globals: {
						vue: 'Vue'
					}
				},

				external: [ 'vue' ]
			}
		}
	};
} );
