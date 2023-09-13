const path = require( 'path' );
const fs = require( 'fs' );
const component = require( './docs/templates/component' );
const events = require( './docs/templates/events' );
const methods = require( './docs/templates/methods' );
const props = require( './docs/templates/props' );
const componentDemoPath = 'component-demos';

/**
 * Transform a component's path to its kebab-case name.
 *
 * @param {string} componentPath
 * @return {string}
 */
function getKebabCaseName( componentPath ) {
	// e.g. TextInput.
	const componentName = path.parse( componentPath ).base.replace( /\.vue$/, '' );
	// For each letter in the name...
	return componentName.split( '' ).map( ( letter, index ) => {
		// If the letter is uppercase, add a dash before it (unless it's the first letter), then
		// transform the letter to lowercase. Otherwise, just add the letter as-is.
		return letter.toUpperCase() === letter ?
			`${index !== 0 ? '-' : ''}${letter.toLowerCase()}` :
			letter;
	} ).join( '' );
}

/** @type import("vue-docgen-cli").DocgenCLIConfig */
module.exports = {
	// Conceptually componentsRoot is ../codex/src/components, but we want to find components
	// in ../codex/src/components-wip too
	componentsRoot: './../codex/src',
	components: [ 'components/*/[A-Z]*.vue', 'components-wip/*/[A-Z]*.vue' ],
	outDir: './docs/components/demos',
	getDocFileName: ( componentPath ) => {
		// e.g. 'text-input'
		const kebabCaseName = getKebabCaseName( componentPath );
		// e.g. 'component-demos/text-input/text-input.md'
		const docFileName = path.join( componentDemoPath, '/' + kebabCaseName + '/', kebabCaseName + '.md' );
		// If the .md file doesn't exists, don't return it. This avoids an error while still
		// displaying the generated documentation.
		// eslint-disable-next-line security/detect-non-literal-fs-filename
		return fs.existsSync( docFileName ) ? docFileName : false;
	},
	getDestFile: ( componentPath, config ) => {
		const kebabCaseName = getKebabCaseName( componentPath );
		return path.join( config.outDir, '/' + kebabCaseName + '.md' );
	},
	templates: {
		component,
		events,
		methods,
		props
	}
};
