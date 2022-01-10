import { Plugin } from 'vite';
import rtlcss from 'rtlcss';

/**
 * Vite plugin that generates RTL versions of all .css output files.
 *
 * @return Plugin
 */
export default function rtlCss() : Plugin {
	return {
		name: 'rtl-css',
		apply: 'build',
		enforce: 'post',
		generateBundle( options, bundle ) {
			for ( const file of Object.values( bundle ) ) {
				if ( file.type === 'asset' && file.fileName.endsWith( '.css' ) ) {
					const ltrSource = typeof file.source === 'string' ?
						file.source :
						Buffer.from( file.source ).toString( 'utf-8' );
					this.emitFile( {
						type: 'asset',
						fileName: file.fileName.replace( /\.css$/, '-rtl.css' ),
						source: rtlcss.process( ltrSource, {}, {}, {} )
					} );
				}
			}
		}
	};
}
