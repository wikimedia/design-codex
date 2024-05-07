import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';
import { globSync } from 'glob';

/**
 * Convert a single file.
 *
 * @param {string} fileContents
 * @return {string}
 */
const convertFileContents = ( fileContents ) => {
	return fileContents
		// Change `import` to `require`
		.replace(
			/import ({[^}]+}|[^{};]+) from '([^']+)';/g,
			'const $1 = require( \'$2\' );'
		)
		// Change `export default` to `module.exports =`
		.replace( /^export default/m, 'module.exports =' )
		// Icon imports to `./icons.json`
		.replace( /@wikimedia\/codex-icons/, './icons.json' )
		// Design tokens import to mediawiki.skin.variables.less
		.replace(
			// eslint-disable-next-line security/detect-unsafe-regex
			/^@import (\( ?reference ?\) )?'@wikimedia\/codex-design-tokens\/theme-wikimedia-ui.less';$/m,
			'@import \'mediawiki.skin.variables.less\';'
		);
	// Self-closing tags need to be changed to open+close tags, but that is not done here.
	// Instead, this is done by runnig eslint --fix on the output of this script in the
	// mw-examples:build NPM script
};

const files = globSync( 'component-demos/*/examples/*.vue' );
for ( const fileName of files ) {
	const contents = readFileSync( fileName, { encoding: 'utf-8' } );
	const convertedContents = convertFileContents( contents );
	const newName = fileName.replace( /examples\/([^/]+\.vue)$/, 'examples-mw/$1' );
	mkdirSync( dirname( newName ), { recursive: true } );
	writeFileSync( newName, convertedContents );
}
