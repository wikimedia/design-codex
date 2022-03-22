import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import rtlcss from 'rtlcss';
import postcssRtlcss from 'postcss-rtlcss';
import { Plugin as PostCSSPlugin } from 'postcss';
import postcssBaseConfig from './postcss-base.config';

// https://vitejs.dev/config/
export default defineConfig( ( { command, mode } ) => {
	// We run the build twice: first with --mode=rtl, then without.
	// The --mode=rtl build builds the RTL version of the stylesheet, flipped using rtlcss,
	// and puts it at codex.style-rtl.css
	const isRtlBuild = command === 'build' && mode === 'rtl';

	const postcssConfig = postcssBaseConfig;
	if ( isRtlBuild ) {
		// Add rtlcss to the beginning of the plugins list, before autoprefixer,
		// otherwise things break
		postcssConfig.plugins.unshift( rtlcss( {
			useCalc: true
		} as rtlcss.ConfigOptions ) );
	} else if ( command === 'serve' ) {
		// In dev mode, use postcss-rtlcss instead, so that the direction switcher works
		// Add it to the beginning of the plugins list, before autoprefixer, otherwise things break
		postcssConfig.plugins.unshift( postcssRtlcss( {
			useCalc: true,
			processKeyFrames: true,
			safeBothPrefix: true
		} ) );
	}

	return {
		build: {
			// The es2015 build target doesn't include Safari 11-14, but we do support those
			// browsers. Including them here is important, because otherwise esbuild's CSS minifier
			// will output CSS that uses the 'inset:' property, which isn't supported in Safari 14
			// and below.
			target: [ 'es2015', 'safari11' ],
			minify: true,
			// Since we run Vite twice, don't empty the dist directory in between runs
			// We do this in the build command in package.json instead
			emptyOutDir: false,

			lib: {
				name: 'codex',
				entry: path.resolve( __dirname, 'src/lib.ts' ),
				formats: [ 'es', 'umd' ]
			},

			rollupOptions: {
				output: {
					entryFileNames: 'codex.[format].js',
					assetFileNames: isRtlBuild ? 'codex.[name]-rtl.[ext]' : 'codex.[name].[ext]',
					globals: {
						vue: 'Vue'
					}
				},

				external: [ 'vue' ]
			}
		},
		css: {
			// This type assertion is needed because Vite's types expect the stricter Plugin type
			// from PostCSS here, but what we have is the more permissive AcceptedPlugin type
			postcss: postcssConfig as { plugins: PostCSSPlugin[] }
		},
		plugins: [
			vue()
		]
	};
} );
