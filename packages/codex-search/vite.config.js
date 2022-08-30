const { defineConfig } = require( 'vite' );
const codexViteConfig = require( '../codex/vite.config' );

/** @typedef {import('vite').ConfigEnv} ConfigEnv */
/** @typedef {import('vite').UserConfig} UserConfig */

// codexViteConfig has the generic UserConfigExport type, but we know that it's actually this
// more specific type with a second parameter
/** @typedef {(env: ConfigEnv, name: string ) => UserConfig} BaseConfig */

module.exports = defineConfig( ( env ) => {
	const baseConfigFn = /** @type {BaseConfig} */ ( codexViteConfig );
	return baseConfigFn( env, 'codex-search' );
} );
