const mdclean = require( './utils' ).mdclean;

/* eslint-disable jsdoc/valid-types */
/** @typedef {import("vue-docgen-api").PropDescriptor} PropDescriptor */

/**
 * Return true if the thing is a tag
 *
 * @param {any} v
 * @return {boolean}
 */
function isTag( v ) {
	return 'content' in v && !!v.content;
}

/**
 * Format any tags present in prop docs
 *
 * @param {Object} tags
 * @return {string}
 */
const renderTags = ( tags ) => {
	if ( !tags ) {
		return '';
	}
	return Object.entries( tags )
		.map( ( [ tag, values ] ) => {
			return values.map( ( v ) => `<br/>\`@${tag}\` ${isTag( v ) ? v.content : v.description}` ).join( '' );
		} )
		.join( '' );
};

/**
 * Returns a formatted markdown table body with prop information.
 *
 * @param {PropDescriptor[]} props This component's props
 * @return {string}
 */
const tmpl = ( props ) => {
	let ret = '';

	props.forEach( ( pr ) => {
		let p = '`' + pr.name + '`';
		// Customization: add the required indicator after the prop name if it is required.
		p += pr.required ? '<sup class="cdx-docs-required-indicator">(required)</sup>' : '';
		let t = pr.description || '';
		t += renderTags( pr.tags );
		const n = pr.type ? '`' + pr.type.name + '`' : '';
		const v = pr.values ? pr.values.map( ( pv ) => `\`${pv}\`` ).join( ', ' ) : '-';
		const d = pr.defaultValue ? '`' + pr.defaultValue.value + '`' : '';

		ret += `| ${mdclean( p )} | ${mdclean( t )} | ${mdclean( n )} | ${mdclean( v )} | ${mdclean( d )} |\n`;
	} );
	return ret;
};

/**
 * Exports a custom template for the props data on a component demo page.
 *
 * Note that most of this code comes directly from vue-docgen-api, so no improvements have been
 * made—changes to the default code/template have been noted.
 *
 * @param {PropDescriptor[]} props
 * @param {Object} opt
 * @return {string}
 */
module.exports = function ( props, opt = {} ) {
	return `
${opt.isSubComponent || opt.hasSubComponents ? '#' : ''}## Props

| Prop name     | Description | Type      | Values      | Default     |
| ------------- | ----------- | --------- | ----------- | ----------- |
${tmpl( props )}
`;
};
