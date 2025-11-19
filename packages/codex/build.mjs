import { resolve } from 'path';
import * as url from 'url';
import { build, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copyFiles from './vite-plugin-copy-files.mjs';
import autoprefixer from 'autoprefixer';
import postcssRtlcss from 'postcss-rtlcss';
import { codexIconNames, getLibEntries } from './build/utils.mjs';
import generateCodexBundle from './build/generateCodexBundle.mjs';
import emitAllowlist from './build/vite-plugin-emit-allowlist.mjs';
import { readdirSync } from 'fs';

const __dirname = url.fileURLToPath( /** @type {url.URL} */ ( new URL( '.', import.meta.url ) ) );

const libEntries = getLibEntries();

/** @type {import('vite').UserConfig} */
const baseConfig = {
	build: {
		target: [ 'es2017', 'edge79', 'safari11' ]
	},

	esbuild: {
		logOverride: {
			// Suppress nonsensical CSS syntax errors; esbuild appears to consider every attribute
			// selector a syntax error
			'css-syntax-error': 'silent'
		}
	},

	plugins: [
		vue( {
			// Remove comments from the output (T354394).
			// Not sure why this isn't set by default, Vite should be setting this when 'mode'
			// is set to 'production'.
			template: {
				compilerOptions: {
					comments: false
				}
			}
		} ),

		copyFiles( {
			srcDir: resolve( 'src', 'themes', 'mixins', 'public' ),
			destDir: resolve( 'dist', 'mixins' )
		} ),

		// Copy the 'wip' directory as well. Keeping it under 'dist/mixins/wip'
		// keeps the work-in-progress files separated from the public mixins.
		copyFiles( {
			srcDir: resolve( 'src', 'themes', 'mixins', 'wip' ),
			destDir: resolve( 'dist', 'mixins', 'wip' )
		} )
	],

	resolve: {
		alias: [
			{
				find: /^@wikimedia\/codex-design-tokens\/(dist\/)?theme-wikimedia-ui\.less$/,
				replacement: resolve( __dirname, '../codex-design-tokens/dist/theme-wikimedia-ui.less' )
			}
		]
	}
};

const demoFiles = readdirSync( resolve( __dirname, 'demos' ) )
	.filter( ( file ) => file.endsWith( '.html' ) )
	.map( ( file ) => resolve( __dirname, 'demos', file ) );

const sandboxConfig = mergeConfig( baseConfig, {
	// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
	base: `${ process.env.CODEX_DOC_ROOT || '' }/sandbox/`,
	build: {
		outDir: 'dist/sandbox',
		rollupOptions: {
			input: [
				resolve( __dirname, 'index.html' ),
				...demoFiles
			]
		}
	},
	css: {
		postcss: {
			plugins: [
				postcssRtlcss( {
					useCalc: true,
					processKeyFrames: true,
					safeBothPrefix: true
				} ),

				autoprefixer()
			]
		},
		preprocessorOptions: {
			less: {
				globalVars: {
					// @codexIconNames is used in IconDemo.vue
					codexIconNames
				}
			}
		}
	}
} );

// Build the complete library
const baseLibraryConfig = mergeConfig( baseConfig, {
	build: {
		lib: {
			name: 'codex',
			fileName: 'codex',
			// For backwards compatibility, keep the style file name as codex.style.css
			// This was not configurable prior to Vite 6
			cssFileName: 'codex.style',
			entry: { codex: resolve( __dirname, 'src/lib.ts' ) }
			// formats are added separately below
		},

		rollupOptions: {
			external: [ 'vue' ],
			output: {
				globals: { vue: 'Vue' }
			}
		}
	}
} );

// Don't minify the ES build, emit the js file
const unminifiedLibraryConfig = mergeConfig( baseLibraryConfig, {
	build: {
		lib: {
			formats: [ 'es' ]
		},
		minify: false
	},
	plugins: [
		emitAllowlist( [ 'js' ] )
	]
} );

// Minify the CJS and UMD builds, emit all files
const minifiedLibraryConfig = mergeConfig( baseLibraryConfig, {
	build: {
		lib: {
			formats: [ 'cjs', 'umd' ]
		}
	}
} );

// Build individual component modules for use inside of MediaWiki
const splitConfig = mergeConfig( baseConfig, {
	build: {
		manifest: true,
		cssCodeSplit: true,
		outDir: 'dist/modules',

		lib: {
			entry: libEntries,
			formats: [ 'cjs' ]
		},

		rollupOptions: {
			external: [ 'vue' ]
		}
	}
} );

// build the sandbox
await build( {
	configFile: false,
	mode: 'sandbox',
	...sandboxConfig
} );

// Build the Codex bundles
await generateCodexBundle( unminifiedLibraryConfig );
await generateCodexBundle( minifiedLibraryConfig );
await generateCodexBundle( splitConfig );
