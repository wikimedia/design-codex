/**
 * PostCSS config for the Codex docs site based on VitePress. This adds the rtlcss plugin, but
 * applies it only to files imported from the Codex package, not to files in the docs package.
 *
 * Note this PostCSS config is ONLY used for building the VitePress docs site. It is NOT used for
 * building the 'codex-demos.*.css' files; those use 'postcss-base.config.js' from the Codex package
 * instead, see also 'packages/codex-docs/vite.config.ts'.
 */
const autoprefixer = require( 'autoprefixer' );
const postcssRtlcss = require( 'postcss-rtlcss' );
const scoped = require( './postcss-plugin-scoped' );

module.exports = {
	/** @type {import('postcss').AcceptedPlugin[]} */
	plugins: [
		scoped( {
			include: '../codex/**',
			plugin: postcssRtlcss( {
				useCalc: true,
				processKeyFrames: true,
				safeBothPrefix: true
			} )
		} ),
		autoprefixer()
	]
};
