import { Plugin } from 'vite';
import postcss from 'postcss';
import postcssPluginRemoveBidi from './postcss-plugin-remove-bidi';

type SplitBidiOptions = {
	ltrPrefix?: string,
	rtlPrefix?: string,
	bothPrefix?: string,
	processKeyFrames?: boolean
};

/**
 * Vite plugin that splits bidirectional CSS files into a file for LTR and a file for RTL.
 * For example, if style.css is generated as bidirectional CSS, this plugin will output
 * CSS for LTR into style.css instead, and output CSS for RTL into style-rtl.css.
 *
 * This plugin assumes that the postcss-rtlcss plugin is used. The same options passed to the
 * postcss-rtlcss plugin must be passed to this plugin as well. Internally, this uses a custom
 * PostCSS plugin (postcss-plugin-remove-bidi) to transform the output of postcss-rtlcss into
 * LTR or RTL styles by stripping the `[dir=ltr]` and `[dir=rtl]` selectors accordingly.
 *
 * FIXME: This is very hacky, and in the future we should consider whether there are less fragile
 * approaches we can use here. Ideally, we would use RTLCSS (not postcss-rtlcss but the underlying
 * software) to generate RTL versions of the CSS output, but unfortunately the `transform()` hook
 * runs too early (before Less->CSS transformation) and the `generateBundle()` hook runs too late
 * (after minification, so directive comments like `/*rtl:ignore* /` are stripped). Perhaps we could
 * use a PostCSS plugin (which runs after Less->CSS) to RTLCSS each file and transform it to
 * something like BEGIN_MARKER ltr css MIDDLE_MARKER rtl css END_MARKER (using markers that survive
 * minification), then extract the LTR and RTL styles by unwrapping the markers in
 * `generateBundle()`.
 *
 * @param pluginOptions Values passed to postcss-rtlcss
 * @return Plugin
 */
export default function splitBidi( pluginOptions: SplitBidiOptions = {} ) : Plugin {
	const {
		ltrPrefix = '[dir=ltr]',
		rtlPrefix = '[dir=rtl]',
		bothPrefix = '[dir]',
		processKeyFrames = false
	} = pluginOptions;
	return {
		name: 'rtl-css',
		enforce: 'post',
		apply: 'build',
		async generateBundle( options, bundle ) {
			// Transform every generated .css file to LTR, and add an -rtl.css file.
			for ( const file of Object.values( bundle ) ) {
				if ( file.type === 'asset' && file.fileName.endsWith( '.css' ) ) {
					const decodedSource = typeof file.source === 'string' ?
						file.source :
						Buffer.from( file.source ).toString( 'utf-8' );

					// Generate LTR and RTL versions by stripping rules for the wrong
					// directionality.
					const ltrSource = ( await postcss( [
						postcssPluginRemoveBidi( {
							removeSelectorPrefixes: [ rtlPrefix ],
							trimSelectorPrefixes: [ ltrPrefix, bothPrefix ],
							removeKeyFramesSuffixes: processKeyFrames ? [ '-rtl' ] : []
						} )
					] ).process( decodedSource ) ).css;

					const rtlSource = ( await postcss( [
						postcssPluginRemoveBidi( {
							removeSelectorPrefixes: [ ltrPrefix ],
							trimSelectorPrefixes: [ rtlPrefix, bothPrefix ],
							removeKeyFramesSuffixes: processKeyFrames ? [ '-ltr' ] : []
						} )
					] ).process( decodedSource ) ).css;

					// Overwrite the bidirectional .css file with LTR styles.
					file.source = ltrSource;
					// Emit a new -rtl.css file with RTL styles.
					this.emitFile( {
						type: 'asset',
						fileName: file.fileName.replace( /\.css$/, '-rtl.css' ),
						source: rtlSource
					} );
				}
			}
		}
	};
}
