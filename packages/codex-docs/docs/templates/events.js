const mdclean = require( './utils' ).mdclean;

/* eslint-disable jsdoc/valid-types */
/** @typedef {import("vue-docgen-api").EventDescriptor} EventDescriptor */

/**
 * Format event properties.
 *
 * @param {EventDescriptor['properties']} properties This event's properties
 * @return {string} Single line of information per event property
 */
function formatProperties( properties ) {
	if ( !properties ) {
		return '';
	}
	return properties
		.map( ( property ) => {
			const { name, description, type } = property;
			if ( !type ) {
				return '';
			}
			let eventString = `**${name}** \`${type.names.length ? type.names.join( ', ' ) : ''}\``;

			// Customization: only show the description if one exists, to avoid appending
			// " - undefined" to the string.
			if ( description ) {
				eventString += ` - ${description}`;
			}
			return eventString;
		} )
		.join( '\n' );
}

/**
 * Returns a formatted markdown table body with event information.
 *
 * @param {EventDescriptor[]} events This component's events
 * @return {string}
 */
const tmpl = ( events ) => {
	let ret = '';
	events.forEach( ( evt ) => {
		const { description = '', ...e } = evt;
		const readableProperties = e.properties ? `${formatProperties( e.properties )}` : '';
		ret += `| ${mdclean( '`' + e.name + '`' )} | ${mdclean( readableProperties )} | ${mdclean( description )}\n`;
	} );
	return ret;
};

/**
 * Exports a custom template for the events data on a component demo page.
 *
 * Note that most of this code comes directly from vue-docgen-cli, so no improvements have been
 * made—changes to the default code/template have been noted.
 *
 * @param {EventDescriptor[]} events
 * @param {Object} opt
 * @return {string}
 */
module.exports = function ( events, opt ) {
	return `
${opt.isSubComponent || opt.hasSubComponents ? '#' : ''}## Events

  | Event name     | Properties     | Description  |
  | -------------- |--------------- | -------------|
  ${tmpl( events )}
  `;
};
