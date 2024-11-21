import { parse, join } from 'path';
import { existsSync } from 'fs';
import { defineConfig } from 'vue-docgen-cli';
import component from './docs/templates/component.js';
import events from './docs/templates/events.js';
import methods from './docs/templates/methods.js';
import props from './docs/templates/props.js';

const componentDemoPath = 'component-demos';

/**
 * Transform a component's path to its kebab-case name.
 *
 * @param {string} componentPath
 * @return {string}
 */
function getKebabCaseName( componentPath ) {
	// e.g. TextInput.
	const componentName = parse( componentPath ).base.replace( /\.vue$/, '' );
	// For each letter in the name...
	return componentName.split( '' ).map(
		// If the letter is uppercase, add a dash before it (unless it's the first letter), then
		// transform the letter to lowercase. Otherwise, just add the letter as-is.
		( letter, index ) => letter.toUpperCase() === letter ?
			`${ index !== 0 ? '-' : '' }${ letter.toLowerCase() }` :
			letter
	).join( '' );
}

export default defineConfig( {
	// Conceptually componentsRoot is ../codex/src/components, but we want to find components
	// in ../codex/src/components-wip too
	componentsRoot: './../codex/src',
	components: [ 'components/*/[A-Z]*.vue', 'components-wip/*/[A-Z]*.vue' ],
	outDir: './docs/components/demos',
	getDocFileName: ( componentPath ) => {
		// e.g. 'text-input'
		const kebabCaseName = getKebabCaseName( componentPath );
		// e.g. 'component-demos/text-input/text-input.md'
		const docFileName = join( componentDemoPath, '/' + kebabCaseName + '/', kebabCaseName + '.md' );
		// If the .md file doesn't exists, don't return it. This avoids an error while still
		// displaying the generated documentation.
		return existsSync( docFileName ) ? docFileName : false;
	},
	getDestFile: ( componentPath, config ) => {
		const kebabCaseName = getKebabCaseName( componentPath );
		return join( config.outDir, '/' + kebabCaseName + '.md' );
	},
	templates: {
		component,
		events,
		methods,
		props
	}
} );
