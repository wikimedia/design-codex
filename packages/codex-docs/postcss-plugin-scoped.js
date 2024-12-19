/** @import { FilterPattern } from 'vite' */
/** @import { Plugin } from 'postcss' */

/** @typedef {{ include?: FilterPattern, exclude?: FilterPattern, plugin: Plugin }} PluginOptions */

import { createFilter } from 'vite';

/**
 * @param {PluginOptions} options
 * @return {Plugin}
 */
const scoped = function ( options ) {
	const filter = createFilter( options.include, options.exclude );
	return {
		postcssPlugin: 'scoped-plugin-' + options.plugin.postcssPlugin,
		prepare( result ) {
			const filename = result.root.source?.input.file;
			if ( filter( filename ) ) {
				return options.plugin.prepare ?
					{ ...options.plugin, ...options.plugin.prepare( result ) } :
					options.plugin;
			}
			return {};
		}
	};
};

export default scoped;
