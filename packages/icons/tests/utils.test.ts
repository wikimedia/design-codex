import { Icon, IconFlipForRtl, SimpleIcon } from '../src/types';
import { resolveIcon, shouldIconFlip } from '../src/utils';

const examplePathIcon = { path: 'M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42z' };
const exampleSvgIcon = '<path d="M3 3H1v16h18v-2H3z"/><path d="M11 11L8 9l-4 4v3h14V5z"/>';
const exampleFlipIcon = {
	ltr: examplePathIcon,
	shouldFlip: true as const
};
const exampleFlipIconWithExceptions = {
	ltr: examplePathIcon,
	shouldFlip: true as const,
	shouldFlipExceptions: [ 'he', 'yi' ]
};
const exampleDirIcon = {
	ltr: examplePathIcon,
	rtl: exampleSvgIcon
};

const exampleLangIcon = {
	langCodeMap: {
		nl: { path: 'Dutch version' },
		fy: { path: 'Frisian version' }
	},
	default: 'version for other languages'
};

const complexLangIcon = {
	langCodeMap: {
		nl: { ltr: 'Dutch version', shouldFlip: true } as IconFlipForRtl,
		fy: 'Frisian version'
	},
	default: exampleFlipIcon
};

describe( 'resolveIcon', () => {
	type Case = [ msg: string, icon: Icon, lang: string, dir: string, expected: SimpleIcon ];
	const cases : Case[] = [
		[ 'Simple path icon', examplePathIcon, 'fr', 'ltr', examplePathIcon ],
		[ 'Simple SVG icon', exampleSvgIcon, 'en', 'ltr', exampleSvgIcon ],
		[ 'Flip icon (LTR)', exampleFlipIcon, 'pl', 'ltr', exampleFlipIcon.ltr ],
		[ 'Flip icon (RTL)', exampleFlipIcon, 'pl', 'ltr', exampleFlipIcon.ltr ],
		[ 'Dir icon (LTR)', exampleDirIcon, 'hi', 'ltr', exampleDirIcon.ltr ],
		[ 'Dir icon (RTL)', exampleDirIcon, 'yi', 'rtl', exampleDirIcon.rtl ],
		[ 'Lang icon (nl)', exampleLangIcon, 'nl', 'ltr', exampleLangIcon.langCodeMap.nl ],
		[ 'Lang icon (fy)', exampleLangIcon, 'fy', 'ltr', exampleLangIcon.langCodeMap.fy ],
		[ 'Lang icon (default)', exampleLangIcon, 'zh', 'ltr', exampleLangIcon.default ],
		[ 'Complex lang icon (nl)', complexLangIcon, 'nl', 'ltr', complexLangIcon.langCodeMap.nl.ltr ],
		[ 'Complex lang icon (fy)', complexLangIcon, 'fy', 'ltr', complexLangIcon.langCodeMap.fy ],
		[ 'Complex lang icon (default)', complexLangIcon, 'zh', 'ltr', complexLangIcon.default.ltr ]

	];
	test.each( cases )( 'Case %# %s: (%p)', ( _, icon, lang, dir, expected ) => {
		expect( resolveIcon( icon, lang, dir ) ).toEqual( expected );
	} );
} );

describe( 'shouldIconFlip', () => {
	type Case = [ msg: string, icon: Icon, lang: string, expected: boolean ];
	const cases : Case[] = [
		[ 'Simple path icon', examplePathIcon, 'ar', false ],
		[ 'Simple SVG icon', exampleSvgIcon, 'ar', false ],
		[ 'Flip icon', exampleFlipIcon, 'ar', true ],
		[ 'Flip icon with exceptions', exampleFlipIconWithExceptions, 'fa', true ],
		[ 'Flip icon with exceptions (exception language)', exampleFlipIconWithExceptions, 'he', false ],
		[ 'Dir icon', exampleDirIcon, 'ar', false ],
		[ 'Lang icon (nl)', exampleLangIcon, 'nl', false ],
		[ 'Lang icon (fy)', exampleLangIcon, 'fy', false ],
		[ 'Lang icon (default)', exampleLangIcon, 'zh', false ],
		[ 'Complex lang icon (nl)', complexLangIcon, 'nl', true ],
		[ 'Complex lang icon (fy)', complexLangIcon, 'fy', false ],
		[ 'Complex lang icon (default)', complexLangIcon, 'zh', true ]
	];
	test.each( cases )( 'Case %# %s: (%p)', ( _, icon, lang, expected ) => {
		expect( shouldIconFlip( icon, lang ) ).toEqual( expected );
	} );
} );
