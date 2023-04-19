/** @typedef {import('vite').FilterPattern} FilterPattern */
/** @typedef {import('postcss').Plugin} Plugin */
/** @typedef {{ include?: FilterPattern, exclude?: FilterPattern, plugin: Plugin }} PluginOptions */

const { createFilter } = require( 'vite' );

/**
 * @param {PluginOptions} options
 * @return {Plugin}
 */
module.exports = ( options ) => {
	const filter = createFilter( options.include, options.exclude );
	return {
		postcssPlugin: 'scoped-plugin-' + options.plugin.postcssPlugin,
		prepare( result ) {
			const filename = result.root.source && result.root.source.input.file;
			if ( filter( filename ) ) {
				return options.plugin.prepare ?
					{ ...options.plugin, ...options.plugin.prepare( result ) } :
					options.plugin;
			}
			return {};
		}
	};
};
