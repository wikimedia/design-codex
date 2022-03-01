/**
 * Replaces returns and tubes to make the input compatible with markdown.
 *
 * @param {string} input
 * @return {string}
 */
function mdclean( input ) {
	return input.replace( /\r?\n/g, '<br/>' ).replace( /\|/g, '\\|' );
}

function isTag( v ) {
	return 'content' in v && !!v.content;
}

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
 * @param {Object} props
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
