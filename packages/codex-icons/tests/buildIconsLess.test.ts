import { Icon } from '../src/types';
import { getLessVariableName, getIconOutput } from '../buildIconsLess';
import {
	exampleSvgIcon,
	exampleFlipIcon,
	exampleFlipIconWithExceptions,
	exampleDirIcon,
	exampleLangIcon
} from './testIcons';

/* eslint-disable quotes */
const expectedIconOutput = {
	exampleSvgIcon: `@example-svg-icon: '<path d="M3 3H1v16h18v-2H3z"/><path d="M11 11L8 9l-4 4v3h14V5z"/>', 'false', 'false', 'false', 'false';\n`,
	exampleFlipIcon: `@example-flip-icon: '<path d="M3 3H1v16h18v-2H3z"/><path d="M11 11L8 9l-4 4v3h14V5z"/>', 'true', 'false', 'false', 'false';\n`,
	exampleFlipIconWithExceptions: `@example-flip-icon-with-exceptions: '<path d="M3 3H1v16h18v-2H3z"/><path d="M11 11L8 9l-4 4v3h14V5z"/>', 'true', 'he yi', 'false', 'false';\n`,
	exampleDirIcon: `@example-dir-icon: '<path d="M3 3H1v16h18v-2H3z"/><path d="M11 11L8 9l-4 4v3h14V5z"/>', 'false', 'false', 'rtl icon', 'false';\n`,
	exampleLangIcon: `@example-lang-icon: 'version for other languages', 'false', 'false', 'false', 'true', nl 'Dutch version', fy 'Frisian version';\n`
};
/* eslint-enable quotes */

describe( 'getLessVariableName', () => {
	it( 'creates the expected Less variable name', () => {
		expect( getLessVariableName( 'cdxIconAlert' ) ).toEqual( '@cdx-icon-alert' );
		expect( getLessVariableName( 'cdxIconArticlesSearch' ) ).toEqual( '@cdx-icon-articles-search' );
	} );
} );

describe( 'getIconOutput', () => {
	type Case = [ msg: string, lessVariableName: string, icon: Icon, expected: string ];
	const cases : Case[] = [
		[ 'Simple path icon', getLessVariableName( 'exampleSvgIcon' ), exampleSvgIcon, expectedIconOutput.exampleSvgIcon ],
		[ 'Flip icon', getLessVariableName( 'exampleFlipIcon' ), exampleFlipIcon, expectedIconOutput.exampleFlipIcon ],
		[ 'Flip icon with exceptions', getLessVariableName( 'exampleFlipIconWithExceptions' ), exampleFlipIconWithExceptions, expectedIconOutput.exampleFlipIconWithExceptions ],
		[ 'Dir icon', getLessVariableName( 'exampleDirIcon' ), exampleDirIcon, expectedIconOutput.exampleDirIcon ],
		[ 'Lang icon', getLessVariableName( 'exampleLangIcon' ), exampleLangIcon, expectedIconOutput.exampleLangIcon ]
	];
	test.each( cases )( 'Case %# %s: (%p)', ( _, lessVariableName, icon, expected ) => {
		expect( getIconOutput( lessVariableName, icon ) ).toEqual( expected );
	} );
} );
