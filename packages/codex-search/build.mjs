import { resolve } from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath( /** @type {url.URL} */ ( new URL( '.', import.meta.url ) ) );

import generateCodexBundle from '../codex/build/generateCodexBundle.mjs';
import vue from '@vitejs/plugin-vue';

// TODO improve TypeScript config so that we can use top-level await
// eslint-disable-next-line @typescript-eslint/no-floating-promises
generateCodexBundle( {
	build: {
		target: [ 'es2015', 'edge18', 'safari11' ],

		lib: {
			fileName: 'codex-search',
			entry: resolve( __dirname, 'src/lib.ts' ),
			formats: [ 'es', 'cjs' ]
		},

		rollupOptions: {
			external: [ 'vue' ],
			output: {
				assetFileNames: 'codex-search.[name]'
			}
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
