import { resolve } from 'path';
import * as url from 'url';
import { build, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copyFiles from './vite-plugin-copy-files.mjs';
import autoprefixer from 'autoprefixer';
import postcssRtlcss from 'postcss-rtlcss';
import { codexIconNames, getComponentEntryPoints } from './build/utils.mjs';
import generateCodexBundle from './build/generateCodexBundle.mjs';

const __dirname = url.fileURLToPath( /** @type {url.URL} */ ( new URL( '.', import.meta.url ) ) );
const componentMap = getComponentEntryPoints( resolve( __dirname, 'src', 'components' ) );

/** @type {import('vite').UserConfig} */
const baseConfig = {
	build: {
		target: [ 'es2015', 'edge18', 'safari11' ]
	},

	plugins: [
		vue(),

		copyFiles( {
			srcDir: resolve( 'src', 'themes', 'mixins', 'public' ),
			destDir: resolve( 'dist', 'mixins' )
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

const sandboxConfig = mergeConfig( baseConfig, {
	base: '/sandbox/',
	build: {
		outDir: 'dist/sandbox',
		rollupOptions: {
			input: {
				index: resolve( __dirname, 'index.html' ),
				icons: resolve( __dirname, 'demos', 'icons.html' )
			}
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
			entry: { codex: resolve( __dirname, 'src/lib.ts' ) }
			// formats are added separately below
		},

		rollupOptions: {
			external: [ 'vue' ],
			output: {
				assetFileNames: 'codex.[name]',
				globals: { vue: 'Vue' }
			}
		}
	}
} );
// Minify the CJS and UMD builds
const minifiedLibraryConfig = mergeConfig( baseLibraryConfig, {
	build: {
		lib: {
			formats: [ 'cjs', 'umd' ]
		}
	}
} );
// Don't minify the ES build
const unminifiedLibraryConfig = mergeConfig( baseLibraryConfig, {
	build: {
		lib: {
			formats: [ 'es' ]
		},
		minify: false
	}
} );

// Build individual component modules for use inside of MediaWiki
const splitConfig = mergeConfig( baseConfig, {
	build: {
		manifest: true,
		cssCodeSplit: true,
		outDir: 'dist/modules',

		lib: {
			entry: { ...componentMap },
			formats: [ 'cjs' ]
		},

		rollupOptions: {
			external: [ 'vue' ],
			output: {
				assetFileNames: 'Cdx[name]'
			}
		}
	}
} );

const searchConfig = mergeConfig( baseConfig, {
	build: {
		lib: {
			name: 'codex-search',
			entry: { 'codex-search': resolve( __dirname, 'src/lib-search.ts' ) },
			formats: [ 'es', 'cjs' ]
		},

		rollupOptions: {
			external: [ 'vue' ],
			output: {
				assetFileNames: 'codex-search.[name]'
			}
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
// Build the unminified files first and the minified files second, otherwise
// the minified CSS files are overwritten with unminified ones
await generateCodexBundle( unminifiedLibraryConfig );
await generateCodexBundle( minifiedLibraryConfig );
await generateCodexBundle( splitConfig );
await generateCodexBundle( searchConfig );
