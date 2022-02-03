/**
 * SVGO plugin that removes the outer <svg> tag.
 */
module.exports = {
	name: 'removeSvgTag',
	type: 'full',
	fn( rootNode ) {
		// rootNode.children[ 0 ] is the <svg> tag
		rootNode.children = rootNode.children[ 0 ].children;
		return rootNode;
	}
};
