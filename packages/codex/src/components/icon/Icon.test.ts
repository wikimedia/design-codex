import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { cdxIconAlert, Icon, IconFlipForRtl } from '@wikimedia/codex-icons';
import CdxIcon from './Icon.vue';
import { HTMLDirection, IconSize } from '../../types';

const examplePathIcon = { path: 'M7 14.17L2.83 10l-1.41 1.41L7 17 19 5l-1.41-1.42z' };
const exampleSvgIcon = '<path d="M3 3H1v16h18v-2H3z"/><path d="M11 11L8 9l-4 4v3h14V5z"/>';
const exampleFlipIcon = {
	ltr: examplePathIcon,
	shouldFlip: true as const,
	shouldFlipExceptions: [ 'he', 'yi' ]
};

describe( 'Icon', () => {
	describe( 'matches the snapshot', () => {
		type Case = [
			msg: string,
			props: {
				icon: Icon,
				iconLabel?: string,
				dir?: HTMLDirection|null,
				lang?: string|null,
				size?: IconSize
			}
		];

		const cases: Case[] = [
			[ 'Simple path icon', { icon: examplePathIcon } ],
			[ 'Simple SVG icon', { icon: exampleSvgIcon } ],
			[ 'Alert icon', { icon: cdxIconAlert } ],
			[ 'Icon with title', { icon: exampleSvgIcon, iconLabel: 'Foo' } ],
			[ 'Flippable icon (LTR)', { icon: exampleFlipIcon, dir: 'ltr' } ],
			[ 'Flippable icon (RTL)', { icon: exampleFlipIcon, dir: 'rtl' } ],
			[ 'Flippable icon (RTL, non-exception language)', { icon: exampleFlipIcon, dir: 'rtl', lang: 'ar' } ],
			[ 'Flippable icon (RTL, exception language)', { icon: exampleFlipIcon, dir: 'rtl', lang: 'he' } ],
			[ 'Extra small icon', { icon: examplePathIcon, size: 'x-small' } ]
		];
		test.each( cases )( 'Case %# %s: (%p) => HTML', ( _, props ) => {
			const wrapper = mount( CdxIcon, { props } );
			expect( wrapper.element ).toMatchSnapshot();
		} );
	} );

	describe( 'computes dir and lang based on its ancestors', () => {
		type Case = [
			msg: string,
			wrapHtml: string,
			props: { dir?: 'ltr' | 'rtl', lang?: string },
			expectedDir: 'ltr' | 'rtl',
			expectedLang: string
		];

		const cases: Case[] = [
			[ 'Inherited from parent', '<div dir="rtl" lang="ar"><div id="attach"></div></div>', {}, 'rtl', 'ar' ],
			[ 'Inherited from grandparent', '<div dir="rtl" lang="ar"><div><div id="attach"></div></div></div>', {}, 'rtl', 'ar' ],
			[ 'Dir and lang different on parent and grandparent', '<div dir="rtl" lang="ar"><div dir="ltr" lang="fr"><div id="attach"></div></div></div>', {}, 'ltr', 'fr' ],
			[ 'Dir and lang overridden on component', '<div dir="rtl" lang="ar"><div id="attach"></div></div>', { dir: 'ltr', lang: 'fr' }, 'ltr', 'fr' ]
		];

		// An icon with a fake langCodeMap that returns "FAKE ICON: language xyz" for every language
		const fakeIcon: Icon = {
			langCodeMap: new Proxy( {} as Record<string, IconFlipForRtl>, {
				get( _, lang ) : IconFlipForRtl|undefined {
					if ( typeof lang === 'string' && !lang.startsWith( '_' ) ) {
						return { ltr: `FAKE ICON: language ${ lang }`, shouldFlip: true };
					}
				},
				has( _, lang ) {
					return typeof lang === 'string' && !lang.startsWith( '_' );
				}
			} ),
			default: 'this should not be reached'
		};

		// Because of limitations in jsdom, computedStyle(...).direction doesn't work unless we
		// manually add CSS rules saying that dir="rtl" means direction: rtl;
		const styleTag = document.createElement( 'style' );
		styleTag.innerHTML = '[dir="rtl"] * { direction: rtl; } [dir="ltr"] * { direction: ltr; }';
		document.head.appendChild( styleTag );

		test.each( cases )( 'Case %# %s:', async ( _, wrapHtml, props, expectedDir, expectedLang ) => {
			const wrapperDiv = document.createElement( 'div' );
			wrapperDiv.innerHTML = wrapHtml;
			document.body.append( wrapperDiv );
			const iconWrapper = mount( CdxIcon, { props: { ...props, icon: fakeIcon }, attachTo: '#attach' } );
			await nextTick();
			expect( iconWrapper.get( 'svg g' ).text() ).toBe( `FAKE ICON: language ${ expectedLang }` );
			expect( iconWrapper.classes().includes( 'cdx-icon--flipped' ) ).toBe( expectedDir === 'rtl' );
			document.body.removeChild( wrapperDiv );
		} );
	} );
} );
