import { defineConfig } from 'vite';
import codexBaseConfig from '../codex/vite-base.config';

module.exports = defineConfig( ( env ) => {
	return codexBaseConfig( env, {
		libName: 'codex-search'
	} );
} );
