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
		// Don't wrap empty strings in `<code>` elements.
		if ( str.length === 0 ) {
			return str;
		}

		return `<code>${ str }</code>`;
	}

	/**
	 * @param {string} anchor
	 * @return {string} link markup
	 */
	function formatAsLink( anchor ) {
		// Format anchor to match the anchor link as Markdown processes it.
		const formattedAnchor = anchor.replace( '<', '' ).replace( '>', '' ).toLowerCase();
		// Format text to encode angle brackets to avoid breaking the Markdown parser.
		const formattedText = anchor.replace( '<', '&lt;' ).replace( '>', '&gt;' );
		return `<a href="../types-and-constants.html#${ formattedAnchor }">${ formattedText }</a>`;
	}

	/**
	 * @param {string} str
	 * @return {string}
	 */
	function processText( str ) {
		// Check for parentheses followed by brackets.
		const isArrayOfTypes = str.match( /^\((.*)\)\[\]$/ );
		const isUppercaseTest = /^[A-Z]/;
		const hasBracketsTest = /\[\]$/;
		const toIgnore = [
			'HTMLElement',
			'ComponentPublicInstance',
			'Event', 'MouseEvent', 'InputEvent', 'KeyboardEvent', 'FocusEvent',
			'NaN'
		];

		// If this is an array of multiple types, remove the parentheses for now.
		if ( isArrayOfTypes ) {
			str = str.slice( str.indexOf( '(' ) + 1, str.indexOf( ')' ) );
		}

		let typesWithLinks = str.split( '|' )
			.map( ( s ) => s.trim() )
			.map( ( s ) => {
				if ( s.match( isUppercaseTest ) && !toIgnore.includes( s ) ) {
					return s.match( hasBracketsTest ) ?
						// Don't include brackets in link text.
						formatAsLink( s.slice( 0, s.length - 2 ) ) + '[]' :
						formatAsLink( s );
				} else {
					return s;
				}
			} )
			.join( '|' );

		// Add the parentheses back in.
		if ( isArrayOfTypes ) {
			typesWithLinks = '(' + typesWithLinks + ')[]';
		}

		return typesWithLinks;
	}

	return formatAsCode( processText( item ) );
}
