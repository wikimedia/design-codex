import { ConfigEnv, defineConfig, UserConfig } from 'vite';
import codexViteConfig from '../codex/vite.config';

// codexViteConfig has the generic UserConfigExport type, but we know that it's actually this
// more specific type with a second parameter
type BaseConfig = ( env: ConfigEnv, name: string ) => UserConfig;

export default defineConfig( ( env ) => {
	const baseConfigFn = codexViteConfig as BaseConfig;
	return baseConfigFn( env, 'codex-search' );
} );
