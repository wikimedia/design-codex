/**
 * PostCSS config for the Codex docs site based on VitePress. This adds the rtlcss plugin, but
 * applies it only to files imported from the Codex package and to demo files, not to any other
 * files in the docs package.
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
			// Apply rtlcss  to the Codex components so that we can demonstrate them in LTR or RTL.
			// The component demo examples are never shown in RTL, but they also need to have
			// rtlcss applied to them so that their CSS selectors' specificity is enhanced to
			// match the selectors from Codex they're overriding.
			include: [ '../codex/**', 'component-demos/**/examples/**' ],
			plugin: postcssRtlcss( {
				useCalc: true,
				processKeyFrames: true,
				safeBothPrefix: true
			} )
		} ),
		autoprefixer()
	]
};
