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
const libraryConfig = mergeConfig( baseConfig, {
	build: {
		lib: {
			name: 'codex',
			fileName: 'codex',
			entry: { codex: resolve( __dirname, 'src/lib.ts' ) },
			formats: [ 'es', 'cjs', 'umd' ]
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

// build the sandbox
// TODO improve TypeScript config so that we can use top-level await
// eslint-disable-next-line @typescript-eslint/no-floating-promises
build( {
	configFile: false,
	mode: 'sandbox',
	...sandboxConfig
} );

// build the Codex bundles
// eslint-disable-next-line @typescript-eslint/no-floating-promises
generateCodexBundle( libraryConfig );
// eslint-disable-next-line @typescript-eslint/no-floating-promises
generateCodexBundle( splitConfig );
