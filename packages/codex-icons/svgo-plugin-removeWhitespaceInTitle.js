/**
 * SVGO plugin that removes whitespace in <title> tag.
 *
 * @type {import('svgo').CustomPlugin}
 */
export default {
	name: 'removeWhitespaceInTitle',
	fn() {
		return {
			element: {
				enter( node ) {
					if ( node.name === 'title' ) {
						// Ensure `node.children[ 0 ]` exists and is a text node.
						if ( node.children.length > 0 && node.children[ 0 ].type === 'text' ) {
							// Trim both leading and trailing whitespace.
							node.children[ 0 ].value = node.children[ 0 ].value.trim();
						}
					}
				}
			}
		};
	}
};
