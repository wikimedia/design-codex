/**
 * PostCSS config for the Codex docs site based on VitePress. This adds the rtlcss plugin, but
 * applies it only to files imported from the Codex package and to demo files, not to any other
 * files in the docs package.
 *
 * Note this PostCSS config is ONLY used for building the VitePress docs site. It is NOT used for
 * building the 'codex-demos.*.css' files; those use a separate PostCSS config provided by build.mjs
 * (see also build/utils.mjs in the Codex package).
 */
import autoprefixer from 'autoprefixer';
import postcssRtlcss from 'postcss-rtlcss';
import scoped from './postcss-plugin-scoped.js';
import { postcssIsolateStyles } from 'vitepress';

export default {
	plugins: [
		postcssIsolateStyles( {
			// Don't include styles from these files inside elements with class `.vp-raw`. This is
			// used to prevent styles for the docs site from polluting the demo pane (see T296106).
			// This targets VitePress's vp-doc.css and base.css files, and our custom.css file.
			includeFiles: [ /vp-doc\.css/, /base\.css/, /custom\.css/ ]
		} ),
		scoped( {
			// Apply rtlcss to the Codex components so that we can demonstrate them in LTR or RTL.
			// The component demo examples are never shown in RTL, but they also need to have
			// rtlcss applied to them so that their CSS selectors' specificity is enhanced to
			// match the selectors from Codex they're overriding.
			include: [ '../codex/**', 'component-demos/**/examples/**' ],
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			plugin: postcssRtlcss( {
				useCalc: true,
				processKeyFrames: true,
				safeBothPrefix: true
			} )
		} ),
		autoprefixer()
	]
};
