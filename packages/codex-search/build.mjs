import { resolve } from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath( /** @type {url.URL} */ ( new URL( '.', import.meta.url ) ) );

import { generateCodexBundle } from '../codex/build/utils.mjs';
import vue from '@vitejs/plugin-vue';

generateCodexBundle( 'codex-search', {
	build: {
		target: [ 'es2015', 'edge18', 'safari11' ],

		lib: {
			name: 'codex-search',
			fileName: 'codex-search',
			entry: resolve( __dirname, 'src/lib.ts' ),
			formats: [ 'es', 'umd' ]
		},

		rollupOptions: {
			output: {
				assetFileNames: 'codex-search.[name].[ext]',
				globals: { vue: 'Vue' }
			},
			external: [ 'vue' ]
		}
	},

	plugins: [ vue() ],

	resolve: {
		alias: [
			{
				find: /^@wikimedia\/codex-design-tokens\/(dist\/)?theme-wikimedia-ui\.less$/,
				replacement: resolve( __dirname, '../codex-design-tokens/dist/theme-wikimedia-ui.less' )
			}
		]
	}
} );
