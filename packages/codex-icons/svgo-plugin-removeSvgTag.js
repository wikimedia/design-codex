/**
 * SVGO plugin that removes the outer <svg> tag.
 *
 * @type {import('svgo').CustomPlugin}
 */
module.exports = {
	name: 'removeSvgTag',
	type: 'full',
	fn( rootNode ) {
		const svgTag = rootNode.children[ 0 ];
		// We know rootNode.children[ 0 ] is the <svg> tag and is of type 'element',
		// but do the check anyway to make TypeScript happy.
		if ( svgTag.type === 'element' ) {
			// Unwrap svgTag.
			rootNode.children = svgTag.children;
		}
		return rootNode;
	}
};
