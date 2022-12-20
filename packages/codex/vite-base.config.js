/**
 * This file contains Vite config that is shared between the codex and codex-search packages.
 */

const rtlcss = require( 'rtlcss' );
const vue = require( '@vitejs/plugin-vue' ).default;
const postcssRtlcss = require( 'postcss-rtlcss' );
const path = require( 'path' );
const postcssBaseConfig = require( './postcss-base.config' );

/* eslint-disable jsdoc/multiline-blocks */

/** @typedef {{
 *    libName: string|null,
 *    forceBidiCss?: boolean
 * }} ViteBaseConfigOptions
 */

/**
 * @param {import('vite').ConfigEnv} env
 * @param {ViteBaseConfigOptions} options
 * @return {import('vite').UserConfig}
 */
module.exports = function ( { command, mode }, options ) {
	const {
		libName,
		forceBidiCss = false
	} = options;

	// We run the build four times: with --mode=legacy-rtl, --mode=legacy, --mode=rtl,
	// and without --mode.
	// The legacy modes build the legacy version of the stylesheet, using the legacy theme
	// from the design tokens package. The RTL modes build the RTL versions of the stylesheet,
	// flipped using rtlcss. The resulting files are named codex.style-legacy-rtl.css,
	// codex.style-legacy.css, codex.style-rtl.css and codex.style.css respectively.
	const isRtlBuild = command === 'build' && ( mode === 'rtl' || mode === 'legacy-rtl' );
	const isLegacyBuild = command === 'build' && ( mode === 'legacy' || mode === 'legacy-rtl' );
	const dashLegacy = isLegacyBuild ? '-legacy' : '';

	const postcssConfig = postcssBaseConfig;
	if ( command === 'serve' || forceBidiCss ) {
		// In serve mode, use postcss-rtlcss, so that the direction switcher works.
		// Add it to the beginning of the plugins list, before autoprefixer, otherwise things break.
		postcssConfig.plugins.unshift( postcssRtlcss( {
			useCalc: true,
			processKeyFrames: true,
			safeBothPrefix: true
		} ) );
	} else if ( isRtlBuild ) {
		// Add rtlcss to the beginning of the plugins list, before autoprefixer,
		// otherwise things break
		postcssConfig.plugins.unshift( rtlcss( /** @type {rtlcss.ConfigOptions} */ ( {
			useCalc: true
		} ) ) );
	}

	// Options for the library build. Omitted if libName is set to null.
	/** @type {Partial<import('vite').BuildOptions>} */
	const libraryBuildOptions = libName !== null ? {
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
				assetFileNames: isRtlBuild ? `${libName}.[name]${dashLegacy}-rtl.[ext]` : `${libName}.[name]${dashLegacy}.[ext]`,
				globals: {
					vue: 'Vue'
				}
			},

			external: [ 'vue' ]
		}
	} : {};

	return {
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
			minify: true,

			// If libName=null, libraryBuildOptions will be an empty object
			...libraryBuildOptions
		},
		css: {
			postcss: postcssConfig
		},
		plugins: [
			vue()
		],
		resolve: {
			alias: [
				// Alias imports of the tokens file (theme-wikimedia-ui.less) to the
				// appropriate file: either theme-wikimedia-ui.less in non-legacy mode, or
				// theme-wikimedia-ui-legacy.less in legacy mode.
				// TODO: Reconsider this approach when we build a proper theme system
				// (Even if we didn't need to support legacy mode, or did it differently,
				// we'd still need an alias like this, because paths without dist/ need to be
				// aliased to add dist/ .)
				{
					find: /^@wikimedia\/codex-design-tokens\/(dist\/)?theme-wikimedia-ui\.less$/,
					replacement: path.resolve( __dirname, `../codex-design-tokens/dist/theme-wikimedia-ui${dashLegacy}.less` )
				}
			]
		}
	};
};
