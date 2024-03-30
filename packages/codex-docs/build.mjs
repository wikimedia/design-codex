import { resolve } from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath( /** @type {url.URL} */ ( new URL( '.', import.meta.url ) ) );

import generateCodexBundle from '../codex/build/generateCodexBundle.mjs';
import vue from '@vitejs/plugin-vue';

await generateCodexBundle( {
	build: {
		target: [ 'es2015', 'edge18', 'safari11' ],

		lib: {
			fileName: 'codex-demos',
			entry: resolve( __dirname, 'src/lib.ts' ),
			formats: [ 'es', 'cjs' ]
		},

		rollupOptions: {
			external: [ 'vue' ],
			output: {
				assetFileNames: 'codex-demos.[name]'
			}
		}
	},

	esbuild: {
		logOverride: {
			// Suppress nonsensical CSS syntax errors; esbuild appears to consider every attribute
			// selector a syntax error
			'css-syntax-error': 'silent'
		}
	},

	plugins: [ vue() ],

	resolve: {
		alias: [
			{
				find: /^@wikimedia\/codex-design-tokens\/(dist\/)?theme-wikimedia-ui\.less$/,
				replacement: resolve( __dirname, '../codex-design-tokens/dist/theme-wikimedia-ui.less' )
			},
			{
				find: '@wikimedia/codex',
				replacement: '../codex/src/lib-wip.ts'
			}
		]
	}
} );
