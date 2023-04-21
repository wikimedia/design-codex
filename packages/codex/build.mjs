import { resolve } from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath( new URL( '.', import.meta.url ) );

import { build, mergeConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import copyFiles from './vite-plugin-copy-files.mjs';
import autoprefixer from 'autoprefixer';
import postcssRtlcss from 'postcss-rtlcss';
import { generateCodexBundle } from './build/utils.mjs';

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
	build: { outDir: 'dist/sandbox' },
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
		}
	}
} );

const libraryConfig = mergeConfig( baseConfig, {
	build: {
		lib: {
			name: 'codex',
			fileName: 'codex',
			entry: resolve( __dirname, 'src/lib.ts' ),
			formats: [ 'es', 'umd' ]
		},
		rollupOptions: {
			output: {
				assetFileNames: 'codex.[name].[ext]',
				globals: { vue: 'Vue' }
			},
			external: [ 'vue' ]
		}
	}
} );

// build the sandbox
build( {
	configFile: false,
	mode: 'sandbox',
	...sandboxConfig
} );

// build the Codex bundles
generateCodexBundle( 'codex', libraryConfig );
