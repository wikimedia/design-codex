import { IconFlipForRtl } from '../src/types';

export const examplePathIcon = { path: 'M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42z' };
export const exampleSvgIcon = '<path d="M3 3H1v16h18v-2H3z"/><path d="M11 11L8 9l-4 4v3h14V5z"/>';
export const exampleFlipIcon = {
	ltr: exampleSvgIcon,
	shouldFlip: true as const
};
export const exampleFlipIconWithExceptions = {
	ltr: exampleSvgIcon,
	shouldFlip: true as const,
	shouldFlipExceptions: [ 'he', 'yi' ]
};
export const exampleDirIcon = {
	ltr: exampleSvgIcon,
	rtl: 'rtl icon'
};

export const exampleLangIcon = {
	langCodeMap: {
		nl: 'Dutch version',
		fy: 'Frisian version'
	},
	default: 'version for other languages'
};

export const complexLangIcon = {
	langCodeMap: {
		nl: { ltr: 'Dutch version', shouldFlip: true } as IconFlipForRtl,
		fy: 'Frisian version'
	},
	default: exampleFlipIcon
};

export const exampleIconWithUse = {
	ltr: '<path id="cdx-icon-use-a" d="M3 3H1v16h18v-2H3z"/><use xlink:href="#cdx-icon-use-a"/>',
	rtl: '<path id="cdx-icon-use-a" d="M3 3H1v16h18v-2H3z"/><use xlink:href="#cdx-icon-use-a"/>'
};

export const exampleIconWithUseMultiLang = {
	langCodeMap: {
		nl: '<path id="cdx-icon-use-a" d="M3 3H1v16h18v-2H3z"/><use xlink:href="#cdx-icon-use-a"/>',
		fy: '<path id="cdx-icon-use-a" d="M3 3H1v16h18v-2H3z"/><use xlink:href="#cdx-icon-use-a"/>'
	},
	default: '<path id="cdx-icon-use-a" d="M3 3H1v16h18v-2H3z"/><use xlink:href="#cdx-icon-use-a"/>'
};
