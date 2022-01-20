import { Plugin } from 'vite';
import rtlcss from 'rtlcss';
import postcssRTLCSS from 'postcss-rtlcss';

const rtlcssOptions = {
	useCalc: true
};

/**
 * Vite plugin that generates RTL versions of all .css output files in build mode,
 * and serves bidirectional CSS in serve mode.
 *
 * @return Plugin
 */
export default function rtlCss() : Plugin {

	return {
		name: 'rtl-css',
		enforce: 'post',
		config( config, env ) {
			if ( env.command !== 'serve' ) {
				return;
			}
			// Use postcss-rtlcss only in serve mode (npm run dev)
			// This generates CSS like:
			// [ dir='ltr' ] .foo { padding-left: 4px; }
			// [ dir='rtl' ] .foo { padding-right: 4px; }
			return {
				css: {
					postcss: {
						plugins: [
							// FIXME this weird type assertion is needed here because we use
							// PostCSS 8.3.11, but Vite uses 8.4.5. This causes postcssRTLCSS() to
							// return a PostCSS 8.3 plugin but Vite to expect an 8.4 plugin, which
							// works in practice but the TypeScript types are not compatible.
							// We can't upgrade PostCSS because that would cause a stylelint crash,
							// see https://github.com/stylelint/stylelint/issues/5766
							postcssRTLCSS( rtlcssOptions ) as { postcssPlugin: string }
						]
					}
				}
			};
		},
		generateBundle( options, bundle ) {
			// This runs only in build mode (npm run build)
			// For every generated .css file, generate a corresponding -rtl.css file
			for ( const file of Object.values( bundle ) ) {
				if ( file.type === 'asset' && file.fileName.endsWith( '.css' ) ) {
					const ltrSource = typeof file.source === 'string' ?
						file.source :
						Buffer.from( file.source ).toString( 'utf-8' );
					this.emitFile( {
						type: 'asset',
						fileName: file.fileName.replace( /\.css$/, '-rtl.css' ),
						source: rtlcss.process( ltrSource, rtlcssOptions )
					} );
				}
			}
		}
	};
}
