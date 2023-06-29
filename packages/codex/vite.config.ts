import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postcssRtlcss from 'postcss-rtlcss';
import autoprefixer from 'autoprefixer';
import { codexIconNames } from './build/utils.mjs';

// See build.mjs for build settings; this file is only used during dev mode
export default defineConfig( ( { command } ) => {
	if ( command === 'serve' ) {
		return {
			base: `${process.env.CODEX_DOC_ROOT || ''}/sandbox/`,

			plugins: [ vue() ],

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
							// @codexIconNames is used in IconGrid.vue
							codexIconNames
						}
					}
				}
			},

			resolve: {
				alias: [
					{
						find: /^@wikimedia\/codex-design-tokens\/(dist\/)?theme-wikimedia-ui\.less$/,
						replacement: resolve( __dirname, '../codex-design-tokens/dist/theme-wikimedia-ui.less' )
					}
				]
			}
		};
	} else {
		return {};
	}
} );
