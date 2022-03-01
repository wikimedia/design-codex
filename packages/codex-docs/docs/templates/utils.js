/**
 * Replaces returns and pipes to make the input compatible with markdown.
 *
 * @param {string} input
 * @return {string}
 */
function mdclean( input ) {
	return input
		// Replace double newlines with two breaks to maintain the spacing.
		.replace( /\r?\n\n/g, '<br/><br/>' )
		// Replace single newlines, which were most likely included to meet line length limits, with
		// a space. This prevents unnecessary line breaks in the text.
		.replace( /\r?\n/g, ' ' )
		// Escape pipe characters.
		.replace( /\|/g, '\\|' );
}

module.exports = {
	mdclean
};
