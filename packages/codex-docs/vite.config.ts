/**
 * Vite config for building all the demos as one library file. This builds
 * 'dist/codex-demos.js' and friends.
 *
 * For the Vite config used by the Codex docs site based on VitePress, see 'docs/vite.config.ts'.
 */

import { defineConfig, Alias } from 'vite';
import codexBaseConfig from '../codex/vite-base.config';

export default defineConfig( ( env ) => {
	const baseConfig = codexBaseConfig( env, {
		libName: 'codex-demos'
	} );

	return {
		...baseConfig,
		resolve: {
			...baseConfig.resolve,
			alias: [
				...( baseConfig.resolve?.alias || [] ) as Alias[],
				{
					// Use the experimental entry point so that work-in-progress (WIP) components
					// are available.
					find: '@wikimedia/codex',
					replacement: '../codex/src/lib-wip.ts'
				}
			]
		}
	};
} );
