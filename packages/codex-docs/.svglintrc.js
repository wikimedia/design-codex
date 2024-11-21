/* eslint-disable
	@typescript-eslint/no-unsafe-assignment,
	@typescript-eslint/no-unsafe-argument,
	@typescript-eslint/no-unsafe-member-access */

export default {
	rules: {
		attr: [
			{
				// For the `<svg>` element
				'rule::selector': 'svg',
				// Require xmlns to exist and be set to this value
				xmlns: 'http://www.w3.org/2000/svg',
				// Disallow `standalone` attribute, which would be wrong on `svg` anyway.
				standalone: false,
				// Require viewBox, width and height to be set.
				viewBox: true,
				width: true,
				height: true
			}
		],
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		custom( reporter, $, ast ) {
			// Require the first thing in the file to be an `<?xml ?>` declaration.
			const documentNode = $[ 0 ];
			const firstChild = documentNode.firstChild;

			if (
				firstChild &&

				firstChild.type === 'directive' &&
				firstChild.name === '?xml'
			) {
				const versionMatch = /version="1.0"/.test( firstChild.data );
				const encodingMatch = /encoding="UTF-8"/.test( firstChild.data );
				const standaloneMatch = /standalone/.test( firstChild.data );

				// `standalone` attribute is unnecessary and should be omitted.
				if ( versionMatch && encodingMatch && !standaloneMatch ) {
					// This is the desired XML declaration.
					return;
				}
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			reporter.error(
				'File must start exactly with `<?xml version="1.0" encoding="UTF-8"?>` declaration',
				firstChild ?? documentNode,
				ast
			);
		}
	}
};
