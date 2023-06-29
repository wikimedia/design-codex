import { resolve } from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath( /** @type {url.URL} */ ( new URL( '.', import.meta.url ) ) );

import { build, mergeConfig } from 'vite';
import autoprefixer from 'autoprefixer';
import rtlcss from 'rtlcss';

/**
 * Build Codex (or a sub-set of it) as a set of bundled library files
 * with additional CSS files to support the following modes:
 * - rtl
 * - legacy (14px base font size)
 * - legacy-rtl
 *
 * @param {string} bundleName Base file name for all generated assets
 * @param {import('vite').UserConfig} bundleConfig build-specific config
 */
export async function generateCodexBundle( bundleName, bundleConfig = {} ) {
	// The "modes" that our library bundles need to support are defined here.
	/* eslint-disable no-multi-spaces */
	const MODES = [
		'',             // default mode
		'rtl',          // RTL stylesheet
		'legacy',       // Legacy (14px base) stylesheet
		'legacy-rtl'    // RTL 14px base stylesheet
	];
	/* eslint-enable no-multi-spaces */

	// Run the multi-modal library build, overriding the provided config where
	// necessary with mode-specific options
	MODES.forEach( ( mode ) => {
		/** @type {import('vite').UserConfig} */
		let overrides = {};

		switch ( mode ) {
			case '':
				overrides = {
					css: {
						postcss: { plugins: [ autoprefixer() ] }
					}
				};
				break;
			case 'legacy':
				overrides = {
					css: {
						postcss: { plugins: [ autoprefixer() ] }
					},
					build: {
						rollupOptions: {
							output: { assetFileNames: `${bundleName}.[name]-legacy.[ext]` }
						}
					},
					resolve: {
						alias: [
							{
								find: /^@wikimedia\/codex-design-tokens\/(dist\/)?theme-wikimedia-ui\.less$/,
								replacement: resolve( __dirname, '../../codex-design-tokens/dist/theme-wikimedia-ui-legacy.less' )
							}
						]
					}
				};
				break;
			case 'rtl':
				overrides = {
					css: {
						postcss: {
							plugins: [
								rtlcss( /** @type {rtlcss.ConfigOptions} */ ( { useCalc: true } ) ),
								autoprefixer()
							]
						}
					},
					build: {
						rollupOptions: {
							output: { assetFileNames: `${bundleName}.[name]-rtl.[ext]` }
						}
					}
				};
				break;
			case 'legacy-rtl':
				overrides = {
					css: {
						postcss: {
							plugins: [
								rtlcss( /** @type {rtlcss.ConfigOptions} */ ( { useCalc: true } ) ),
								autoprefixer()
							]
						}
					},
					build: {
						rollupOptions: {
							output: { assetFileNames: `${bundleName}.[name]-legacy-rtl.[ext]` }
						}
					},
					resolve: {
						alias: [
							{
								find: /^@wikimedia\/codex-design-tokens\/(dist\/)?theme-wikimedia-ui\.less$/,
								replacement: resolve( __dirname, '../../codex-design-tokens/dist/theme-wikimedia-ui-legacy.less' )
							}
						]
					}
				};
				break;
		}

		// No matter what other config has been provided, we want to ensure that
		// the emtpyOutDir: false setting is preserved since multiple builds
		// could be running in the same location.
		const buildConfig = mergeConfig( bundleConfig, { build: { emptyOutDir: false } } );

		// Apply any mode-specific overrides (RTL, legacy styles, etc)
		const finalConfig = mergeConfig( buildConfig, overrides );

		// Run the Vite build
		build( {
			configFile: false,
			mode: mode,
			...finalConfig
		} );
	} );
}
