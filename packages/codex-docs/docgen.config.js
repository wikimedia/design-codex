const path = require( 'path' );
const fs = require( 'fs' );
const component = require( './docs/templates/component' );
const events = require( './docs/templates/events' );
const methods = require( './docs/templates/methods' );
const props = require( './docs/templates/props' );
const componentDemoPath = 'component-demos';

/**
 * Transform a PascalCase component name to kebab-case.
 *
 * @param {string} componentName
 * @return {string}
 */
function toKebabCase( componentName ) {
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
	outDir: './docs/components',
	getDocFileName: ( componentPath ) => {
		// e.g. 'TextInput'
		const componentName = path.parse( componentPath ).base.replace( /\.vue$/, '' );
		// e.g. 'text-input'
		const kebabCaseName = toKebabCase( componentName );
		// e.g. 'component-demos/text-input/text-input.md'
		const docFileName = path.join( componentDemoPath, '/' + kebabCaseName + '/', kebabCaseName + '.md' );
		// If the .md file doesn't exists, don't return it. This avoids an error while still
		// displaying the generated documentation.
		return fs.existsSync( docFileName ) ? docFileName : false;
	},
	getDestFile: ( componentPath, config ) => {
		return path
			.join( config.outDir, componentPath )
			.replace( /\/\w+\.vue$/, '.md' )
			.replace( /\/components\/components(-wip)?/, '/components' );
	},
	templates: {
		component,
		events,
		methods,
		props
	}
};
