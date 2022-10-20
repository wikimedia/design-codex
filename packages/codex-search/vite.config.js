const { defineConfig } = require( 'vite' );
const codexBaseConfig = require( '../codex/vite-base.config' );

module.exports = defineConfig( ( env ) => {
	return codexBaseConfig( env, {
		libName: 'codex-search'
	} );
} );
