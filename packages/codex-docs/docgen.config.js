const path = require( 'path' );
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
	componentsRoot: './../codex/src/components',
	components: '*/[A-Z]*.vue',
	outDir: './docs/components',
	getDocFileName: ( componentPath ) => {
		// e.g. 'TextInput'
		const componentName = path.parse( componentPath ).base.replace( /\.vue$/, '' );
		// e.g. 'text-input'
		const kebabCaseName = toKebabCase( componentName );
		// e.g. 'component-demos/text-input/text-input.md'
		return path.join( componentDemoPath, '/' + kebabCaseName + '/', kebabCaseName + '.md' );
	},
	getDestFile: ( componentPath, config ) => {
		return path
			.join( config.outDir, componentPath )
			.replace( /\/\w+\.vue$/, '.md' );
	},
	templates: {
		component,
		events,
		methods,
		props
	}
};
