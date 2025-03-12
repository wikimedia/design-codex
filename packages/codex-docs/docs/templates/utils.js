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
		// Format anchor to match the anchor link as Markdown processes it.
		const formattedAnchor = anchor.replace( '<', '' ).replace( '>', '' ).toLowerCase();
		// Format text to encode angle brackets to avoid breaking the markdown parser.
		const formattedText = text.replace( '<', '&lt;' ).replace( '>', '&gt;' );
		return `<a href="../types-and-constants.html#${ formattedAnchor }">${ formattedText }</a>`;
	}

	/**
	 * @param {string} str
	 * @return {string}
	 */
	function processText( str ) {
		const isUppercase = /^[A-Z]/;
		const hasBrackets = /\[\]$/;
		const toIgnore = [
			'HTMLElement',
			'ComponentPublicInstance',
			'Event', 'MouseEvent', 'InputEvent', 'KeyboardEvent', 'FocusEvent',
			'NaN'
		];

		// If this is an array type, remove the brackets at the end.
		const isArrayType = str.trim().indexOf( '[]' ) === str.trim().length - 2;
		if ( isArrayType ) {
			str = str.slice( 0, str.indexOf( '[' ) );
		}

		// If this is an array of multiple types, remove the parentheses too.
		const isArrayOfTypes = str.includes( '(' ) && str.includes( ')' );
		if ( isArrayOfTypes ) {
			str = str.slice( str.indexOf( '(' ) + 1, str.indexOf( ')' ) );
		}

		let typesWithLinks = str.split( '|' )
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

		// Add the parentheses back in.
		if ( isArrayOfTypes ) {
			typesWithLinks = '(' + typesWithLinks + ')';
		}

		// Add the array brackets back in.
		if ( isArrayType || isArrayOfTypes ) {
			typesWithLinks += '[]';
		}

		return typesWithLinks;
	}

	return formatAsCode( processText( item ) );
}
