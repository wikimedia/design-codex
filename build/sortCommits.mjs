/* eslint-env node */

import { stdin } from 'node:process';

/**
 * Categorize commits based on their prefix and return the formatted changelog.
 *
 * @param {string[]} commits Array of commit messages
 * @return {string} Formatted changelog text
 */
function categorizeCommits( commits ) {
	// Initialize categories
	const categories = {
		breaking: [],
		deprecating: [],
		features: [],
		styles: [],
		tokens: [],
		icons: [],
		code: [],
		build: [],
		docs: [],
		other: []
	};

	// Categorize commits based on their prefix.
	commits.forEach( ( commit ) => {
		// Map commit prefixes to their corresponding categories.
		const prefixToCategoryMap = {
			breaking: 'breaking',
			deprecat: 'deprecating',
			feature: 'features',
			style: 'styles',
			token: 'tokens',
			icon: 'icons',
			code: 'code',
			demo: 'code',
			build: 'build',
			test: 'build',
			doc: 'docs',
			readme: 'docs'
		};
		// Extract the commit prefix (text before the colon in the commit subject line).
		const match = commit.match( /^- ([^:]+):/ );
		const commitPrefix = match ? match[ 1 ].toLowerCase() : '';

		// Find the matching prefix.
		// A match is found when the commit prefix includes any keys from the prefixToCategoryMap.
		const matchingPrefix = Object.keys( prefixToCategoryMap ).find(
			( candidatePrefix ) => commitPrefix.includes( candidatePrefix )
		);
		// Determine the category.
		const category = matchingPrefix ? prefixToCategoryMap[ matchingPrefix ] : 'other';

		// Add the commit to the appropriate category array.
		categories[ category ].push( commit );
	} );

	// Initialize the changelog.
	let changelog = '';

	// Define the order of the changelog sections.
	const sections = [
		[ 'Breaking changes', categories.breaking ],
		[ 'Deprecating changes', categories.deprecating ],
		[ 'Features', categories.features ],
		[ 'Styles', categories.styles ],
		[ 'Tokens', categories.tokens ],
		[ 'Icons', categories.icons ],
		[ 'Code', categories.code ],
		[ 'Build', categories.build ],
		[ 'Documentation', categories.docs ]
	];

	// Add sections to the changelog.
	sections.forEach( ( [ title, sectionCommits ] ) => {
		if ( sectionCommits.length > 0 ) {
			changelog += `## ${ title }\n${ sectionCommits.join( '\n' ) }\n\n`;
		}
	} );

	// Add unsorted section if needed.
	if ( categories.other.length > 0 ) {
		changelog += '## Unsorted (manually sort the commits below in this order: breaking, deprecating, features, styles, tokens, icons, code, build, documentation)\n';
		changelog += categories.other.join( '\n' ) + '\n\n';
	}

	return changelog;
}

// Process the chunk of data from standard input (stdin).
let data = '';
stdin.on( 'data', ( chunk ) => {
	data += chunk;
} );

// When all input is received
stdin.on( 'end', () => {
	// Split the commits into lines and filter out empty lines.
	const inputCommits = data.split( '\n' ).filter( ( line ) => line.trim() );
	// Process and output the results to stdout using `console.log`.
	console.log( categorizeCommits( inputCommits ) );
} );
