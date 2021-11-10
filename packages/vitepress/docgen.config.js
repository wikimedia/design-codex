const path = require( 'path' );
const componentTemplate = require( './docs/templates/component' );
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

/* eslint-disable jsdoc/valid-types */
/** @type import("vue-docgen-cli").DocgenCLIConfig */
module.exports = {
	componentsRoot: './../vue-components/src/components',
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
		component: componentTemplate
	}
};
