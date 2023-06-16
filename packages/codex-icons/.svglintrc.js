// svglint doesn't have type defs, so improvise some here.
/** @typedef {import('cheerio').Cheerio<import('cheerio').Document>} CheerioDocument */
/** @typedef {import('cheerio').Node} CheerioNode */
/** @typedef {{ error: ( msg: string, node: CheerioNode, ast: any ) => void }} Reporter */

module.exports = {
	rules: {
		elm: {
			// Require a `<title>` element to exist, and require it to be a direct child
			// of the SVG element.
			'svg > title': true
		},
		attr: [
			{
				// For the `<svg>` element
				'rule::selector': 'svg',
				// Require xmlns to exist and be set to this value
				xmlns: 'http://www.w3.org/2000/svg',
				// Require viewBox, width and height to be set to the standard 20x20 values
				viewBox: '0 0 20 20',
				width: '20',
				height: '20'
			},
			{
				// For any element
				// Forbid the fill attribute
				fill: false
			}
		],
		/**
		 * @param {Reporter} reporter
		 * @param {CheerioDocument} $
		 * @param {any} ast
		 */
		custom( reporter, $, ast ) {
			// Require the first thing in the file to be an `<?xml ?>` declaration.
			const documentNode = $[ 0 ];
			if (
				documentNode.firstChild &&
				'name' in documentNode.firstChild &&
				documentNode.firstChild.name !== '?xml'
			) {
				reporter.error(
					'File must start with `<?xml ?>` declaration',
					documentNode.firstChild,
					ast
				);
			}
		}
	}
};
