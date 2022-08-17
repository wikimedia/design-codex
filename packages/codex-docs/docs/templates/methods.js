const mdclean = require( './utils' ).mdclean;

/** @typedef {import('vue-docgen-api').MethodDescriptor} MethodDescriptor */
/** @typedef {import('vue-docgen-api').Param} Param */
/** @typedef {import('vue-docgen-api').ParamTag} ParamTag */

/**
 * Get the contents of the "Params" cell for a method.
 *
 * @param {Param[]} params
 * @return {string}
 */
const getParams = ( params ) => {
	let paramsString = '<ul class="cdx-docs-methods__params">';
	params.forEach( ( p ) => {
		const t = p.type && p.type.name ? p.type.name : '';
		const n = p.name ? p.name : '';
		const d = typeof p.description === 'string' ? p.description : '';

		// Standard format for params in other usage docs (e.g. events), with
		// the name in bold, the type in <pre> tags, and the description after a dash.
		paramsString += `<li>**${mdclean( n )}** \`${mdclean( t )}\` - ${mdclean( d )}</li>`;
	} );
	paramsString += '</ul>';
	return paramsString;
};

/**
 * Get the contents of the "Returns" cell for a method.
 *
 * vue-docgen-api has a `returns` object that provides a basic type (e.g. `Array`) but no
 * description, since we don't use the returns tag in our JSDocs.
 *
 * If possible, inspect the return tag, which may have both a more accurate type (e.g. `string[]`)
 * and a description. If it doesn't exist, at least try to get the type from the returns data.
 *
 * @param {MethodDescriptor} m
 * @return {string}
 */
const getReturns = ( m ) => {
	/**
	 * Tries to get the return type from the `returns` object provided via vue-docgen-api.
	 *
	 * @return {string}
	 */
	function getTypeFromReturns() {
		if ( m.returns && m.returns.type && m.returns.type.name ) {
			return `\`${m.returns.type.name}\``;
		}
		return '';
	}

	// For methods without a @return tag, see if the parser found a return type and use it.
	if ( !m.tags || !m.tags.return ) {
		return getTypeFromReturns();
	}

	// If there is a @return tag, grab the text from it.
	// m.tags.return[ 0 ] is typed as a BlockTag, which is either a Tag or a ParamTag, but we know
	// that it's a ParamTag
	const returnText = String( /** @type {ParamTag} */ ( m.tags.return[ 0 ] ).description );

	// See if there's a closing bracket, which should indicate that there's a JSDoc-style type.
	const indexOfClosingBracket = returnText.indexOf( '}' );

	// If so, grab the type and the description and use both.
	if ( indexOfClosingBracket > 0 ) {
		const t = returnText.slice( 1, indexOfClosingBracket );
		const d = returnText.slice( indexOfClosingBracket + 2 );
		return `\`${t}\` ${d}`;
	}

	// Otherwise, get the type from the `returns` object from the parser, then tack on the @return
	// text.
	return getTypeFromReturns() + ' ' + returnText;
};

/**
 * Returns a formatted markdown table body with method information.
 *
 * @param {MethodDescriptor[]} methods This component's public methods
 * @return {string}
 */
const tmpl = function ( methods ) {
	let ret = '';

	// Build a table row for each method.
	methods.forEach( ( m ) => {
		const n = m.name ? '`' + m.name + '`' : '';
		const d = m.description || '';
		const p = m.params ? '**Params:**\n' + getParams( m.params ) + '\n' : '';
		const r = m.returns || ( m.tags && m.tags.return ) ? '**Returns:** ' + getReturns( m ) : '';

		ret += `| ${mdclean( n )} | ${mdclean( d )} | ${mdclean( p + r )} |\n`;
	} );
	return ret;
};

/**
 * Exports a custom template for the methods data on a component demo page.
 *
 * Note that the basis of this code comes from vue-docgen-api, so few improvements have been
 * made—changes to the default code/template have been noted.
 *
 * @type {import('vue-docgen-cli').Templates['methods']}
 */
module.exports = function ( methods, opt = {} ) {
	if ( Object.keys( methods ).length === 0 ) {
		return '';
	}

	// Display methods as a table, similar to the other usage data.
	return `
${opt.isSubComponent || opt.hasSubComponents ? '#' : ''}## Methods

| Method name | Description | Signature |
| ----------- | ----------- | --------- |
  ${tmpl( methods )}
  `;
};
