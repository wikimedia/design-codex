/**
 * Replaces returns and pipes to make the input compatible with markdown.
 *
 * @param {string} input
 * @return {string}
 */
export function mdclean( input ) {
	return input
		// Replace double newlines with two breaks to maintain the spacing.
		.replace( /\r?\n\n/g, '<br/><br/>' )
		// Replace single newlines, which were most likely included to meet line length limits, with
		// a space. This prevents unnecessary line breaks in the text.
		.replace( /\r?\n/g, ' ' )
		// Escape pipe characters.
		.replace( /\|/g, '\\|' );
}

/**
 * Return item text with a link to the types and constants page if applicable.
 *
 * @param {string} item
 * @return {string}
 */
export function getTypeText( item ) {
	/**
	 * @param {string} str
	 * @return {string} code markup or empty string
	 */
	function formatAsCode( str ) {
		// Don't wrap empty strings in <code> tags
		if ( str.length === 0 ) {
			return str;
		}

		return `<code>${ str }</code>`;
	}

	/**
	 * @param {string} anchor
	 * @param {string} text
	 * @return {string} link markup
	 */
	function formatAsLink( anchor, text = anchor ) {
		return `<a href="../types-and-constants.html#${ anchor.toLowerCase() }">${ text }</a>`;
	}

	/**
	 * @param {string} str
	 * @return {string}
	 */
	function processText( str ) {
		const isUppercase = /^[A-Z]/;
		const hasBrackets = /\[\]$/;
		const toIgnore = [ 'Event', 'MouseEvent', 'InputEvent', 'KeyboardEvent', 'FocusEvent', 'NaN' ];
		return str
			.split( '|' )
			.map( ( s ) => s.trim() )
			.map( ( s ) => {
				if ( s.match( isUppercase ) && !toIgnore.includes( s ) ) {
					return s.match( hasBrackets ) ?
						formatAsLink( s.slice( 0, s.length - 2 ), s ) :
						formatAsLink( s );
				} else {
					return s;
				}
			} )
			.join( '|' );
	}

	return formatAsCode( processText( item ) );
}
