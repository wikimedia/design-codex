/**
 * A Vite/Rollup plugin to allow only files with specific extensions to be emitted.
 *
 * @param {Iterable<string>} extensions A list of extensions to allow, e.g. ['css', 'mjs']
 * @return {import('vite').Plugin}
 *
 * @example
 * import { build } from 'vite';
 * import emitAllowlist from './vite-plugin-emit-allowlist.mjs';
 *
 * const config = {
 *    plugins: [
 *      emitAllowlist(['mjs', 'css'])
 *    ]
 * ];
 *
 * await build(config);
 */
export default function emitAllowlist( extensions = [] ) {
	const allowedExtensions = new Set( extensions );

	return {
		name: 'emit-allowlist',
		generateBundle: {
			order: 'post',
			handler( _, bundle = {} ) {
				for ( const fileName in bundle ) {
					const fileExtension = fileName.split( '.' ).pop();

					if ( fileExtension && allowedExtensions.has( fileExtension ) ) {
						continue;
					}

					delete bundle[ fileName ];
				}
			}
		}
	};
}
