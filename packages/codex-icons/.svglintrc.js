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
				// Require viewBox, width and height attributes to exist on the SVG element.
				'rule::selector': 'svg',
				xmlns: 'http://www.w3.org/2000/svg',
				viewBox: true,
				width: true,
				height: true
			},
			// Disallow the fill attribute, unless it's set to `#fff`.
			{
				'rule::selector': '[fill]',
				fill: '#fff'
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
