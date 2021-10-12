const path = require( 'path' );
const componentTemplate = require( './docs/utils/templates/component' );
const componentDemoPath = 'component-demos';

/* eslint-disable jsdoc/valid-types */
/** @type import("vue-docgen-cli").DocgenCLIConfig */
module.exports = {
	docsRepo: 'wikimedia/design-codex',
	docsBranch: 'main',
	docsFolder: 'vitepress/docs',
	componentsRoot: './../vue-components/src/components',
	components: '*/[A-Z]*.vue',
	outDir: './docs/components',
	getDocFileName: ( componentPath ) => {
		// e.g. 'button'
		const componentName = path.parse( componentPath ).base.replace( /\.vue$/, '' ).toLowerCase();
		// e.g. 'docs/components/demos/button/button.md'
		return path.join( componentDemoPath, '/' + componentName + '/', componentName + '.md' );
	},
	getDestFile: ( componentPath, config ) => {
		return path
			.join( config.outDir, componentPath )
			.replace( /\/\w+\.vue$/, '.md' );
	},
	templates: {
		component: componentTemplate
	},
	// TODO: remove this link altogether
	editLinkLabel: ''
};
