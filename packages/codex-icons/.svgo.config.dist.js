/**
 * SVGO Configuration
 * Compatible to v4.0.0+
 * Recommended options from:
 * https://www.mediawiki.org/wiki/Manual:Coding_conventions/SVG#Exemplified_safe_configuration
 */

import baseConfig from './.svgo.config.js';
import removeWhitespaceInTitle from './svgo-plugin-removeWhitespaceInTitle.js';

/** @type {import('svgo').Config} */
export default {
	...baseConfig,
	plugins: [
		...( baseConfig.plugins ?? [] ),
		removeWhitespaceInTitle
	]
};
